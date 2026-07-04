/**
 * ══════════════════════════════════════════════════════════════
 * IVORY CAKERY — Unified CRM & Automation System
 * ══════════════════════════════════════════════════════════════
 * 
 * Instructions:
 * 1. Replace placeholder tokens (Telegram/Email) if needed.
 * 2. Deploy as Web App (New Version).
 * 3. Set up an 'On Edit' trigger for 'handleStatusChange'.
 */

// ── CONFIGURATION ──────────────────────────────────────────────
const OWNER_EMAIL = 'ivorycakery@gmail.com'; 
const FAST2SMS_API_KEY = '4zpnxuF1sYr3dOfUaIh2qAbCL7eXBNMiGjZ96v8HPETy0DJRSwFDjGfV4Bq3gIul7AaK9HyhbWPwCtvd'; 
const TELEGRAM_BOT_TOKEN = '8624014283:AAEq_4dFpWV0wETpd9YplQ2j4VsCQzH7jvc';
const TELEGRAM_CHAT_ID   = '1004497804';
const LOGO_BASE64 = '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';


const SPREADSHEET_ID = '1KMRIIQh1LGfGIcWMkNLioN_CC3nhU0edxIhLEyZjYfY';
const SHEET_NAME = 'Enquiries';
const STATUS_COLUMN_INDEX = 8;    // Column H
const ORDER_ID_COLUMN_INDEX = 10; // Column J
const CUSTOMER_SUPPORT_PHONE = '+91 81237 84747';
const BUSINESS_ADDRESS = 'SSK Residency 2nd cross, FCI Main Rd, Kadugodi, Bengaluru 560067';
const INSTAGRAM_URL = 'https://www.instagram.com/ivory_cakery';
const FACEBOOK_URL = 'https://www.facebook.com/share/18rBG3NEVS';
const SCRIPT_VERSION = '2026-05-14-crm-v11-quick-sms';
const NEWSLETTER_SHEET = 'Newsletter';
const INVOICE_MANAGER_SHEET = 'Invoice_Manager';

const COLORS = {
  accent: '#c98f54',
  ink: '#241c18',
  text: '#44362e',
  muted: '#87766a',
  bg: '#f4f0ea',
  card: '#ffffff',
  border: '#eadfd3',
  surface: '#fff9f1',
  gold: '#b8a089'
};
// ───────────────────────────────────────────────────────────────
function getSS() {
  // Primary: Use the hardcoded ID to be 100% sure
  if (SPREADSHEET_ID && SPREADSHEET_ID !== 'YOUR_SPREADSHEET_ID_HERE') {
    try {
      const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
      Logger.log('Successfully opened Spreadsheet: ' + ss.getName());
      return ss;
    } catch (e) {
      Logger.log('Failed to open by ID: ' + e.toString());
    }
  }
  
  // Fallback: Use active spreadsheet
  const active = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log('Using Fallback Active Spreadsheet: ' + active.getName());
  return active;
}
// ───────────────────────────────────────────────────────────────

/** 0. UI MENU: Custom CRM Operations */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('⚜️ Ivory CRM')
    .addItem('📤 Send Newsletter', 'triggerNewsletter')
    .addSeparator()
    .addItem('📧 Send Active Invoice to Customer', 'manualSendInvoice')
    .addItem('📄 Preview Active Invoice (PDF)', 'generateActiveInvoice')
    .addSeparator()
    .addItem('📊 Initialize CRM Sheets', 'initializeCRM')
    .addToUi();
}

function initializeCRM() {
  const ss = getSS();
  
  // 1. Ensure Enquiries sheet has Discount & Total columns
  let enqSheet = ss.getSheetByName(SHEET_NAME);
  if (enqSheet) {
    const headers = enqSheet.getRange(1, 1, 1, 12).getValues()[0];
    if (headers[10] !== 'WhatsApp') {
      enqSheet.getRange(1, 11).setValue('WhatsApp').setFontWeight('bold').setBackground(COLORS.bg);
    }
    if (headers[11] !== 'Flavor') {
      enqSheet.getRange(1, 12).setValue('Flavor').setFontWeight('bold').setBackground(COLORS.bg);
    }
    
    // Backfill WhatsApp formulas and Status Dropdowns for existing rows
    const lastRow = enqSheet.getLastRow();
    if (lastRow > 1) {
      const statusRule = SpreadsheetApp.newDataValidation()
        .requireValueInList(['New', 'Preparing', 'Ready to Pickup', 'Completed', 'Cancelled'], true)
        .build();
      enqSheet.getRange(2, 8, lastRow - 1, 1).setDataValidation(statusRule);

      for (let r = 2; r <= lastRow; r++) {
        const waFormula = `=HYPERLINK("https://wa.me/" & SUBSTITUTE(D${r}, "+", "") & "?text=" & ENCODEURL(IFS(
          H${r}="New", "Hi " & B${r} & "! This is *Ivory Cakery*. We have *successfully received* your order for a *" & F${r} & "* (" & J${r} & "). Our team will start crafting it soon!",
          H${r}="Preparing", "Hi " & B${r} & "! Great news! Your *" & F${r} & "* (" & J${r} & ") is now in the *Preparing* stage. We are using the finest ingredients to bring your vision to life!",
          H${r}="Ready to Pickup", "Hi " & B${r} & "! Your delicious *" & F${r} & "* (" & J${r} & ") is now *Ready to Pickup*! We can't wait for you to see it!",
          H${r}="Completed", "Hi " & B${r} & "! Your order (" & J${r} & ") is now *Completed*. Thank you for choosing *Ivory Cakery*! We hope you love it!",
          H${r}="Cancelled", "Hi " & B${r} & "! This is Ivory Cakery. We are sorry to inform you that your order (" & J${r} & ") has been *Cancelled*. Please contact us for help.",
          TRUE, "Hi " & B${r} & "! Just an update on your order (" & J${r} & "). Current status: *" & H${r} & "*"
        )), "Send WhatsApp Update")`;
        enqSheet.getRange(r, 11).setFormula(waFormula);
      }
    }
  }

  // 2. Create Invoice Manager (Live Builder)
  let invSheet = ss.getSheetByName(INVOICE_MANAGER_SHEET);
  if (!invSheet) {
    invSheet = ss.insertSheet(INVOICE_MANAGER_SHEET);
  }
  
  // Reset/Set Header Section
  invSheet.getRange('A1:E1').setValues([['Customer Name', 'Order ID', 'Subtotal', 'Discount (%)', 'Grand Total']])
          .setFontWeight('bold').setBackground(COLORS.accent).setFontColor('#ffffff');
  
  // Summary Data row (Row 2)
  invSheet.getRange('C2').setFormula('=SUM(D6:D30)'); // Subtotal (Sum of Line Totals)
  invSheet.getRange('D2').setValue(0); // Default 0% discount
  invSheet.getRange('E2').setFormula('=C2 * (1 - D2/100)'); // Grand Total
  
  // (WhatsApp button removed from Invoice Manager as requested)
  
  // Items Table Header (Row 5)
  invSheet.getRange('A5:D5').setValues([['Item Description', 'Qty', 'Unit Price', 'Line Total']])
          .setFontWeight('bold').setBackground(COLORS.surface).setBorder(true, true, true, true, true, true);
  
  // Item formulas
  for (let i = 6; i <= 30; i++) {
    invSheet.getRange('D' + i).setFormula(`=IF(AND(B${i}>0, C${i}>0), B${i}*C${i}, "")`);
  }
  
  // Add dropdown to A2 (Customer Names from Enquiries Col B)
  const rule = SpreadsheetApp.newDataValidation().requireValueInRange(enqSheet.getRange('B2:B1000')).build();
  invSheet.getRange('A2').setDataValidation(rule);
    invSheet.setColumnWidth(1, 250);

  // 3. Create Newsletter sheet
  if (!ss.getSheetByName(NEWSLETTER_SHEET)) {
    const newsSheet = ss.insertSheet(NEWSLETTER_SHEET);
    const headers = ['Subject', 'Content (HTML)', 'Status', 'Last Sent At'];
    newsSheet.appendRow(headers);
    newsSheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground(COLORS.accent).setFontColor('#ffffff');
    newsSheet.setFrozenRows(1);
  }
  
  SpreadsheetApp.getUi().alert('CRM Sheets Initialized successfully.');
}


