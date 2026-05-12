/**
 * ══════════════════════════════════════════════════════════════
 * IVORY CAKERY — Elegant CRM with Custom SVG Icons
 * ══════════════════════════════════════════════════════════════
 */

// ── CONFIGURATION ──────────────────────────────────────────────
const OWNER_EMAIL = 'ivorycakery@gmail.com'; 
const TELEGRAM_BOT_TOKEN = '8624014283:AAEq_4dFpWV0wETpd9YplQ2j4VsCQzH7jvc';
const TELEGRAM_CHAT_ID   = '1004497804';

const SHEET_NAME = 'Enquiries';
const STATUS_COLUMN_INDEX = 8;    
const ORDER_ID_COLUMN_INDEX = 10; 
const CUSTOMER_SUPPORT_PHONE = '+91 81237 84747';

const COLORS = {
  accent: '#d4a373',
  text: '#2d241e',
  muted: '#8e837a',
  bg: '#fcfbf9',
  card: '#ffffff',
  border: '#f1e9e0'
};
// ───────────────────────────────────────────────────────────────


/** 1. RECEIVE ENQUIRY */
function doPost(e) {
  try {
    const name      = e.parameter.name      || '';
    const email     = e.parameter.email     || '';
    const cakeType  = e.parameter.cakeType  || '';
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const orderId   = generateOrderId();
    
    saveToSheet(timestamp, name, email, e.parameter.phone, e.parameter.occasion, cakeType, e.parameter.eventDate, e.parameter.message, "New", orderId);
    sendOwnerNotification(name, email, e.parameter.phone, e.parameter.occasion, cakeType, e.parameter.eventDate, e.parameter.message, orderId);
    
    sendOrderStatusEmail(email, name, {
      statusKey: 'ordered',
      orderId: orderId,
      cakeType: cakeType,
      bodyText: `Your enquiry for the <strong>${cakeType}</strong> has been successfully received. We are currently reviewing your request and will be in touch shortly to finalize the details.`
    });
    
    return createResponse(200, 'success', 'Enquiry received!');
  } catch (error) {
    return createResponse(500, 'error', error.toString());
  }
}


/** 2. ORDER STATUS AUTOMATION */
function handleStatusChange(e) {
  const range = e.range;
  const sheet = range.getSheet();
  if (sheet.getName() !== SHEET_NAME || range.getColumn() !== STATUS_COLUMN_INDEX) return;
  
  const status = range.getValue();
  const row = range.getRow();
  ensureSheetSchema(sheet);
  const data = sheet.getRange(row, 1, 1, ORDER_ID_COLUMN_INDEX).getValues()[0];
  
  const name  = data[1], email = data[2], type = data[5];
  let orderId = data[9];

  if (!email) return;
  if (!orderId) { orderId = generateOrderId(); sheet.getRange(row, ORDER_ID_COLUMN_INDEX).setValue(orderId); }

  const config = { orderId, cakeType: type };

  if (status === "Preparing") {
    sendOrderStatusEmail(email, name, { ...config, statusKey: 'preparing', bodyText: `Your <strong>${type}</strong> is now in our kitchen. Our artists are carefully preparing every layer to perfection.` });
  } 
  else if (status === "Ready to Collect" || status === "Ready to Pickup") {
    sendOrderStatusEmail(email, name, { ...config, statusKey: 'ready', bodyText: `Your <strong>${type}</strong> is now ready for collection at Ivory Cakery. We look forward to seeing you.` });
  }
  else if (status === "Completed") {
    sendOrderStatusEmail(email, name, { ...config, statusKey: 'completed', bodyText: `We hope your <strong>${type}</strong> was as delightful as the occasion itself. Thank you for choosing Ivory Cakery!` });
  }
  else if (status === "Cancelled") {
    sendOrderStatusEmail(email, name, { ...config, statusKey: 'cancelled', bodyText: `Your order for the <strong>${type}</strong> has been cancelled. Please reach out if you have any questions.` });
  }
}


