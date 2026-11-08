// Google Apps Script: receives sign-ups from /api/subscribe and appends them to the sheet.
// Setup: open your Google Sheet -> Extensions -> Apps Script -> paste this file.
// Then Project Settings -> Script properties -> add SECRET (same value as SUBSCRIBE_WEBHOOK_SECRET).

const SHEET_NAME = "signups"; // tab name; create it with headers: email | source | createdAt
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const secret = PropertiesService.getScriptProperties().getProperty("SECRET");
    if (secret && data.secret !== secret) return out({ ok: false, error: "unauthorized" });

    const email = String(data.email || "").trim().toLowerCase();
    if (!EMAIL_RE.test(email) || email.length > 254) return out({ ok: false, error: "invalid email" });

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
      if (!sheet) return out({ ok: false, error: "sheet tab not found: " + SHEET_NAME });

      const last = sheet.getLastRow();
      const existing = last > 1
        ? sheet.getRange(2, 1, last - 1, 1).getValues().flat().map((v) => String(v).toLowerCase())
        : [];
      if (existing.includes(email)) return out({ ok: true, duplicate: true });

      sheet.appendRow([email, String(data.source || ""), String(data.createdAt || new Date().toISOString())]);
    } finally {
      lock.releaseLock();
    }
    return out({ ok: true });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  }
}

function out(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