/** 1. MAIN ENTRY POINT: Handles website form submissions */
function doPost(e) {
  const result = { version: SCRIPT_VERSION, saved: false, ownerEmailSent: false, customerEmailSent: false, telegramSent: false, smsSent: false, errors: [] };
  
  try {
    const params = (e && e.parameter) ? e.parameter : (e && e.parameters) ? e.parameters : {};
    const name      = params.name      || 'Guest';
    const email     = params.email     || '';
    const phone     = params.phone     || 'No Phone';
    const occasion  = params.occasion  || 'Celebration';
    const cakeType  = params.cakeType  || 'Bespoke Cake';
    const flavor    = params.flavor    || 'Not Selected';
    const eventDate = params.eventDate || '';
    const message   = params.message   || 'None';
    
    Logger.log('Processing enquiry for: ' + name);

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error('Sheet "' + SHEET_NAME + '" not found in spreadsheet.');
    
    const orderId = generateOrderId();
    
    // 1. SAVE TO SHEET
    try {
      sheet.appendRow([
        new Date(), 
        name, 
        email, 
        " " + phone, 
        occasion, 
        cakeType, 
        eventDate, 
        'New', 
        message, 
        orderId, 
        "",
        flavor
      ]);
      const lastRow = sheet.getLastRow();
      const statusRule = SpreadsheetApp.newDataValidation()
        .requireValueInList(['New', 'Preparing', 'Ready to Pickup', 'Completed', 'Cancelled'], true)
        .build();
      sheet.getRange(lastRow, 8).setDataValidation(statusRule);
      SpreadsheetApp.flush();
      result.saved = true;
      Logger.log('Saved to sheet: ' + orderId);
    } catch (err) {
      Logger.log('Sheet saving failed: ' + err.toString());
      result.errors.push('Sheet Error: ' + err.toString());
    }

    // 2. OWNER NOTIFICATIONS (Email & Telegram)
    try {
      sendOwnerNotification(name, email, phone, occasion, cakeType, flavor, eventDate, message, orderId);
      result.ownerEmailSent = true;
      result.telegramSent = true;
      Logger.log('Owner notifications triggered.');
    } catch (err) {
      Logger.log('Owner notification failed: ' + err.toString());
      result.errors.push('Owner Notif Error: ' + err.toString());
    }

    // 3. CUSTOMER EMAIL
    if (email && email.includes('@')) {
      try {
        sendOrderStatusEmail(email, name, {
          statusKey: 'ordered',
          orderId: orderId,
          cakeType: cakeType,
          bodyText: `Your enquiry for the <strong>${cakeType}</strong> has been successfully received. We will be in touch shortly!`
        });
        result.customerEmailSent = true;
        Logger.log('Customer email sent.');
      } catch (err) {
        Logger.log('Customer email failed: ' + err.toString());
        result.errors.push('Customer Email Error: ' + err.toString());
      }
    }
    
    // 4. SMS Notification
    if (phone && phone !== 'No Phone' && FAST2SMS_API_KEY !== 'YOUR_API_KEY_HERE') {
      try {
        const note = message || '';
        const smsMsg = getStatusMessage(name, cakeType, orderId, 'New', note);
        sendFast2SMS(phone, smsMsg);
        result.smsSent = true;
        Logger.log('SMS sent.');
      } catch (err) {
        Logger.log('SMS failed: ' + err.toString());
        result.errors.push('SMS Error: ' + err.toString());
      }
    }
    
    return createResponse(200, 'success', 'Enquiry processed.', result);
  } catch (error) {
    Logger.log('Critical doPost failure: ' + error.toString());
    result.errors.push(error.toString());
    return createResponse(500, 'error', error.toString(), result);
  }
}

/** RUN THIS FUNCTION MANUALLY TO FORCE AUTHORIZATION */
function FORCE_AUTHORIZE_SYSTEM() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  Logger.log("Accessing Sheet: " + ss.getName());
  GmailApp.sendEmail(OWNER_EMAIL, "Authorization Check", "If you see this, permissions are active.");
  UrlFetchApp.fetch("https://www.google.com");
  Logger.log("System Authorized Successfully.");
}

/** Health check: Open the Web App /exec URL to confirm the deployed version. */
function doGet() {
  return createResponse(200, 'success', 'Ivory Cakery backend is active.', {
    version: SCRIPT_VERSION
  });
}

/** Manual delivery test: Run this once inside Apps Script to authorize and verify notifications. */
function testNotifications() {
  const orderId = 'IC-TEST-' + Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyyMMdd-HHmmss');
  // 1. Test Sheet Writing
  saveToSheet(new Date(), 'TEST CUSTOMER', OWNER_EMAIL, CUSTOMER_SUPPORT_PHONE, 'Test Occasion', 'Test Cake', new Date(), 'This is a manual test.', 'New', orderId);
  SpreadsheetApp.flush();

  // 2. Test Notifications
  const ownerResult = sendOwnerNotification(
    'Test Customer',
    OWNER_EMAIL,
    CUSTOMER_SUPPORT_PHONE,
    'Test Occasion',
    'Test Cake',
    new Date(),
    'This is a test notification from Ivory Cakery.',
    orderId
  );
  
  const customerEmailSent = sendOrderStatusEmail(OWNER_EMAIL, 'Test Customer', {
    statusKey: 'ready',
    orderId: orderId,
    cakeType: 'Test Cake',
    bodyText: 'This is a test customer email from Ivory Cakery.'
  });
  
  // 3. Test SMS delivery
  if (FAST2SMS_API_KEY && FAST2SMS_API_KEY !== 'YOUR_API_KEY_HERE') {
    const testSmsMsg = "Hi Test! This is a test SMS from Ivory Cakery. Your automated SMS service is now ACTIVE!";
    sendFast2SMS(CUSTOMER_SUPPORT_PHONE, testSmsMsg);
  }
  
  return 'Full test triggered: Check Sheet (last row), Email, and Phone!';
}


