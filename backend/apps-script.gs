/**
 * ══════════════════════════════════════════════════════════════
 * IVORY CAKERY — CRM & Automation Backend
 * ══════════════════════════════════════════════════════════════
 */

// ── CONFIGURATION ──────────────────────────────────────────────

// Owner Config
const OWNER_EMAIL = 'arunkumail29@gmail.com'; 
const TELEGRAM_BOT_TOKEN = '8624014283:AAEq_4dFpWV0wETpd9YplQ2j4VsCQzH7jvc';
const TELEGRAM_CHAT_ID   = '1004497804';

// Google Sheet Settings
const SHEET_NAME = 'Enquiries';
const STATUS_COLUMN_INDEX = 8; // Column H (1-indexed)

// ───────────────────────────────────────────────────────────────


/**
 * 1. RECEIVE ENQUIRY
 * Triggered when a customer submits the form on the website.
 */
function doPost(e) {
  try {
    const name      = e.parameter.name      || '';
    const email     = e.parameter.email     || '';
    const phone     = e.parameter.phone     || '';
    const occasion  = e.parameter.occasion  || '';
    const cakeType  = e.parameter.cakeType  || '';
    const eventDate = e.parameter.eventDate || '';
    const message   = e.parameter.message   || '';
    
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    
    // Save with a default "New" status
    saveToSheet(timestamp, name, email, phone, occasion, cakeType, eventDate, message, "New");
    
    // Notify Owner (You)
    sendOwnerNotification(name, email, phone, occasion, cakeType, eventDate, message);
    
    // Send Thank You to Customer
    sendCustomerThankYou(email, name, cakeType);
    
    return createResponse(200, 'success', 'Enquiry received!');
    
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return createResponse(500, 'error', error.toString());
  }
}


/**
 * 2. ORDER STATUS AUTOMATION
 * Triggered whenever you manually change the "Status" column in Google Sheets.
 * NOTE: This must be set up as an "Installable Trigger" in Apps Script.
 */
function handleStatusChange(e) {
  const range = e.range;
  const sheet = range.getSheet();
  
  // Only trigger if we are on the correct sheet and column
  if (sheet.getName() !== SHEET_NAME || range.getColumn() !== STATUS_COLUMN_INDEX) return;
  
  const status = range.getValue();
  const row = range.getRow();
  
  // Get customer info from the same row
  const data = sheet.getRange(row, 1, 1, 7).getValues()[0];
  const customerName  = data[1];
  const customerEmail = data[2];
  const cakeType      = data[5];

  if (!customerEmail) return;

  if (status === "Preparing") {
    sendUpdateEmail(customerEmail, customerName, "is now being prepared", "Our chefs are currently crafting your " + cakeType + ". Stay tuned!");
  } 
  else if (status === "Ready to Collect") {
    sendUpdateEmail(customerEmail, customerName, "is ready for collection!", "Great news! Your " + cakeType + " is ready. You can visit us to pick it up.");
  }
}


/** Saves data to Google Sheet with Status column */
function saveToSheet(timestamp, name, email, phone, occasion, cakeType, eventDate, message, status) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Occasion', 'Cake Type', 'Date', 'Status', 'Notes']);
    sheet.getRange(1, 1, 1, 9).setFontWeight('bold').setBackground('#fdfaf5');
    sheet.setFrozenRows(1);
  }
  
  sheet.appendRow([timestamp, name, email, phone, occasion, cakeType, formatEventDate(eventDate), status, message]);
}


/** Sends "Thank You" email to the Customer */
function sendCustomerThankYou(customerEmail, name, cakeType) {
  const subject = "🎂 We've received your enquiry! - Ivory Cakery";
  let html = `<div style="font-family:sans-serif; max-width:500px; padding:20px; border:1px solid #eba551; border-radius:10px;">`;
  html += `<h2 style="color:#583b1d;">Hi ${name},</h2>`;
  html += `<p>Thank you for reaching out to <strong>Ivory Cakery</strong>!</p>`;
  html += `<p>We've received your enquiry for a <strong>${cakeType}</strong>. Our team will review the details and get back to you shortly to confirm your order.</p>`;
  html += `<p style="margin-top:20px;">Sweetly,<br>The Ivory Cakery Team</p></div>`;
  
  try {
    GmailApp.sendEmail(customerEmail, subject, "", { htmlBody: html, name: "Ivory Cakery" });
  } catch (e) { Logger.log("Thank you email failed: " + e); }
}


/** Sends Status Update email to the Customer */
function sendUpdateEmail(customerEmail, name, statusAction, customMessage) {
  const subject = `🎂 Your Ivory Cakery order ${statusAction}`;
  let html = `<div style="font-family:sans-serif; max-width:500px; padding:20px; border:1px solid #eba551; border-radius:10px;">`;
  html += `<h2 style="color:#583b1d;">Hi ${name},</h2>`;
  html += `<p>Your order ${statusAction}.</p>`;
  html += `<p>${customMessage}</p>`;
  html += `<p style="margin-top:20px;">See you soon!<br>Ivory Cakery</p></div>`;
  
  try {
    GmailApp.sendEmail(customerEmail, subject, "", { htmlBody: html, name: "Ivory Cakery" });
  } catch (e) { Logger.log("Status update email failed: " + e); }
}


/** Notifies you (the Owner) */
function sendOwnerNotification(name, email, phone, occasion, cakeType, eventDate, message) {
  const subject = `🎂 New Enquiry: ${name} (${cakeType})`;
  let html = `<div style="font-family:sans-serif; padding:20px; background:#fdfaf5;">`;
  html += `<h3>New Order Enquiry</h3>`;
  html += `<ul><li><strong>Customer:</strong> ${name}</li><li><strong>Email:</strong> ${email}</li><li><strong>Phone:</strong> ${phone}</li><li><strong>Type:</strong> ${cakeType}</li></ul>`;
  html += `<p>Check your Google Sheet to update the status!</p></div>`;
  
  // Email to you
  try { GmailApp.sendEmail(OWNER_EMAIL, subject, "", { htmlBody: html }); } catch(e){}
  
  // Telegram to you
  let tgMsg = `🎂 *New Enquiry!*\n\n*${name}* (${email})\nwants a *${cakeType}* for *${occasion}* on *${formatEventDate(eventDate)}*.`;
  try {
    UrlFetchApp.fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: tgMsg, parse_mode: 'Markdown' })
    });
  } catch(e){}
}


function formatEventDate(eventDate) {
  if (!eventDate) return 'TBD';
  try { return Utilities.formatDate(new Date(eventDate), 'Asia/Kolkata', 'dd/MM/yyyy'); } catch (e) { return eventDate; }
}

function createResponse(statusCode, status, message) {
  return ContentService.createTextOutput(JSON.stringify({ statusCode, status, message })).setMimeType(ContentService.MimeType.JSON);
}
