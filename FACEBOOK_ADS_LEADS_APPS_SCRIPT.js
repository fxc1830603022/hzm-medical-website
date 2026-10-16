const FACEBOOK_SHEET_NAME = "Facebook Ads Leads";
const FACEBOOK_SCRIPT_VERSION = "2026-10-13-facebook-assessment-v1";
const FACEBOOK_HEADERS = [
  "Submitted At", "Full Name", "Country / Region", "Age Range", "Main Concerns",
  "Treatment Timeline", "WhatsApp Number", "Email Address", "Additional Notes",
  "Contact Consent", "Lead Status", "Source", "Sanity Record ID"
];

// Run once from the dedicated spreadsheet's Apps Script editor.
function setupFacebookLeads() {
  const properties = PropertiesService.getScriptProperties();
  const id = properties.getProperty("SPREADSHEET_ID") || "1WoK0FaiflfDR0mZTbwgl6V9cftWz2z_F2MkA4IqA2ps";
  properties.setProperty("SPREADSHEET_ID", id);
  if (!properties.getProperty("WEBHOOK_SECRET")) {
    properties.setProperty("WEBHOOK_SECRET", Utilities.getUuid() + Utilities.getUuid());
  }
  const sheet = getFacebookLeadSheet();
  ensureFacebookHeaders(sheet);
  Logger.log("Spreadsheet: https://docs.google.com/spreadsheets/d/" + id + "/edit");
  Logger.log("WEBHOOK_SECRET is stored in Project Settings > Script Properties. Do not paste it into chat.");
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  let locked = false;
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const secret = PropertiesService.getScriptProperties().getProperty("WEBHOOK_SECRET");
    if (!secret || data.secret !== secret) return facebookJson({ ok: false, error: "Unauthorized" });
    if (data.source !== "facebook-ads-private-assessment-v1" || !/^facebookAdsLead\.[0-9a-f-]{36}$/i.test(data.sanityRecordId || "")) {
      return facebookJson({ ok: false, error: "Invalid Facebook lead source or record ID." });
    }
    if (!data.name || !data.countryRegion || !data.ageGroup || !data.facialConcerns || (!data.whatsapp && !data.email) || data.consent !== "Yes") {
      return facebookJson({ ok: false, error: "Required lead fields are missing." });
    }
    if (!lock.tryLock(15000)) return facebookJson({ ok: false, error: "Busy. Please retry." });
    locked = true;
    const sheet = getFacebookLeadSheet();
    ensureFacebookHeaders(sheet);
    let row = findFacebookLeadRow(sheet, data.sanityRecordId);
    const duplicate = row > 0;
    if (!duplicate) {
      row = sheet.getLastRow() + 1;
      const values = [
        new Date(data.submittedAt || Date.now()), data.name, data.countryRegion, data.ageGroup,
        data.facialConcerns, data.treatmentTimeline, data.whatsapp, data.email,
        data.additionalNotes, data.consent, data.status || "new", data.source, data.sanityRecordId
      ];
      if (isNaN(values[0].getTime())) throw new Error("Invalid submission date.");
      sheet.getRange(row, 2, 1, FACEBOOK_HEADERS.length - 1).setNumberFormat("@");
      sheet.getRange(row, 1, 1, FACEBOOK_HEADERS.length).setValues([values.map(function(value, index) {
        return index === 0 ? value : safeFacebookText(value);
      })]);
      sheet.getRange(row, 1).setNumberFormat("yyyy-mm-dd hh:mm:ss");
    }
    return facebookJson({ ok: true, duplicate: duplicate, rowNumber: row, sheetName: FACEBOOK_SHEET_NAME, scriptVersion: FACEBOOK_SCRIPT_VERSION });
  } catch (error) {
    return facebookJson({ ok: false, error: String(error) });
  } finally {
    if (locked) lock.releaseLock();
  }
}

function doGet() {
  try {
    const sheet = getFacebookLeadSheet();
    ensureFacebookHeaders(sheet);
    return facebookJson({ ok: true, sheetName: FACEBOOK_SHEET_NAME, scriptVersion: FACEBOOK_SCRIPT_VERSION, configured: Boolean(PropertiesService.getScriptProperties().getProperty("WEBHOOK_SECRET")) });
  } catch (error) { return facebookJson({ ok: false, error: String(error) }); }
}

function getFacebookLeadSheet() {
  const id = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
  if (!id) throw new Error("Run setupFacebookLeads first.");
  const spreadsheet = SpreadsheetApp.openById(id);
  return spreadsheet.getSheetByName(FACEBOOK_SHEET_NAME) || spreadsheet.insertSheet(FACEBOOK_SHEET_NAME);
}

function ensureFacebookHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, FACEBOOK_HEADERS.length).setValues([FACEBOOK_HEADERS]);
  } else {
    const headers = sheet.getRange(1, 1, 1, FACEBOOK_HEADERS.length).getDisplayValues()[0];
    if (!FACEBOOK_HEADERS.every(function(value, index) { return headers[index] === value; })) {
      throw new Error("Column headers do not match. Existing data was not changed.");
    }
  }
  sheet.getRange(1, 1, 1, FACEBOOK_HEADERS.length).setFontWeight("bold").setBackground("#176B4A").setFontColor("#FFFFFF").setWrap(true);
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(2);
  sheet.setRowHeight(1, 44);
  sheet.setColumnWidths(1, FACEBOOK_HEADERS.length, 165);
  sheet.setColumnWidth(5, 230);
  sheet.setColumnWidth(9, 300);
  sheet.setColumnWidth(13, 310);
}

function findFacebookLeadRow(sheet, id) {
  const count = sheet.getLastRow() - 1;
  if (count <= 0) return 0;
  const records = sheet.getRange(2, 13, count, 1).getDisplayValues();
  for (let index = 0; index < records.length; index++) {
    if (records[index][0] === id) return index + 2;
  }
  return 0;
}

function safeFacebookText(value) {
  const text = String(value == null ? "" : value).trim();
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function facebookJson(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