function testAuth() {
  GmailApp.sendEmail(OWNER_EMAIL, "Ivory Cakery: System Authorization Check", "Authorization successful. Your system is now ready to send emails.");
  SpreadsheetApp.getUi().alert("Authorization successful! A test email has been sent to " + OWNER_EMAIL);
}

/** 2. AUTOMATION: Unified Trigger Handler */
function handleTriggeredEdit(e) {
  const range = e.range;
  const sheet = range.getSheet();
  const sheetName = sheet.getName();
  
  // A. Handle Status Change in Enquiries
  if (sheetName === SHEET_NAME && range.getColumn() === STATUS_COLUMN_INDEX) {
    handleStatusChange(e);
  }
  
  // B. Handle Order ID selection in Invoice Manager
  if (sheetName === INVOICE_MANAGER_SHEET && range.getA1Notation() === 'A2') {
    handleInvoiceManagerEdit(e);
  }
}

function handleInvoiceManagerEdit(e) {
  const customerName = e.value ? e.value.toString().trim() : "";
  if (!customerName) return;
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const enqSheet = ss.getSheetByName(SHEET_NAME);
  const invSheet = ss.getSheetByName(INVOICE_MANAGER_SHEET);
  
  const enqData = enqSheet.getDataRange().getValues();
  let cakeType = "";
  let discount = 0;
  let orderId = "";
  
  // Search from bottom to top to get the latest order for this customer
  for (let i = enqData.length - 1; i >= 1; i--) {
    const rowName = enqData[i][1] ? enqData[i][1].toString().trim() : "";
    if (rowName === customerName) {
      cakeType = enqData[i][5] || "Bespoke Cake"; // Column F
      discount = enqData[i][10] || 0; // Column K
      orderId = enqData[i][ORDER_ID_COLUMN_INDEX - 1]; // Column J
      break;
    }
  }
  
  if (orderId) {
    // 1. Clear previous items to avoid confusion (Rows 6 to 30)
    invSheet.getRange('A6:D30').clearContent();
    
    // 2. Auto-fill fields
    invSheet.getRange('B2').setValue(orderId);
    invSheet.getRange('A6').setValue(cakeType);
    invSheet.getRange('B6').setValue(1); // Default Qty
    invSheet.getRange('D2').setValue(discount); // Discount in Col D
    
    // 3. Restore formulas to ensure subtotal and line totals work
    invSheet.getRange('C2').setFormula('=SUM(D6:D30)'); // Subtotal in Col C
    invSheet.getRange('E2').setFormula('=C2 * (1 - D2/100)'); // Grand Total in Col E
    
    // 4. Ensure A2 has the name (usually selected by user, but autofill if we can)
    // (A2 is already handled or selected manually)
    
    // (COUNTA and WhatsApp Invoice removed from here as requested)
    
    for (let i = 6; i <= 30; i++) {
      invSheet.getRange('D' + i).setFormula(`=IF(AND(B${i}>0, C${i}>0), B${i}*C${i}, "")`);
    }
  }
}

