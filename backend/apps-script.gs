/**
 * ══════════════════════════════════════════════════════════════
 * IVORY CAKERY — Google Apps Script Backend
 * ══════════════════════════════════════════════════════════════
 * 
 * This script handles:
 *   1. Receiving form submissions from the website
 *   2. Saving data to Google Sheets (with timestamp)
 *   3. Sending Telegram notifications to the owner
 *   4. Sending Email notifications (built-in, always works)
 *   5. Duplicate prevention
 * ══════════════════════════════════════════════════════════════
 */

// ── CONFIGURATION ──────────────────────────────────────────────

// Telegram Bot Config
const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN_HERE';
const TELEGRAM_CHAT_ID   = 'YOUR_TELEGRAM_CHAT_ID_HERE';

// Email Notification (sends from your Google account automatically)
const EMAIL_TO = 'YOUR_EMAIL_HERE'; // e.g. 'hello@ivorycakery.com'

// Google Sheet tab name
const SHEET_NAME = 'Enquiries';

// Duplicate check window in minutes
const DUPLICATE_WINDOW_MINUTES = 2;

// ───────────────────────────────────────────────────────────────


/** Handles POST requests from the website form. */
function doPost(e) {
  try {
    const name      = e.parameter.name      || '';
    const phone     = e.parameter.phone     || '';
    const occasion  = e.parameter.occasion  || '';
    const cakeType  = e.parameter.cakeType  || '';
    const eventDate = e.parameter.eventDate || '';
    const message   = e.parameter.message   || '';
    
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    
    if (isDuplicate(phone, cakeType)) {
      return createResponse(200, 'duplicate', 'Duplicate submission detected.');
    }
    
    saveToSheet(timestamp, name, phone, occasion, cakeType, eventDate, message);
    sendTelegramNotification(name, phone, occasion, cakeType, eventDate, message);
    sendEmailNotification(name, phone, occasion, cakeType, eventDate, message);
    
    return createResponse(200, 'success', 'Enquiry submitted successfully!');
    
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return createResponse(500, 'error', 'Server error: ' + error.toString());
  }
}


/** Handles GET requests (for testing). */
function doGet() {
  return createResponse(200, 'ok', 'Ivory Cakery API is running! 🎂');
}


/** Saves form data to Google Sheet. */
function saveToSheet(timestamp, name, phone, occasion, cakeType, eventDate, message) {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  let   sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Timestamp', 'Name', 'Phone Number', 'Occasion', 'Cake Type', 'Date of Event', 'Additional Details']);
    sheet.getRange(1, 1, 1, 7).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  
  sheet.appendRow([timestamp, name, phone, occasion, cakeType, formatEventDate(eventDate), message]);
}


/** Checks for duplicate submissions. */
function isDuplicate(phone, cakeType) {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet || sheet.getLastRow() < 2) return false;
  
  const data   = sheet.getDataRange().getValues();
  const now    = new Date();
  const window = DUPLICATE_WINDOW_MINUTES * 60 * 1000;
  
  for (let i = data.length - 1; i >= 1; i--) {
    const rowTimestamp = new Date(data[i][0]);
    if (now - rowTimestamp > window) break;
    if (String(data[i][2]) === phone && String(data[i][4]) === cakeType) return true;
  }
  
  return false;
}


/** Sends Telegram notification. */
function sendTelegramNotification(name, phone, occasion, cakeType, eventDate, message) {
  let formattedDate = formatEventDate(eventDate);
  
  let msg = `🎂 *New Cake Enquiry!*\n\n`;
  msg += `*${name}* wants to order a *${cakeType}* to be delivered on *${formattedDate}* for their *${occasion}*.`;
  if (message && message.trim() !== '') {
    msg += `\n\nAdditional notes: "_${message}_"`;
  }
  msg += `\n\n📱 Phone: ${phone}`;
  
  try {
    UrlFetchApp.fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: msg, parse_mode: 'Markdown' }),
      muteHttpExceptions: true
    });
  } catch (error) {
    Logger.log('Telegram failed: ' + error.toString());
  }
}


/** Sends a beautifully formatted Email notification. */
function sendEmailNotification(name, phone, occasion, cakeType, eventDate, message) {
  let formattedDate = formatEventDate(eventDate);
  
  let html = '<div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:20px;">';
  html += '<h2 style="color:#eba551;border-bottom:2px solid #f1c87f;padding-bottom:10px;">🎂 New Cake Enquiry!</h2>';
  html += '<table style="width:100%;border-collapse:collapse;margin-top:15px;">';
  html += '<tr><td style="padding:8px 12px;font-weight:bold;color:#583b1d;">Name</td><td style="padding:8px 12px;">' + name + '</td></tr>';
  html += '<tr style="background:#fdfaf5;"><td style="padding:8px 12px;font-weight:bold;color:#583b1d;">Phone</td><td style="padding:8px 12px;">' + phone + '</td></tr>';
  html += '<tr><td style="padding:8px 12px;font-weight:bold;color:#583b1d;">Occasion</td><td style="padding:8px 12px;">' + occasion + '</td></tr>';
  html += '<tr style="background:#fdfaf5;"><td style="padding:8px 12px;font-weight:bold;color:#583b1d;">Cake Type</td><td style="padding:8px 12px;color:#eba551;font-weight:bold;">' + cakeType + '</td></tr>';
  html += '<tr><td style="padding:8px 12px;font-weight:bold;color:#583b1d;">Event Date</td><td style="padding:8px 12px;">' + formattedDate + '</td></tr>';
  if (message && message.trim() !== '') {
    html += '<tr style="background:#fdfaf5;"><td style="padding:8px 12px;font-weight:bold;color:#583b1d;">Notes</td><td style="padding:8px 12px;font-style:italic;">' + message + '</td></tr>';
  }
  html += '</table>';
  html += '<p style="margin-top:20px;color:#8a7560;font-size:13px;">— Ivory Cakery Website</p></div>';
  
  try {
    MailApp.sendEmail({ to: EMAIL_TO, subject: '🎂 New Cake Enquiry from ' + name, htmlBody: html });
  } catch (error) {
    Logger.log('Email failed: ' + error.toString());
  }
}


/** Formats event date to dd/MM/yyyy. */
function formatEventDate(eventDate) {
  if (!eventDate) return 'TBD';
  try {
    return Utilities.formatDate(new Date(eventDate), 'Asia/Kolkata', 'dd/MM/yyyy');
  } catch (e) {
    return eventDate;
  }
}


/** Creates a JSON response. */
function createResponse(statusCode, status, message) {
  return ContentService
    .createTextOutput(JSON.stringify({ statusCode, status, message }))
    .setMimeType(ContentService.MimeType.JSON);
}