/** Elegant Order Status Email Template */
function sendOrderStatusEmail(to, name, config) {
  const theme = getEmailTheme(config.statusKey);
  const subject = `${theme.subject} | ${config.orderId}`;
  const tracking = buildTrackingLine(config.statusKey);
  const statusIcon = getCustomIconSVG(config.statusKey);

  const html = `
    <div style="background-color:${COLORS.bg}; padding:50px 10px; font-family:'Georgia', serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:540px; margin:0 auto; background:${COLORS.card}; border:1px solid ${COLORS.border}; border-radius:4px; box-shadow:0 10px 30px rgba(0,0,0,0.02);">
        <tr>
          <td style="padding:45px 40px 20px; text-align:center; border-top:4px solid ${COLORS.accent};">
            <h1 style="margin:0; font-size:18px; letter-spacing:4px; color:${COLORS.text}; font-weight:normal; text-transform:uppercase;">IVORY CAKERY</h1>
            <div style="margin:25px auto 0; width:1px; height:30px; background-color:${COLORS.border};"></div>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 40px 30px; text-align:center;">
            <div style="margin:0 auto 20px; width:80px; height:80px;">${statusIcon}</div>
            <h2 style="margin:0; font-size:24px; color:${COLORS.text}; font-weight:normal; font-style:italic;">${theme.headline}</h2>
            <p style="margin:10px 0 0; font-family:'Helvetica Neue', Arial, sans-serif; font-size:11px; color:${COLORS.muted}; letter-spacing:1px; text-transform:uppercase;">Ref: ${config.orderId}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 45px 40px; font-family:'Helvetica Neue', Arial, sans-serif; font-size:15px; line-height:1.8; color:#4a4a4a; text-align:center;">
            <p>Dear ${name},</p>
            <p style="margin-bottom:30px;">${config.bodyText}</p>
            <div style="margin:40px 0;">${tracking}</div>
            <div style="margin-top:40px; padding-top:30px; border-top:1px solid ${COLORS.border}; text-align:center;">
              <p style="font-size:12px; color:${COLORS.muted}; margin-bottom:5px;">Questions? We're here to help:</p>
              <p style="font-size:14px; color:${COLORS.text}; margin:0;">${CUSTOMER_SUPPORT_PHONE}</p>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding:20px; text-align:center; background-color:#fafafa; border-top:1px solid ${COLORS.border}; border-radius:0 0 4px 4px;">
            <p style="margin:0; font-family:'Helvetica Neue', Arial, sans-serif; font-size:10px; color:#bbbbbb; letter-spacing:1px; text-transform:uppercase;">&copy; 2026 Ivory Cakery</p>
          </td>
        </tr>
      </table>
    </div>
  `;
  try { GmailApp.sendEmail(to, subject, "", { htmlBody: html, name: "Ivory Cakery" }); } catch (e) { Logger.log(e); }
}