function handleStatusChange(e) {
  const range = e.range;
  const sheet = range.getSheet();
  if (sheet.getName() !== SHEET_NAME || range.getColumn() !== STATUS_COLUMN_INDEX) return;
  
  const statusRaw = range.getValue() ? range.getValue().toString().trim() : "";
  const status = statusRaw.toLowerCase();
  const row = range.getRow();
  
  ensureSheetSchema(sheet);
  const data = sheet.getRange(row, 1, 1, 11).getValues()[0]; // Get 11 columns to be safe
  
  const name     = data[1];
  const email    = data[2];
  const type     = data[5];
  let orderId    = data[9];

  if (!email || !email.includes('@')) {
    Logger.log('Status change skipped: invalid email ' + email);
    return;
  }
  
  if (!orderId) {
    orderId = generateOrderId();
    sheet.getRange(row, ORDER_ID_COLUMN_INDEX).setValue(orderId);
  }

  const config = { orderId, cakeType: type };
  const phone  = data[3];
  const note   = data[8];
  const smsMsg = getStatusMessage(name, type, orderId, statusRaw, note);

  try {
    if (status === "preparing") {
      const invoiceBlob = generateInvoicePdf(orderId);
      const attachments = invoiceBlob ? [invoiceBlob] : [];
      
      sendOrderStatusEmail(email, name, { 
        ...config, 
        statusKey: 'preparing', 
        attachments: attachments,
        bodyText: `We are pleased to inform you that your <strong>${type}</strong> is now in our kitchen. Our artists are carefully preparing every layer to perfection. ${invoiceBlob ? 'Please find your invoice attached.' : ''}` 
      });
      if (phone) sendFast2SMS(phone, smsMsg);
      SpreadsheetApp.getActiveSpreadsheet().toast(`Email, Invoice & SMS sent for ${name}`, "✅ Success");
    } 
    else if (status === "ready to pickup" || status === "ready to collect" || status === "ready") {
      sendOrderStatusEmail(email, name, { ...config, statusKey: 'ready', 
        bodyText: `Your order is complete. Your <strong>${type}</strong> is now ready for collection at Ivory Cakery. We look forward to seeing you.` });
      if (phone) sendFast2SMS(phone, smsMsg);
      SpreadsheetApp.getActiveSpreadsheet().toast(`Ready notification & SMS sent to ${name}`, "✅ Success");
    }
    else if (status === "completed") {
      sendOrderStatusEmail(email, name, { ...config, statusKey: 'completed', 
        bodyText: `Thank you for allowing us to be a part of your celebration. We hope your <strong>${type}</strong> was as delightful as the occasion itself.` });
      if (phone) sendFast2SMS(phone, smsMsg);
      SpreadsheetApp.getActiveSpreadsheet().toast(`Completion email & SMS sent to ${name}`, "✅ Success");
    }
    else if (status === "cancelled") {
      sendOrderStatusEmail(email, name, { ...config, statusKey: 'cancelled', 
        bodyText: `Your order for the <strong>${type}</strong> has been cancelled. If you have any questions or would like to discuss a future order, please reach out.` });
      if (phone) sendFast2SMS(phone, smsMsg);
      SpreadsheetApp.getActiveSpreadsheet().toast(`Cancellation email & SMS sent to ${name}`, "⚠️ Alert");
    }
  } catch (err) {
    Logger.log('Status change failed: ' + err.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast("Error: " + err.toString(), "❌ Notification Failed");
  }
}


/** 3. EMAIL GENERATOR: Modern Premium UI */
function sendOrderStatusEmail(to, name, config) {
  if (!to) {
    Logger.log('Customer email skipped: missing recipient.');
    return false;
  }
  
  const theme = getEmailTheme(config.statusKey);
  const subject = `${theme.subject} | ${config.orderId}`;
  const tracking = buildTrackingLine(config.statusKey);
  const attachments = config.attachments || [];

  const html = `<html><head><style>
    @keyframes icFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
    .ic-float{animation:icFloat 3s ease-in-out infinite}
    @keyframes icProgress{0%{left:0;opacity:.25}50%{opacity:.95}100%{left:76%;opacity:.25}}
    .ic-progress-dot{animation:icProgress 1.8s ease-in-out infinite}
  </style></head><body style="margin:0;padding:0;background:${COLORS.bg};">
    <div style="padding:40px 16px;font-family:'Helvetica Neue',Arial,sans-serif;">
      <table width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;margin:0 auto;">
        <tr><td style="text-align:center;padding:0 0 28px;"><img src="cid:mainLogo" width="100" style="display:block; margin:0 auto;" alt="Ivory Cakery"></td></tr>
        <tr><td><table width="100%" cellspacing="0" cellpadding="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.06);">
          <tr><td style="height:4px;background:${theme.pillText};"></td></tr>
          <tr><td style="padding:40px 40px 12px;text-align:center;"><div class="ic-float" style="display:inline-block;width:112px;height:112px;border-radius:50%;background:${COLORS.surface};box-shadow:0 8px 28px rgba(212,163,115,.12);animation:icFloat 3s ease-in-out infinite;"><img src="cid:statusIcon" width="96" height="96" alt="${theme.badge}" style="display:block;width:96px;height:96px;margin:8px auto 0;border:0;outline:none;text-decoration:none;" /></div></td></tr>
          <tr><td style="text-align:center;padding:14px 40px 4px;"><h1 style="margin:0;font-size:26px;color:${COLORS.ink};font-weight:600;">${theme.headline}</h1></td></tr>
          <tr><td style="text-align:center;padding:8px 40px 0;"><span style="display:inline-block;padding:5px 16px;border-radius:20px;background:${theme.pillBg};color:${theme.pillText};font-size:11px;letter-spacing:1px;font-weight:700;">${theme.badge}</span></td></tr>
          <tr><td style="padding:20px 44px 0;"><div style="height:1px;background:${COLORS.border};"></div></td></tr>
          <tr><td style="padding:20px 44px 10px;font-size:15px;line-height:1.8;color:#5a5148;text-align:center;"><p style="margin:0 0 6px;">Dear ${name},</p><p style="margin:0;">${config.bodyText}</p></td></tr>
          <tr><td style="padding:10px 44px 6px;"><table width="100%" cellspacing="0" cellpadding="0" style="background:${COLORS.surface};border:1px solid ${COLORS.border};border-radius:12px;"><tr><td style="padding:14px 18px;"><p style="margin:0 0 2px;color:${COLORS.muted};font-size:10px;letter-spacing:1.2px;text-transform:uppercase;font-weight:700;">Order Ref</p><p style="margin:0;color:${COLORS.ink};font-size:16px;font-weight:700;">${config.orderId}</p></td><td style="padding:14px 18px;text-align:right;"><p style="margin:0 0 2px;color:${COLORS.muted};font-size:10px;letter-spacing:1.2px;text-transform:uppercase;font-weight:700;">Status</p><p style="margin:0;color:${theme.pillText};font-size:13px;font-weight:700;">${theme.badge}</p></td></tr></table></td></tr>
          <tr><td style="padding:10px 30px 28px;">
            <div style="background:${COLORS.surface};border-radius:12px;padding:18px 14px 14px;">
              <p style="margin:0 0 12px;text-align:center;font-size:10px;letter-spacing:2px;color:#b8a089;text-transform:uppercase;">Order Progress</p>
              ${tracking}
            </div>
          </td></tr>
          <tr><td style="padding:0 40px 28px;text-align:center;"><p style="margin:0 0 4px;font-size:12px;color:#b8a089;">Need help? Call us</p><p style="margin:0;font-size:15px;color:${COLORS.ink};font-weight:600;">${CUSTOMER_SUPPORT_PHONE}</p></td></tr>
          <tr><td style="padding:20px;text-align:center;background:${COLORS.surface};border-top:1px solid ${COLORS.border};">
            <p style="margin:0 0 8px;font-size:10px;color:${COLORS.muted};text-transform:uppercase;letter-spacing:1px;">${BUSINESS_ADDRESS}</p>
            <div style="margin-bottom:12px;">
              <a href="${INSTAGRAM_URL}" style="display:inline-block;margin:0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" width="16" height="16" alt="IG"></a>
              <a href="${FACEBOOK_URL}" style="display:inline-block;margin:0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" width="16" height="16" alt="FB"></a>
            </div>
            <p style="margin:0;font-size:10px;color:#c4b8aa;letter-spacing:1px;">&copy; 2026 IVORY CAKERY</p>
          </td></tr>
        </table></td></tr>
      </table>
    </div>
  </body></html>`;

  try {
    const statusIconBlob = getStatusIconBlob(config.statusKey);
    const mainLogoBlob = Utilities.newBlob(Utilities.base64Decode(LOGO_BASE64), 'image/jpeg', 'logo.jpg');
    
    GmailApp.sendEmail(to, subject, "", {
      htmlBody: html,
      inlineImages: { 
        statusIcon: statusIconBlob,
        mainLogo: mainLogoBlob
      },
      attachments: attachments,
      name: "Ivory Cakery"
    });
    Logger.log('Customer email sent to ' + to + ' for ' + config.orderId);
    return true;
  } catch (e) {
    Logger.log('Customer email failed for ' + to + ': ' + e.toString());
    return false;
  }
}


/** 4. TELEGRAM & OWNER NOTIFICATIONS */
function sendOwnerNotification(name, email, phone, occasion, cakeType, flavor, eventDate, message, orderId) {
  const result = { ownerEmailSent: false, telegramSent: false, errors: [] };

  // Owner Email
  const subject = `New Enquiry: ${name} (${orderId})`;
  const html = `<div style="font-family:sans-serif; padding:30px; background:${COLORS.bg};">
    <h2 style="color:${COLORS.text}; font-weight:normal;">New Order Enquiry</h2>
    <p><strong>ID:</strong> ${orderId}<br><strong>Customer:</strong> ${name}<br><strong>Cake:</strong> ${cakeType}<br><strong>Flavor:</strong> ${flavor}</p>
    <a href="${SpreadsheetApp.getActiveSpreadsheet().getUrl()}" style="display:inline-block; border:1px solid ${COLORS.accent}; color:${COLORS.accent}; padding:12px 25px; text-decoration:none; font-size:13px; letter-spacing:1px; margin-top:20px;">VIEW ORDERS SHEET</a>
  </div>`;
  try {
    GmailApp.sendEmail(OWNER_EMAIL, subject, "", { htmlBody: html, name: "Ivory Cakery Notifications" });
    result.ownerEmailSent = true;
    Logger.log('Owner email sent for ' + orderId);
  } catch (e) {
    const error = 'Owner email failed: ' + e.toString();
    result.errors.push(error);
    Logger.log(error);
  }
  
  var tgMsg = '✨ <b>NEW CAKE ENQUIRY</b> ✨\n\n' +
    '👤 <b>Customer:</b> ' + name + '\n' +
    '🎂 <b>Occasion:</b> ' + occasion + '\n' +
    '🍰 <b>Cake:</b> ' + cakeType + '\n' +
    '🍫 <b>Flavor:</b> ' + flavor + '\n' +
    '📅 <b>Date:</b> ' + formatEventDate(eventDate) + '\n\n' +
    '📝 <b>Message:</b>\n<i>"' + message + '"</i>\n\n' +
    '📞 <b>Phone:</b> ' + phone + '\n' +
    '🆔 <b>Order ID:</b> <code>' + orderId + '</code>\n\n' +
    '🚀 <i>Sent via Ivory CRM Automation</i>';
               
  try {
    const response = UrlFetchApp.fetch('https://api.telegram.org/bot' + TELEGRAM_BOT_TOKEN + '/sendMessage', {
      method: 'post',
      contentType: 'application/json',
      muteHttpExceptions: true,
      payload: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: tgMsg, parse_mode: 'HTML' })
    });
    const responseCode = response.getResponseCode();
    const responseBody = response.getContentText();
    result.telegramSent = responseCode >= 200 && responseCode < 300 && responseBody.indexOf('"ok":true') !== -1;
    if (result.telegramSent) {
      Logger.log('Telegram sent for ' + orderId);
    } else {
      const error = 'Telegram failed with HTTP ' + responseCode + ': ' + responseBody;
      result.errors.push(error);
      Logger.log(error);
    }
  } catch (e) {
    const error = 'Telegram failed: ' + e.toString();
    result.errors.push(error);
    Logger.log(error);
  }

  return result;
}


