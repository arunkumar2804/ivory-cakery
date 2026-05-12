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
const TELEGRAM_BOT_TOKEN = '8624014283:AAEq_4dFpWV0wETpd9YplQ2j4VsCQzH7jvc';
const TELEGRAM_CHAT_ID   = '1004497804';

const SHEET_NAME = 'Enquiries';
const STATUS_COLUMN_INDEX = 8;    // Column H
const ORDER_ID_COLUMN_INDEX = 10; // Column J
const CUSTOMER_SUPPORT_PHONE = '+91 81237 84747';

const COLORS = {
  accent: '#c98f54',
  ink: '#241c18',
  text: '#44362e',
  muted: '#87766a',
  bg: '#f4f0ea',
  card: '#ffffff',
  border: '#eadfd3',
  surface: '#fff9f1'
};
// ───────────────────────────────────────────────────────────────


/** 1. MAIN ENTRY POINT: Handles website form submissions */
function doPost(e) {
  try {
    // Extract data with fallbacks to prevent crashes
    const name      = e.parameter.name      || 'Guest';
    const email     = e.parameter.email     || '';
    const phone     = e.parameter.phone     || 'No Phone';
    const occasion  = e.parameter.occasion  || 'Celebration';
    const cakeType  = e.parameter.cakeType  || 'Bespoke Cake';
    const eventDate = e.parameter.eventDate || '';
    const message   = e.parameter.message   || 'None';
    
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const orderId   = generateOrderId();
    
    // Process Data
    saveToSheet(timestamp, name, email, phone, occasion, cakeType, eventDate, message, "New", orderId);
    sendOwnerNotification(name, email, phone, occasion, cakeType, eventDate, message, orderId);
    
    // Send Customer Thank You
    sendOrderStatusEmail(email, name, {
      statusKey: 'ordered',
      orderId: orderId,
      cakeType: cakeType,
      bodyText: `Your enquiry for the <strong>${cakeType}</strong> has been successfully received. We are currently reviewing your request and will be in touch shortly to finalize the details.`
    });
    
    return createResponse(200, 'success', 'Enquiry processed successfully.');
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return createResponse(500, 'error', error.toString());
  }
}


/** 2. AUTOMATION: Triggered by Status changes in the Sheet */
function handleStatusChange(e) {
  const range = e.range;
  const sheet = range.getSheet();
  if (sheet.getName() !== SHEET_NAME || range.getColumn() !== STATUS_COLUMN_INDEX) return;
  
  const status = range.getValue();
  const row = range.getRow();
  
  ensureSheetSchema(sheet);
  const data = sheet.getRange(row, 1, 1, ORDER_ID_COLUMN_INDEX).getValues()[0];
  
  const name     = data[1];
  const email    = data[2];
  const type     = data[5];
  let orderId    = data[9];

  if (!email) return;
  if (!orderId) {
    orderId = generateOrderId();
    sheet.getRange(row, ORDER_ID_COLUMN_INDEX).setValue(orderId);
  }

  const config = { orderId, cakeType: type };

  if (status === "Preparing") {
    sendOrderStatusEmail(email, name, { ...config, statusKey: 'preparing', 
      bodyText: `We are pleased to inform you that your <strong>${type}</strong> is now in our kitchen. Our artists are carefully preparing every layer to perfection.` });
  } 
  else if (status === "Ready to Pickup" || status === "Ready to Collect") {
    sendOrderStatusEmail(email, name, { ...config, statusKey: 'ready', 
      bodyText: `Your order is complete. Your <strong>${type}</strong> is now ready for collection at Ivory Cakery. We look forward to seeing you.` });
  }
  else if (status === "Completed") {
    sendOrderStatusEmail(email, name, { ...config, statusKey: 'completed', 
      bodyText: `Thank you for allowing us to be a part of your celebration. We hope your <strong>${type}</strong> was as delightful as the occasion itself.` });
  }
  else if (status === "Cancelled") {
    sendOrderStatusEmail(email, name, { ...config, statusKey: 'cancelled', 
      bodyText: `Your order for the <strong>${type}</strong> has been cancelled. If you have any questions or would like to discuss a future order, please reach out.` });
  }
}