/** Returns the raw SVG code for each status */
function getCustomIconSVG(statusKey) {
  const icons = {
    ordered: `<svg viewBox="0 0 259 259" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M187.143 39.5438V241.635C187.143 243.278 186.916 244.865 186.488 246.372C184.427 253.659 177.725 259 169.778 259H48.9516C39.3623 259 31.592 251.225 31.592 241.635V39.5438C31.592 29.9545 39.3623 22.1792 48.9516 22.1792H169.778C179.368 22.1792 187.143 29.9545 187.143 39.5438Z" fill="#A1412B"/><path d="M67.8835 199.9V230.565C67.8835 239.297 74.9584 246.372 83.6911 246.372H186.488C186.916 244.865 187.143 243.278 187.143 241.635V199.9H67.8835Z" fill="#7F392C"/><path d="M169.779 22.1812H48.9522C39.3623 22.1812 31.5901 29.9534 31.5901 39.5432V241.636C31.5901 251.226 39.3623 258.998 48.9522 258.998H169.779C179.369 258.998 187.141 251.226 187.141 241.636V39.5432C187.141 29.9534 179.369 22.1812 169.779 22.1812ZM168.699 240.556H50.032V40.6231H168.699V240.556Z" fill="#DB765A"/><path d="M187.143 199.902V241.635C187.143 243.278 186.916 244.865 186.488 246.372H83.6909C78.7526 246.372 74.3384 244.11 71.4409 240.557H168.7V199.902H187.143Z" fill="#B55434"/><path d="M48.9522 22.1812C39.3633 22.1812 31.5901 29.9544 31.5901 39.5432V149.974C31.5901 155.066 35.7186 159.195 40.8111 159.195C45.9035 159.195 50.032 155.066 50.032 149.974V40.6231H71.0943C76.1868 40.6231 80.3153 36.4946 80.3153 31.4021C80.3153 26.3097 76.1868 22.1812 71.0943 22.1812H48.9522Z" fill="#F2886B"/><path d="M50.032 113.444V71.7962C50.032 66.7037 45.9035 62.5752 40.8111 62.5752C35.7186 62.5752 31.5901 66.7037 31.5901 71.7962V113.444C31.5901 118.536 35.7186 122.665 40.8111 122.665C45.9035 122.665 50.032 118.536 50.032 113.444Z" fill="#F79A7C"/><path d="M146.636 125.321V228.133H83.6903C74.9602 228.133 67.8828 221.056 67.8828 212.326V130.59C67.8828 127.68 70.2421 125.321 73.1522 125.321H146.636Z" fill="#D8D4C9"/><path d="M146.634 125.319V228.136H83.6911C77.7047 228.136 72.4943 224.81 69.8135 219.902C83.1468 202.129 91.043 180.048 91.043 156.123C91.043 145.41 89.4608 135.069 86.5129 125.319H146.634Z" fill="#B5B1A4"/><path d="M99.6286 212.326V6.26935C99.6286 3.35929 101.988 1 104.898 1H223.141C226.051 1 228.41 3.35929 228.41 6.26935V212.326C228.41 221.056 221.333 228.134 212.602 228.134H83.8215C92.5517 228.134 99.6286 221.056 99.6286 212.326Z" fill="#F1EEE0"/><path d="M108.382 128.068C103.548 128.068 99.6294 124.15 99.6294 119.316V30.934C99.6294 26.1 103.548 22.1812 108.382 22.1812C113.216 22.1812 117.135 26.1 117.135 30.934V119.315C117.136 124.15 113.217 128.068 108.382 128.068Z" fill="#F9F8F2"/><path d="M228.408 6.27086V212.328C228.408 221.056 221.333 228.136 212.6 228.136H162.361C193.991 174.344 212.132 111.673 212.132 44.7592C212.132 29.9494 211.245 15.3462 209.516 1H223.142C226.05 1 228.408 3.35828 228.408 6.27086Z" fill="#E8E4D8"/><path d="M99.6294 174.737H228.408V185.656H99.6294V174.737Z" fill="#FFC751"/><path d="M166.233 174.737H119.078C116.063 174.737 113.618 177.181 113.618 180.197C113.618 183.212 116.063 185.656H166.233C169.248 185.656 171.693 183.212 171.693 180.197C171.693 177.181 169.248 174.737 166.233 174.737Z" fill="#FFE059"/><path d="M228.408 6.27086V41.8618H99.6294V6.27086C99.6294 3.35828 101.988 1 104.9 1H223.142C226.049 1 228.408 3.35828 228.408 6.27086Z" fill="#FFC751"/></svg>`,
    preparing: `<svg viewBox="0 0 259 259" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M191.203 155.365V193.759C191.203 199.256 189.019 204.527 185.133 208.414C181.246 212.3 175.975 214.484 170.478 214.484H33.8657C28.3691 214.484 23.0978 212.3 19.2111 208.414C15.3245 204.527 13.1409 199.256 13.1406 193.759V188.832C13.1401 131.063 25.5091 73.9631 49.4158 21.3726L53.6094 12.1406H151.468C155.907 12.1406 160.223 13.6005 163.751 16.2953C167.278 18.9902 169.822 22.7704 170.989 27.0534L176.943 48.8862C186.407 83.5875 191.203 119.396 191.203 155.365Z" fill="#EEDC9A"/><path d="M110.266 188.832V193.759C110.266 199.256 112.449 204.527 116.336 208.414C120.223 212.301 125.494 214.484 130.991 214.484H170.478C175.975 214.484 181.246 212.301 185.133 208.414C189.02 204.527 191.203 199.256 191.203 193.759V155.365C191.203 119.396 186.407 83.5875 176.943 48.8862L170.989 27.0534C169.971 23.3184 167.903 19.9539 165.03 17.359L154.781 12.1406H118.359V44.5156H136.883C119.289 90.5968 110.268 139.507 110.266 188.832Z" fill="#E88604"/><path d="M130.5 32.375V48.5625C130.5 51.7824 131.779 54.8704 134.056 57.1472C136.333 59.424 139.421 60.7031 142.641 60.7031H33.375C30.1551 60.7031 27.0671 59.424 24.7903 57.1472C22.5135 54.8704 21.2344 51.7824 21.2344 48.5625V32.375C21.2344 27.0085 23.3662 21.8618 27.1609 18.0671C30.9556 14.2725 36.1023 12.1406 41.4688 12.1406H150.734C145.368 12.1406 140.221 14.2725 136.427 18.0671C132.632 21.8618 130.5 27.0085 130.5 32.375Z" fill="#ECE9C0"/><path d="M53.6094 141.641C53.6094 149.664 55.1016 157.618 58.0098 165.096L71.9038 200.824C74.8593 208.424 80.0418 214.954 86.772 219.558C93.5023 224.162 101.466 226.625 109.621 226.625H191.848C200.002 226.625 207.966 224.162 214.697 219.558C221.427 214.954 226.609 208.424 229.565 200.824L243.459 165.096C246.367 157.618 247.859 149.664 247.859 141.641H53.6094Z" fill="#379EC3"/><path d="M247.859 141.641C247.859 125.994 204.376 113.312 150.734 113.312C97.093 113.312 53.6094 125.994 53.6094 141.641C53.6094 148.93 63.0538 155.577 78.5735 160.6C96.3494 166.352 122.093 169.969 150.734 169.969C179.376 169.969 205.119 166.352 222.895 160.6C238.415 155.577 247.859 148.93 247.859 141.641Z" fill="#8ACCE7"/></svg>`,
    ready: `<svg viewBox="0 0 259 259" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M103.22 27.334L204.139 66.5735V183.105L103.22 222.345L2.30151 183.105V66.5735L103.22 27.334Z" fill="#D47637"/><path d="M103.22 222.346V80.8865L204.139 66.5737V183.106L103.22 222.346Z" fill="#A35623"/><path d="M103.219 27.335L204.139 66.574L103.219 105.815L2.30029 66.574L103.219 27.335Z" fill="#E2945F"/><path d="M35.7078 79.5638L40.8256 77.5737L74.8426 90.8672L69.8118 92.8234V120.844C69.8118 121.991 68.4738 122.608 67.6017 121.865L52.0197 108.595L37.4464 113.127C35.7073 111.846 35.7078 79.5638 35.7078 79.5638Z" fill="#EFF4F7"/><path d="M136.625 40.3228L170.73 53.5839L69.8118 92.8239L35.7078 79.5638L136.625 40.3228Z" fill="#E2E3E3"/><path d="M204.14 231.666C230.886 231.666 252.7 209.852 252.7 183.106C252.7 156.361 230.886 134.547 204.14 134.547C177.394 134.547 155.581 156.361 155.581 183.106C155.581 209.852 177.394 231.666 204.14 231.666Z" fill="#28BD41"/><path d="M222.526 160.961C225.276 158.212 229.733 158.212 232.481 160.961C235.23 163.711 235.23 168.167 232.481 170.916L198.146 205.251C195.033 208.364 189.89 207.875 187.391 204.297L172.946 186.117C170.531 183.08 171.035 178.66 174.072 176.245C177.111 173.831 181.53 174.335 183.945 177.372L193.761 189.726L222.526 160.961Z" fill="#EFF4F7"/></svg>`,
    completed: `<svg viewBox="0 0 259 259" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M94.1119 253.754V216.858C94.1119 215.886 93.8852 215.059 93.3964 214.218L56.3845 150.857C52.0257 143.414 54.5704 133.774 61.998 129.43C69.4407 125.087 79.0804 127.616 83.4241 135.059L108.534 178.052C109.748 180.123 112.116 181.096 114.434 180.466C125.279 177.523 134.717 177.523 145.561 180.466C147.889 181.096 150.247 180.123 151.461 178.052L176.571 135.059C180.915 127.616 190.555 125.087 197.997 129.43C205.44 133.774 207.97 143.414 203.626 150.857L166.604 214.218C166.12 215.059 165.888 215.891 165.888 216.858V253.754C165.888 256.642 163.53 258.995 160.648 258.995H99.3525C96.4702 259 94.1119 256.642 94.1119 253.754Z" fill="#0593FC"/><path d="M130.005 164.855C144.074 164.855 155.543 153.371 155.543 139.302C155.543 125.233 144.074 113.764 130.005 113.764C115.936 113.764 104.452 125.233 104.452 139.302C104.452 153.366 115.936 164.855 130.005 164.855Z" fill="#0593FC"/><path d="M130.005 74.0916C150.131 74.0916 166.543 57.6794 166.543 37.5534C166.543 17.4122 150.131 1 130.005 1C109.864 1 93.4517 17.4122 93.4517 37.5534C93.4567 57.6794 109.869 74.0916 130.005 74.0916Z" fill="#70DA40"/><path d="M144.336 24.4819C150.222 24.4819 151.443 27.4248 151.443 27.4248C151.443 27.4248 151.443 30.3676 150.222 30.3676L129.98 50.6095C129.98 50.6095 127.037 51.8303 127.037 51.8303C127.037 51.8303 124.094 50.6095 124.094 50.6095L109.783 36.2985C108.156 34.686 108.156 32.0405 109.783 30.4129L127.037 41.781L144.336 24.4819Z" fill="white"/></svg>`,
    cancelled: `<svg viewBox="0 0 259 259" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M210.625 1V33.25L105.812 40.8086L1 33.25V1H210.625Z" fill="#FFEE00"/><path d="M1 33.25H210.625V210.625H1V33.25Z" fill="#FFCC00"/><path d="M105.812 33.25H210.625V210.625H105.812V33.25Z" fill="#FF9E00"/><path d="M130 1V76.208L105.812 65.5V1H130Z" fill="#FF3D58"/><path d="M193.24 259C229.558 259 259 229.558 259 193.24C156.922 127.48 127.48 156.922 127.48 193.24C127.48 229.558 156.922 259 193.24 259Z" fill="#FF3D58"/><path d="M203.928 193.24L223.56 212.872L212.872 223.565L193.24 203.928L173.608 223.565L162.92 212.872L182.552 193.24L162.92 173.608L173.608 162.915L193.24 182.552L212.872 162.915L223.56 173.608L203.928 193.24Z" fill="#F1F1F1"/></svg>`
  };
  return icons[statusKey] || icons.ordered;
}