/** 5. HELPER: Embedded PNG Email Icons */
const STATUS_ICON_PNG_BASE64 = {
    ordered: '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',
    preparing: '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',
    ready: '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',
    completed: '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',
    cancelled: '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'
};

function getStatusIconBlob(statusKey) {
  const iconBase64 = STATUS_ICON_PNG_BASE64[statusKey] || STATUS_ICON_PNG_BASE64.ordered;
  return Utilities
    .newBlob(Utilities.base64Decode(iconBase64), 'image/png', statusKey + '.png')
    .setName(statusKey + '.png');
}


/** 6. HELPER: Elegant Tracking Line */
function buildTrackingLine(statusKey) {
  const stageMap = { ordered: 0, preparing: 1, ready: 2, completed: 3, cancelled: 0 };
  const steps = ['Ordered', 'Preparing', 'Ready', 'Completed'];
  const activeIdx = stageMap[statusKey] || 0;
  const progressWidth = (activeIdx / 3) * 100;
  const loaderLeft = Math.min(progressWidth + 2, 86);

  const labels = steps.map((step, i) => {
    const color = i <= activeIdx ? COLORS.ink : COLORS.muted;
    const weight = i === activeIdx ? '700' : '600';
    return `<td style="width:25%; text-align:center; color:${color}; font-family:'Helvetica Neue', Arial, sans-serif; font-size:11px; line-height:1.35; font-weight:${weight};">${step}</td>`;
  }).join('');

  const nodes = steps.map((step, i) => {
    const isDone = i <= activeIdx;
    const bg = isDone ? COLORS.accent : '#ffffff';
    const border = isDone ? COLORS.accent : COLORS.border;
    return `<td style="width:25%; text-align:center;"><span style="display:inline-block;width:${i === activeIdx ? '13px' : '11px'};height:${i === activeIdx ? '13px' : '11px'};border-radius:50%;background:${bg};border:2px solid ${border};"></span></td>`;
  }).join('');

  return `
    <div style="padding:20px 18px 16px; background:#ffffff; border:1px solid ${COLORS.border}; border-radius:18px;">
      <p style="margin:0 0 10px; color:${COLORS.ink}; font-size:13px; line-height:1.4; font-weight:700;">Order tracking</p>
      <div style="position:relative;height:28px;margin:4px 8px 2px;">
        <div style="position:absolute;left:0;right:0;top:10px;height:8px;border-radius:20px;background:#eadfd3;"></div>
        <div style="position:absolute;left:0;top:10px;width:${progressWidth}%;height:8px;border-radius:20px;background:${COLORS.accent};"></div>
        <span class="ic-progress-dot" style="position:absolute;left:${loaderLeft}%;top:7px;width:14px;height:14px;border-radius:50%;background:#ffffff;border:2px solid ${COLORS.accent};box-shadow:0 0 0 5px rgba(201,143,84,.18);animation:icProgress 1.8s ease-in-out infinite;"></span>
      </div>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin-bottom:8px;"><tr>${nodes}</tr></table>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;"><tr>${labels}</tr></table>
    </div>
  `;
}


/** 7. SYSTEM HELPERS */
function getEmailTheme(statusKey) {
  const themes = {
    ordered: {
      subject: 'Order received',
      headline: 'Order received',
      subhead: 'Your request is in our queue and our team is reviewing the details.',
      badge: 'Ordered',
      hero: 'linear-gradient(135deg, #2f4858 0%, #7c6a54 48%, #c98f54 100%)',
      pillBg: '#f8ead8',
      pillText: '#8a5524',
      iconBg: '#fff5e8',
      iconBorder: '#efd7bd'
    },
    preparing: {
      subject: 'Your cake is being prepared',
      headline: 'Now preparing',
      subhead: 'Our kitchen team has started crafting the order with care.',
      badge: 'Preparing',
      hero: 'linear-gradient(135deg, #512f27 0%, #a85f33 52%, #d99c63 100%)',
      pillBg: '#ffead8',
      pillText: '#a55320',
      iconBg: '#fff0e2',
      iconBorder: '#f1c7a7'
    },
    ready: {
      subject: 'Your order is ready for pickup',
      headline: 'Ready for pickup',
      subhead: 'Your order is packed, finished, and waiting for collection.',
      badge: 'Ready',
      hero: 'linear-gradient(135deg, #1f4f46 0%, #347f6b 50%, #7bc6a8 100%)',
      pillBg: '#e3f5ee',
      pillText: '#236a55',
      iconBg: '#edf9f4',
      iconBorder: '#bee6d7'
    },
    completed: {
      subject: 'Thank you for choosing Ivory Cakery',
      headline: 'Order completed',
      subhead: 'Thank you for letting Ivory Cakery be part of your celebration.',
      badge: 'Completed',
      hero: 'linear-gradient(135deg, #33325f 0%, #6f5a9e 52%, #b5a4d8 100%)',
      pillBg: '#eee8fb',
      pillText: '#594486',
      iconBg: '#f3effc',
      iconBorder: '#d8ccef'
    },
    cancelled: {
      subject: 'Important update regarding your order',
      headline: 'Order cancelled',
      subhead: 'This order has been cancelled. Please call us if you need help.',
      badge: 'Cancelled',
      hero: 'linear-gradient(135deg, #572735 0%, #9d3f58 52%, #dd8898 100%)',
      pillBg: '#fde7ec',
      pillText: '#973a54',
      iconBg: '#fff0f3',
      iconBorder: '#f4c2ce'
    }
  };
  return themes[statusKey] || themes.ordered;
}