/** 3. EMAIL GENERATOR: Modern Premium UI */
function sendOrderStatusEmail(to, name, config) {
  if (!to) return;
  
  const theme = getEmailTheme(config.statusKey);
  const subject = `${theme.subject} | ${config.orderId}`;
  const tracking = buildTrackingLine(config.statusKey);
  const statusIcon = getCustomIconSVG(config.statusKey);

  const html = `<html><head><style>
    @keyframes icFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
    .ic-float{animation:icFloat 3s ease-in-out infinite}
  </style></head><body style="margin:0;padding:0;background:${COLORS.bg};">
    <div style="padding:40px 16px;font-family:'Helvetica Neue',Arial,sans-serif;">
      <table width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;margin:0 auto;">
        <tr><td style="text-align:center;padding:0 0 28px;"><span style="font-size:12px;letter-spacing:6px;color:#b8a089;text-transform:uppercase;">Ivory Cakery</span></td></tr>
        <tr><td><table width="100%" cellspacing="0" cellpadding="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.06);">
          <tr><td style="height:4px;background:${theme.pillText};"></td></tr>
          <tr><td style="padding:40px 40px 12px;text-align:center;"><div class="ic-float" style="display:inline-block;width:100px;height:100px;padding:14px;border-radius:50%;background:${COLORS.surface};box-shadow:0 8px 28px rgba(212,163,115,.12);">${statusIcon}</div></td></tr>
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
          <tr><td style="padding:18px;text-align:center;background:${COLORS.surface};border-top:1px solid ${COLORS.border};"><p style="margin:0;font-size:10px;color:#c4b8aa;letter-spacing:1px;">&copy; 2026 IVORY CAKERY</p></td></tr>
        </table></td></tr>
      </table>
    </div>
  </body></html>`;

  try {
    GmailApp.sendEmail(to, subject, "", { htmlBody: html, name: "Ivory Cakery" });
  } catch (e) { Logger.log("Email failed: " + e); }
}


/** 4. TELEGRAM & OWNER NOTIFICATIONS */
function sendOwnerNotification(name, email, phone, occasion, cakeType, eventDate, message, orderId) {
  // Owner Email
  const subject = `New Enquiry: ${name} (${orderId})`;
  const html = `<div style="font-family:sans-serif; padding:30px; background:${COLORS.bg};">
    <h2 style="color:${COLORS.text}; font-weight:normal;">New Order Enquiry</h2>
    <p><strong>ID:</strong> ${orderId}<br><strong>Customer:</strong> ${name}<br><strong>Cake:</strong> ${cakeType}</p>
    <a href="${SpreadsheetApp.getActiveSpreadsheet().getUrl()}" style="display:inline-block; border:1px solid ${COLORS.accent}; color:${COLORS.accent}; padding:12px 25px; text-decoration:none; font-size:13px; letter-spacing:1px; margin-top:20px;">VIEW ORDERS SHEET</a>
  </div>`;
  try { GmailApp.sendEmail(OWNER_EMAIL, subject, "", { htmlBody: html, name: "Ivory Cakery Notifications" }); } catch(e){}
  
  // Telegram Story Format
  var tgMsg = '\ud83c\udf82 New Cake Enquiry!\n\n' +
    name + ' wants to order a ' + cakeType + ' to be delivered on ' + formatEventDate(eventDate) + ' for their ' + occasion + '.\n\n' +
    'Additional notes: "' + message + '"\n\n' +
    '\ud83d\udcf1 Phone: ' + phone + '\n' +
    'Order ID: ' + orderId;
               
  try {
    UrlFetchApp.fetch('https://api.telegram.org/bot' + TELEGRAM_BOT_TOKEN + '/sendMessage', {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: tgMsg })
    });
  } catch(e){ Logger.log('Telegram failed: ' + e); }
}