/** Generates the elegant tracking line SVG */
function buildTrackingLine(statusKey) {
  const stageMap = { ordered: 0, preparing: 1, ready: 2, completed: 3, cancelled: 0 };
  const steps = ['ORDERED', 'PREPARING', 'READY', 'COMPLETED'];
  const points = [40, 160, 280, 400];
  const activeIdx = stageMap[statusKey] || 0;
  
  const activeX = points[activeIdx];
  const nextX = points[Math.min(activeIdx + 1, 3)];
  
  const progressLine = activeIdx > 0 ? `<line x1="40" y1="20" x2="${activeX}" y2="20" stroke="${COLORS.accent}" stroke-width="2" />` : '';
  const loadingPulse = activeIdx < 3 ? `
    <line x1="${activeX}" y1="20" x2="${nextX}" y2="20" stroke="${COLORS.accent}" stroke-width="2" stroke-dasharray="4 4" opacity="0.4">
      <animate attributeName="stroke-dashoffset" from="0" to="-8" dur="1s" repeatCount="indefinite" />
    </line>` : '';

  const nodes = points.map((p, i) => {
    const isDone = i <= activeIdx;
    return `<circle cx="${p}" cy="20" r="${i === activeIdx ? 4 : 3}" fill="${isDone ? COLORS.accent : 'none'}" stroke="${isDone ? COLORS.accent : COLORS.border}" stroke-width="1.5"/>`;
  }).join('');

  const labels = steps.map((step, i) => {
    const color = i === activeIdx ? COLORS.text : COLORS.muted;
    return `<td style="width:25%; text-align:center; color:${color}; font-family:'Helvetica Neue', Arial, sans-serif; font-size:9px; letter-spacing:0.8px;">${step}</td>`;
  }).join('');

  return `
    <div style="max-width:440px; margin:0 auto;">
      <svg width="100%" height="40" viewBox="0 0 440 40">
        <line x1="40" y1="20" x2="400" y2="20" stroke="${COLORS.border}" stroke-width="1" />
        ${progressLine}${loadingPulse}${nodes}
      </svg>
      <table role="presentation" width="100%"><tr>${labels}</tr></table>
    </div>
  `;
}