function getStatusMessage(name, cakeType, orderId, status, note) {
  const s = status.toLowerCase();
  let dynamicMsg = "";
  
  // 1. Determine the status-specific detailed message
  if (s.includes('new')) {
    dynamicMsg = `We have successfully received your order for a ${cakeType} (${orderId}). Our master bakers are reviewing your request and will be in touch shortly to finalize the details. Thank you for choosing us!`;
  } else if (s.includes('preparing')) {
    dynamicMsg = `Exciting news! Your ${cakeType} (${orderId}) is now in the Preparing stage. We are using the finest ingredients and intricate detailing to bring your vision to life. We'll update you once it's ready!`;
  } else if (s.includes('ready')) {
    dynamicMsg = `Your bespoke ${cakeType} (${orderId}) is now Ready to Pickup! You can collect it from our studio at your scheduled time. We can't wait for you to see your delicious creation!`;
  } else if (s.includes('completed')) {
    dynamicMsg = `Your order (${orderId}) has been marked as Completed. It was a pleasure crafting this for you! We hope it adds a touch of magic to your celebration. Have a wonderful day!`;
  } else if (s.includes('cancelled')) {
    dynamicMsg = `This is regarding your order (${orderId}). We are sorry to inform you that it has been Cancelled. If this was a mistake or you have questions, please reach out to us at ${CUSTOMER_SUPPORT_PHONE}.`;
  } else {
    dynamicMsg = `Just an update on your ${cakeType} order (${orderId}). Current status: ${status}. Have a wonderful day!`;
  }

  // 2. We no longer override the professional brand voice with the technical 'note' column.
  // This ensures the customer always receives the elegant template you approved.

  // 3. Construct the full message
  return `Hi ${name}! This is Ivory Cakery. ${dynamicMsg}`;
}

function ensureSheetSchema(sheet) {
  const headers = ['Timestamp', 'Name', 'Email', 'Phone', 'Occasion', 'Cake Type', 'Date', 'Status', 'Notes', 'Order ID', 'WhatsApp'];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground(COLORS.bg);
    sheet.setFrozenRows(1);
  }
}

function saveToSheet(timestamp, name, email, phone, occasion, cakeType, eventDate, message, status, orderId) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      ensureSheetSchema(sheet);
    }
    
    const nextRow = sheet.getLastRow() + 1;
    const rowData = [timestamp, name, email, " " + phone, occasion, cakeType, formatEventDate(eventDate), status, message, orderId, ""];
    
    sheet.getRange(nextRow, 1, 1, rowData.length).setValues([rowData]);
    SpreadsheetApp.flush();

    // Set Status Dropdown
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['New', 'Preparing', 'Ready to Pickup', 'Completed', 'Cancelled'], true)
      .build();
    sheet.getRange(nextRow, 8).setDataValidation(rule);
  
    // Add WhatsApp Formula
    const waFormula = `=HYPERLINK("https://wa.me/" & SUBSTITUTE(D${nextRow}, "+", "") & "?text=" & ENCODEURL(IFS(
      H${nextRow}="New", "Hi " & B${nextRow} & "! This is *Ivory Cakery*. We have *successfully received* your order for a *" & F${nextRow} & "* (" & J${nextRow} & "). Our team will start crafting it soon!",
      H${nextRow}="Preparing", "Hi " & B${nextRow} & "! Great news! Your *" & F${nextRow} & "* (" & J${nextRow} & ") is now in the *Preparing* stage. We are using the finest ingredients to bring your vision to life!",
      H${nextRow}="Ready to Pickup", "Hi " & B${nextRow} & "! Your delicious *" & F${nextRow} & "* (" & J${nextRow} & ") is now *Ready to Pickup*! We can't wait for you to see it!",
      H${nextRow}="Completed", "Hi " & B${nextRow} & "! Your order (" & J${nextRow} & ") is now *Completed*. Thank you for choosing *Ivory Cakery*! We hope you love it!",
      H${nextRow}="Cancelled", "Hi " & B${nextRow} & "! This is Ivory Cakery. We are sorry to inform you that your order (" & J${nextRow} & ") has been *Cancelled*. Please contact us for help.",
      TRUE, "Hi " & B${nextRow} & "! Just an update on your order (" & J${nextRow} & "). Current status: *" & H${nextRow} & "*"
    )), "Send WhatsApp Update")`;
    sheet.getRange(nextRow, 11).setFormula(waFormula);
    
    // SUCCESS NOTIFICATION
    GmailApp.sendEmail(OWNER_EMAIL, "CRM SUCCESS: Saved to Row " + nextRow, "Enquiry from " + name + " saved to row " + nextRow + " of sheet " + SHEET_NAME);
    
    return true;
  } catch (err) {
    GmailApp.sendEmail(OWNER_EMAIL, "CRM ERROR: Write Failure", "Failed to save to sheet.\nError: " + err.toString());
    return false;
  }
}

function formatEventDate(eventDate) {
  if (!eventDate) return 'TBD';
  try { return Utilities.formatDate(new Date(eventDate), 'Asia/Kolkata', 'dd/MM/yyyy'); } catch (e) { return eventDate; }
}

/** 8. NEWSLETTER LOGIC */
function triggerNewsletter() {
  const ss = getSS();
  const newsSheet = ss.getSheetByName(NEWSLETTER_SHEET);
  if (!newsSheet) return;

  const ui = SpreadsheetApp.getUi();
  const response = ui.alert('Send Newsletter', 'Are you sure you want to send the first row of the Newsletter sheet to all customers?', ui.ButtonSet.YES_NO);
  if (response !== ui.Button.YES) return;

  const data = newsSheet.getRange(2, 1, 1, 2).getValues()[0];
  const subject = data[0];
  const content = data[1];

  if (!subject || !content) {
    ui.alert('Subject or Content is empty.');
    return;
  }

  const enqSheet = ss.getSheetByName(SHEET_NAME);
  const customers = enqSheet.getRange(2, 2, enqSheet.getLastRow() - 1, 2).getValues();
  let count = 0;
  const processedEmails = new Set();

  customers.forEach(cust => {
    const name = cust[0];
    const email = cust[1] ? cust[1].toString().toLowerCase().trim() : "";
    
    if (email && email.includes('@') && !processedEmails.has(email)) {
      sendNewsletterEmail(email, name, subject, content);
      processedEmails.add(email);
      count++;
    }
  });

  newsSheet.getRange(2, 3).setValue('Sent');
  newsSheet.getRange(2, 4).setValue(new Date());
  ui.alert(`Newsletter sent to ${count} customers.`);
}