/** 5. HELPER: Custom SVG Icons */
function getCustomIconSVG(statusKey) {
  const icons = {
    ordered: `<svg viewBox="0 0 259 259" fill="none"><path d="M187.1 39.5V241.6c0 1.6-.2 3.2-.6 4.7-2 7.3-8.7 12.7-16.7 12.7H49c-9.6 0-17.4-7.8-17.4-17.4V39.5c0-9.6 7.8-17.4 17.4-17.4h120.8c9.6 0 17.3 7.8 17.3 17.4z" fill="#A1412B"/><path d="M67.9 199.9v30.7c0 8.7 7.1 15.8 15.8 15.8h102.8c.4-1.5.7-3.1.7-4.7V199.9H67.9z" fill="#7F392C"/><path d="M169.8 22.2H49c-9.6 0-17.4 7.8-17.4 17.4v202.1c0 9.6 7.8 17.4 17.4 17.4h120.8c9.6 0 17.4-7.8 17.4-17.4V39.5c0-9.6-7.8-17.3-17.4-17.3zM168.7 240.6H50V40.6h118.7v200z" fill="#DB765A"/><path d="M187.1 199.9v41.7c0 1.6-.2 3.2-.6 4.7H83.7c-5 0-9.4-2.3-12.3-5.8H168.7V199.9h18.4z" fill="#B55434"/><path d="M228.4 6.3V41.9H99.6V6.3c0-3 2.4-5.3 5.3-5.3H223.1c2.9 0 5.3 2.4 5.3 5.3z" fill="#FFC751"/></svg>`,
    preparing: `<svg viewBox="0 0 259 259" fill="none"><path d="M191.2 155.4v38.4c0 5.5-2.2 10.7-6.1 14.6s-9.3 6.1-14.7 6.1H33.9c-5.5 0-10.8-2.2-14.7-6.1S13.1 199.3 13.1 193.8V188.8c-.1-57.8 12.4-114.9 36.3-167.5l4.2-9.2h97.9c4.4 0 8.7 1.5 12.3 4.2s6.1 6.5 7.2 10.8l6 21.8c9.4 34.6 14.2 70.4 14.2 106.5z" fill="#EEDC9A"/><path d="M110.3 188.8v5c0 5.5 2.2 10.7 6.1 14.6s9.3 6.1 14.7 6.1h39.5c5.5 0 10.8-2.2 14.7-6.1s6.1-9.3 6.1-14.7v-38.4c0-36-4.8-71.8-14.3-106.5l-6-21.8c-1-3.7-3.1-7.1-5.9-9.7s-6.2-4.3-10-5V12.1h-36.4V44.5h18.5c-17.6 46.1-26.6 95-26.6 144.3z" fill="#E88604"/><path d="M130.5 32.4v16.2c0 3.2 1.3 6.3 3.6 8.6s5.3 3.6 8.5 3.6H33.4c-3.2 0-6.3-1.3-8.6-3.6s-3.6-5.3-3.6-8.6V32.4c0-5.4 2.1-10.5 5.9-14.3S36.1 12.1 41.5 12.1h109.2c-5.4 0-10.5 2.1-14.3 5.9s-5.9 9-5.9 14.4z" fill="#ECE9C0"/></svg>`,
    ready: `<svg viewBox="0 0 259 259" fill="none"><path d="M103.2 27.3l100.9 39.3v116.5L103.2 222.3l-100.9-39.2V66.6l100.9-39.3z" fill="#D47637"/><path d="M103.2 222.3V80.9L204.1 66.6v116.5L103.2 222.3z" fill="#A35623"/><path d="M103.2 27.3L204.1 66.6 103.2 105.8 2.3 66.6 103.2 27.3z" fill="#E2945F"/><circle cx="204" cy="183" r="49" fill="#28BD41"/><path d="M187 204l11 12 28-29" stroke="white" stroke-width="8" stroke-linecap="round" fill="none"/></svg>`,
    completed: `<svg viewBox="0 0 259 259" fill="none"><circle cx="130" cy="37" r="36" fill="#70DA40"/><path d="M115 36l12 12 20-24" stroke="white" stroke-width="8" stroke-linecap="round" fill="none"/><path d="M130 113c14 0 25.5 11.5 25.5 25.5s-11.5 25.5-25.5 25.5S104.5 152.5 104.5 138.5 116 113 130 113z" fill="#0593FC"/><path d="M94.1 253.8v-37c0-1-.2-1.8-.7-2.6l-37-63.4c-4.4-7.4-1.8-17.1 5.6-21.4 7.4-4.4 17.1-1.8 21.4 5.6l25.1 43c1.2 2.1 3.6 3.1 5.9 2.4 10.8-2.9 20.3-2.9 31.1 0 2.3.6 4.7-.3 5.9-2.4l25.1-43c4.3-7.4 14-10 21.4-5.6 7.4 4.3 10 14 5.6 21.4l-37 63.4c-.5.8-.7 1.6-.7 2.6v37c0 2.9-2.4 5.2-5.3 5.2H99.4c-2.9.2-5.3-2.2-5.3-5.2z" fill="#0593FC"/></svg>`,
    cancelled: `<svg viewBox="0 0 259 259" fill="none"><path d="M210.6 1V33.3L105.8 40.8 1 33.3V1H81.6L105.8 8.6 130 1H210.6z" fill="#FFEE00"/><path d="M1 33.3H210.6V210.6H1V33.3z" fill="#FFCC00"/><path d="M130 1v75.2L105.8 65.5 81.6 76.2V1H130z" fill="#FF3D58"/><circle cx="193" cy="193" r="66" fill="#FF3D58"/><path d="M173 173l40 40M213 173l-40 40" stroke="white" stroke-width="12" stroke-linecap="round"/></svg>`
  };
  return wrapFloatingIcon(icons[statusKey] || icons.ordered);
}