function getEmailTheme(statusKey) {
  const themes = {
    ordered:   { subject: 'We have received your enquiry', headline: 'Order Received' },
    preparing: { subject: 'Your cake is being prepared', headline: 'In the Oven' },
    ready:     { subject: 'Your order is ready for pickup', headline: 'Ready for You' },
    completed: { subject: 'Thank you for choosing Ivory Cakery', headline: 'Delivered with Love' },
    cancelled: { subject: 'Important update regarding your order', headline: 'Order Updated' }
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


function sendOwnerNotification(name, email, phone, occasion, cakeType, eventDate, message, orderId) {
  const subject = `New Enquiry: ${name} (${orderId})`;
  const html = `<div style="font-family:sans-serif; padding:30px; background:${COLORS.bg};">
    <h2 style="color:${COLORS.text}; font-weight:normal;">New Order Enquiry</h2>
    <p><strong>ID:</strong> ${orderId}<br><strong>Customer:</strong> ${name}<br><strong>Cake:</strong> ${cakeType}</p>
    <a href="${SpreadsheetApp.getActiveSpreadsheet().getUrl()}" style="display:inline-block; border:1px solid ${COLORS.accent}; color:${COLORS.accent}; padding:12px 25px; text-decoration:none; font-size:13px; letter-spacing:1px; margin-top:20px;">VIEW ORDERS SHEET</a>
  </div>`;
  try { GmailApp.sendEmail(OWNER_EMAIL, subject, "", { htmlBody: html, name: "Ivory Cakery Notifications" }); } catch(e){}
  
  let tgMsg = `New Enquiry\nID: ${orderId}\n${name} wants a ${cakeType} for ${occasion} on ${formatEventDate(eventDate)}.`;
  try { UrlFetchApp.fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'post', contentType: 'application/json', payload: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: tgMsg })
  }); } catch(e){}
}


function formatEventDate(eventDate) {
  if (!eventDate) return 'TBD';
  try { return Utilities.formatDate(new Date(eventDate), 'Asia/Kolkata', 'dd/MM/yyyy'); } catch (e) { return eventDate; }
}


function createResponse(statusCode, status, message) {
  return ContentService.createTextOutput(JSON.stringify({ statusCode, status, message })).setMimeType(ContentService.MimeType.JSON);
}