function sendNewsletterEmail(to, name, subject, content) {
  const html = `<html><body style="margin:0;padding:0;background:${COLORS.bg};font-family:serif;">
    <div style="max-width:600px;margin:20px auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 4px 15px rgba(0,0,0,0.05);">
      <div style="padding:30px;text-align:center;border-bottom:1px solid ${COLORS.border};">
        <img src="data:image/jpeg;base64,${LOGO_BASE64}" width="120" style="margin-bottom:10px;">
        <h1 style="color:${COLORS.ink};font-size:24px;margin:0;">Ivory Cakery</h1>
      </div>
      <div style="padding:40px;color:${COLORS.text};line-height:1.6;font-size:16px;">
        <p>Dear ${name},</p>
        ${content}
      </div>
      <div style="padding:20px;background:${COLORS.surface};text-align:center;font-size:11px;color:${COLORS.muted};">
        <p style="margin:0 0 8px;text-transform:uppercase;letter-spacing:1px;">${BUSINESS_ADDRESS}</p>
        <div style="margin-bottom:12px;">
          <a href="${INSTAGRAM_URL}" style="display:inline-block;margin:0 8px;color:${COLORS.accent};text-decoration:none;">Instagram</a> |
          <a href="${FACEBOOK_URL}" style="display:inline-block;margin:0 8px;color:${COLORS.accent};text-decoration:none;">Facebook</a>
        </div>
        <p style="margin:0;font-size:10px;color:#c4b8aa;letter-spacing:1px;">&copy; 2026 IVORY CAKERY</p>
      </div>
    </div>
  </body></html>`;

  try {
    GmailApp.sendEmail(to, subject, "", { htmlBody: html, name: "Ivory Cakery" });
  } catch(e) {
    Logger.log('Newsletter failed for ' + to);
  }
}

/** 9. INVOICE GENERATOR & SENDER */
function manualSendInvoice() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const invSheet = ss.getSheetByName(INVOICE_MANAGER_SHEET);
  const customerName = invSheet.getRange('A2').getValue();
  const orderId = invSheet.getRange('B2').getValue();
  
  if (!customerName || customerName === "Select Customer") {
    SpreadsheetApp.getUi().alert('Please select a valid Customer Name in the Invoice_Manager sheet.');
    return;
  }

  const enqSheet = ss.getSheetByName(SHEET_NAME);
  const data = enqSheet.getDataRange().getValues();
  const headers = data[0];
  
  // Find column indices dynamically
  const orderIdCol = headers.indexOf('Order ID');
  const emailCol = headers.indexOf('Email');
  const cakeTypeCol = headers.indexOf('Cake Type');
  
  if (orderIdCol === -1 || emailCol === -1) {
    SpreadsheetApp.getUi().alert('Critical columns (Order ID or Email) not found in Enquiries sheet headers.');
    return;
  }

  let email = '';
  let cakeType = '';
  const searchId = (orderId || "").toString().trim();
  
  for (let i = 1; i < data.length; i++) {
    const sheetId = (data[i][orderIdCol] || "").toString().trim();
    if (sheetId === searchId) {
      email = (data[i][emailCol] || "").toString().trim();
      cakeType = cakeTypeCol !== -1 ? data[i][cakeTypeCol] : "";
      break;
    }
  }

  if (!email) {
    const sampleId = data.length > 1 ? data[1][ORDER_ID_COLUMN_INDEX - 1] : "No data";
    const msg = `Customer email not found.\n\n` +
                `Searching for Order ID: "${searchId}"\n` +
                `Total rows scanned: ${data.length - 1}\n` +
                `Example ID in Row 2 Column ${ORDER_ID_COLUMN_INDEX}: "${sampleId}"\n\n` +
                `Please ensure the Order ID in Invoice_Manager (B2) matches exactly with the Order ID in the Enquiries sheet.`;
    SpreadsheetApp.getUi().alert(msg);
    return;
  }

  const blob = generateInvoicePdf(orderId);
  if (!blob) {
    SpreadsheetApp.getUi().alert('Failed to generate invoice. Ensure items are added in the builder.');
    return;
  }

  const html = `<html><body style="font-family:serif; padding:40px; background:${COLORS.bg};">
    <div style="max-width:500px; margin:auto; background:#fff; padding:40px; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.05); border:1px solid ${COLORS.border};">
      <img src="cid:logo" width="100" style="display:block; margin:0 auto 20px;">
      <p style="font-size:18px; color:${COLORS.ink}; margin-bottom:10px;">Dear ${customerName},</p>
      <p style="font-size:15px; color:${COLORS.text}; line-height:1.6;">Please find the invoice for your order <strong>${orderId}</strong> attached below.</p>
      <p style="font-size:15px; color:${COLORS.text}; line-height:1.6;">Thank you for choosing Ivory Cakery!</p>
      <div style="margin-top:30px; padding-top:20px; border-top:1px solid ${COLORS.border}; font-size:11px; color:${COLORS.muted}; text-align:center;">
        <p style="margin:0 0 5px;">${BUSINESS_ADDRESS}</p>
        <p style="margin:0;">Ivory Cakery | Luxe Confections</p>
      </div>
    </div>
  </body></html>`;

  try {
    const logoBlob = Utilities.newBlob(Utilities.base64Decode(LOGO_BASE64), 'image/jpeg', 'logo.jpg');
    GmailApp.sendEmail(email, `Invoice for your order: ${orderId}`, "", {
      htmlBody: html,
      attachments: [blob],
      inlineImages: { logo: logoBlob },
      name: "Ivory Cakery"
    });
    SpreadsheetApp.getUi().alert('Invoice sent successfully to ' + email);
  } catch (e) {
    SpreadsheetApp.getUi().alert('Failed to send email: ' + e.toString());
  }
}

function generateActiveInvoice() {
  const invSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(INVOICE_MANAGER_SHEET);
  const orderId = invSheet.getRange('A2').getValue();
  
  if (!orderId) {
    SpreadsheetApp.getUi().alert('No Order ID selected in ' + INVOICE_MANAGER_SHEET);
    return;
  }
  const blob = generateInvoicePdf(orderId);
  if (blob) {
    const file = DriveApp.createFile(blob);
    SpreadsheetApp.getUi().alert('Invoice Preview saved to Drive: ' + file.getName());
  } else {
    SpreadsheetApp.getUi().alert('Failed to generate invoice. Ensure items exist in ' + INVOICE_MANAGER_SHEET);
  }
}