function wrapFloatingIcon(svg) {
  const innerSvg = svg
    .replace(/^<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '');

  return `
    <svg width="148" height="148" viewBox="0 0 259 259" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Order status artwork">
      <g>
        <animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 6;0 -8;0 6" dur="2.8s" repeatCount="indefinite"/>
        ${innerSvg}
      </g>
    </svg>
  `;
}


/** 6. HELPER: Elegant Tracking Line */
function buildTrackingLine(statusKey) {
  const stageMap = { ordered: 0, preparing: 1, ready: 2, completed: 3, cancelled: 0 };
  const steps = ['Ordered', 'Preparing', 'Ready', 'Completed'];
  const points = [46, 180, 314, 448];
  const activeIdx = stageMap[statusKey] || 0;
  
  const activeX = points[activeIdx];
  const nextX = points[Math.min(activeIdx + 1, 3)];
  
  const progressLine = activeIdx > 0 ? `<line x1="46" y1="24" x2="${activeX}" y2="24" stroke="${COLORS.accent}" stroke-width="7" stroke-linecap="round" />` : '';
  const loadingPulse = activeIdx < 3 ? `
    <line x1="${activeX}" y1="24" x2="${nextX}" y2="24" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-dasharray="12 16" opacity="0.95">
      <animate attributeName="stroke-dashoffset" values="0;-84" dur="1.15s" repeatCount="indefinite" />
    </line>` : '';

  const nodes = points.map((p, i) => {
    const isDone = i <= activeIdx;
    const isActive = i === activeIdx;
    return `
      <circle cx="${p}" cy="24" r="${isActive ? 10 : 8}" fill="${isDone ? COLORS.accent : '#ffffff'}" stroke="${isDone ? COLORS.accent : COLORS.border}" stroke-width="2"/>
      ${isActive ? `<circle cx="${p}" cy="24" r="14" fill="none" stroke="${COLORS.accent}" stroke-width="2" opacity="0.35">
        <animate attributeName="r" values="12;18;12" dur="1.6s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.45;0.08;0.45" dur="1.6s" repeatCount="indefinite"/>
      </circle>` : ''}
    `;
  }).join('');

  const labels = steps.map((step, i) => {
    const color = i <= activeIdx ? COLORS.ink : COLORS.muted;
    const weight = i === activeIdx ? '700' : '600';
    return `<td style="width:25%; text-align:center; color:${color}; font-family:'Helvetica Neue', Arial, sans-serif; font-size:11px; line-height:1.35; font-weight:${weight};">${step}</td>`;
  }).join('');

  return `
    <div style="padding:20px 18px 16px; background:#ffffff; border:1px solid ${COLORS.border}; border-radius:18px;">
      <p style="margin:0 0 10px; color:${COLORS.ink}; font-size:13px; line-height:1.4; font-weight:700;">Order tracking</p>
      <svg width="100%" height="58" viewBox="0 0 494 58" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Order progress">
        <line x1="46" y1="24" x2="448" y2="24" stroke="#eadfd3" stroke-width="7" stroke-linecap="round" />
        ${progressLine}${loadingPulse}${nodes}
      </svg>
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
      pillText: '#8a5524'
    },
    preparing: {
      subject: 'Your cake is being prepared',
      headline: 'Now preparing',
      subhead: 'Our kitchen team has started crafting the order with care.',
      badge: 'Preparing',
      hero: 'linear-gradient(135deg, #512f27 0%, #a85f33 52%, #d99c63 100%)',
      pillBg: '#ffead8',
      pillText: '#a55320'
    },
    ready: {
      subject: 'Your order is ready for pickup',
      headline: 'Ready for pickup',
      subhead: 'Your order is packed, finished, and waiting for collection.',
      badge: 'Ready',
      hero: 'linear-gradient(135deg, #1f4f46 0%, #347f6b 50%, #7bc6a8 100%)',
      pillBg: '#e3f5ee',
      pillText: '#236a55'
    },
    completed: {
      subject: 'Thank you for choosing Ivory Cakery',
      headline: 'Order completed',
      subhead: 'Thank you for letting Ivory Cakery be part of your celebration.',
      badge: 'Completed',
      hero: 'linear-gradient(135deg, #33325f 0%, #6f5a9e 52%, #b5a4d8 100%)',
      pillBg: '#eee8fb',
      pillText: '#594486'
    },
    cancelled: {
      subject: 'Important update regarding your order',
      headline: 'Order cancelled',
      subhead: 'This order has been cancelled. Please call us if you need help.',
      badge: 'Cancelled',
      hero: 'linear-gradient(135deg, #572735 0%, #9d3f58 52%, #dd8898 100%)',
      pillBg: '#fde7ec',
      pillText: '#973a54'
    }
  };
  return themes[statusKey] || themes.ordered;
}

function generateOrderId() {
  const datePart = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyMMdd');
  const token = Utilities.getUuid().split('-')[0].toUpperCase().slice(0, 4);
  return `IC-${datePart}-${token}`;
}

function ensureSheetSchema(sheet) {
  const headers = ['Timestamp', 'Name', 'Email', 'Phone', 'Occasion', 'Cake Type', 'Date', 'Status', 'Notes', 'Order ID'];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground(COLORS.bg);
    sheet.setFrozenRows(1);
  }
}

function saveToSheet(timestamp, name, email, phone, occasion, cakeType, eventDate, message, status, orderId) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  ensureSheetSchema(sheet);
  sheet.appendRow([timestamp, name, email, phone, occasion, cakeType, formatEventDate(eventDate), status, message, orderId]);
  
  const lastRow = sheet.getLastRow();
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['New', 'Preparing', 'Ready to Pickup', 'Completed', 'Cancelled'], true)
    .build();
  sheet.getRange(lastRow, 8).setDataValidation(rule);
}

function formatEventDate(eventDate) {
  if (!eventDate) return 'TBD';
  try { return Utilities.formatDate(new Date(eventDate), 'Asia/Kolkata', 'dd/MM/yyyy'); } catch (e) { return eventDate; }
}

function createResponse(statusCode, status, message) {
  const res = { statusCode, status, message };
  return ContentService.createTextOutput(JSON.stringify(res)).setMimeType(ContentService.MimeType.JSON);
}