function generateInvoicePdf(orderId) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const invSheet = ss.getSheetByName(INVOICE_MANAGER_SHEET);
  
  // Verify if the active builder is for the requested orderId
  const builderOrderId = invSheet.getRange('B2').getValue();
  if (builderOrderId !== orderId) {
    Logger.log('Requested PDF for ' + orderId + ' but builder is showing ' + builderOrderId);
  }

  const enqSheet = ss.getSheetByName(SHEET_NAME);
  const enqData = enqSheet.getDataRange().getValues();
  
  let custData = null;
  for (let i = 1; i < enqData.length; i++) {
    if (enqData[i][ORDER_ID_COLUMN_INDEX - 1] === orderId) {
      custData = {
        name: enqData[i][1],
        email: enqData[i][2],
        phone: enqData[i][3],
        date: enqData[i][0],
        discount: parseFloat(invSheet.getRange('E2').getValue()) || 0
      };
      break;
    }
  }
  
  if (!custData) return null;

  const items = [];
  let subtotal = 0;
  
  // Read items from Row 6 onwards in Invoice_Manager
  const itemData = invSheet.getRange('A6:D30').getValues();
  for (let i = 0; i < itemData.length; i++) {
    const desc = itemData[i][0];
    const qty = parseFloat(itemData[i][1]);
    const price = parseFloat(itemData[i][2]);
    
    if (desc && !isNaN(qty) && qty > 0) {
      const validPrice = isNaN(price) ? 0 : price;
      const lineTotal = qty * validPrice;
      items.push({
        desc: desc,
        qty: qty,
        price: validPrice,
        total: lineTotal
      });
      subtotal += lineTotal;
    }
  }

  if (items.length === 0) return null;

  const discountAmount = (subtotal * custData.discount) / 100;
  const grandTotal = subtotal - discountAmount;

  const html = `<html><head><style>
    body { font-family: 'Georgia', serif; color: #241c18; padding: 40px; line-height: 1.4; }
    .header { text-align: center; border-bottom: 2px solid #c98f54; padding-bottom: 20px; margin-bottom: 30px; }
    .logo { width: 140px; margin-bottom: 10px; }
    .title { font-size: 28px; letter-spacing: 4px; text-transform: uppercase; margin: 0; color: #b8a089; }
    .meta-table { width: 100%; margin-bottom: 40px; font-size: 14px; }
    .meta-table td { vertical-align: top; }
    .items-table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
    .items-table th { background: #f4f0ea; padding: 12px; text-align: left; border-bottom: 1px solid #eadfd3; font-size: 13px; text-transform: uppercase; color: #87766a; }
    .items-table td { padding: 12px; border-bottom: 1px solid #f4f0ea; font-size: 14px; }
    .totals { width: 100%; text-align: right; }
    .totals table { margin-left: auto; width: 250px; }
    .totals td { padding: 5px 0; }
    .grand-total { font-size: 18px; font-weight: bold; color: #c98f54; border-top: 2px solid #c98f54; padding-top: 10px; }
    .footer { margin-top: 60px; text-align: center; font-size: 11px; color: #87766a; border-top: 1px solid #eadfd3; padding-top: 20px; }
  </style></head><body>
    <div class="header">
      <img src="data:image/jpeg;base64,${LOGO_BASE64}" class="logo"><br>
      <h1 class="title">INVOICE</h1>
    </div>
    <table class="meta-table">
      <tr>
        <td style="width: 60%;">
          <strong>Billed To:</strong><br>
          ${custData.name}<br>
          ${custData.email}<br>
          ${custData.phone}
        </td>
        <td style="text-align: right;">
          <strong>Invoice Details:</strong><br>
          ID: ${orderId}<br>
          Date: ${Utilities.formatDate(new Date(), 'Asia/Kolkata', 'dd MMM yyyy')}<br>
          Status: Preparing
        </td>
      </tr>
    </table>
    <table class="items-table">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Description</th>
          <th style="text-align: center;">Qty</th>
          <th style="text-align: right;">Price</th>
          <th style="text-align: right;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${items.map((it, idx) => `
          <tr>
            <td>${idx + 1}</td>
            <td>${it.desc}</td>
            <td style="text-align: center;">${it.qty}</td>
            <td style="text-align: right;">₹${it.price.toFixed(2)}</td>
            <td style="text-align: right;">₹${it.total.toFixed(2)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <div class="totals">
      <table>
        <tr><td>Total Items</td><td style="text-align: right;">${items.length}</td></tr>
        <tr><td>Subtotal</td><td style="text-align: right;">₹${subtotal.toFixed(2)}</td></tr>
        <tr><td>Discount (${custData.discount}%)</td><td style="text-align: right;">-₹${discountAmount.toFixed(2)}</td></tr>
        <tr class="grand-total"><td>Grand Total</td><td style="text-align: right;">₹${grandTotal.toFixed(2)}</td></tr>
      </table>
    </div>
    <div class="footer">
      <strong>Ivory Cakery | Luxe Confections</strong><br>
      ${BUSINESS_ADDRESS}<br>
      Contact: ${CUSTOMER_SUPPORT_PHONE} | ${OWNER_EMAIL}
    </div>
  </body></html>`;

  const blob = HtmlService.createHtmlOutput(html).getAs('application/pdf');
  blob.setName(`Invoice_${orderId}.pdf`);
  return blob;
}

function createResponse(statusCode, status, message, extra) {
  const res = Object.assign({ statusCode, status, message }, extra || {});
  return ContentService.createTextOutput(JSON.stringify(res)).setMimeType(ContentService.MimeType.JSON);
}

/** 11. SMS SERVICE (Fast2SMS) */
function sendFast2SMS(phoneNumber, message) {
  if (!FAST2SMS_API_KEY || FAST2SMS_API_KEY === 'YOUR_API_KEY_HERE') {
    Logger.log('Fast2SMS API Key missing.');
    return;
  }

  // Clean the message (remove emojis and bold markers for SMS)
  const cleanMessage = message
    .replace(/\*/g, '') // Remove bold markers
    .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '') // Remove emojis
    .trim();

  const url = "https://www.fast2sms.com/dev/bulkV2";
  
  const payload = {
    "route": "q", // Reverted to Quick SMS route as requested
    "message": cleanMessage,
    "language": "english",
    "numbers": phoneNumber.toString().replace(/\+/g, '').replace(/\s/g, '')
  };

  const options = {
    "method": "POST",
    "headers": {
      "authorization": FAST2SMS_API_KEY,
      "Content-Type": "application/json"
    },
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const result = JSON.parse(response.getContentText());
    if (result.return === true) {
      Logger.log('SMS sent successfully to ' + phoneNumber);
    } else {
      Logger.log('SMS failed: ' + result.message);
    }
  } catch (e) {
    Logger.log('Fast2SMS error: ' + e.toString());
  }
}
function generateOrderId() {
  const date = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyMMdd');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  const char = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Random A-Z
  return `IC-${date}-${random}${char}`;
}
