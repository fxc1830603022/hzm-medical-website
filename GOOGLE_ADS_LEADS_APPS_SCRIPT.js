const SPREADSHEET_ID = "1GK3pGkgnmJZA1-Y4XuwLMp3l_QymSxPRU-sYSl0P2dY";
const SHEET_NAME = "Google Ads Leads";
const SCRIPT_VERSION = "2026-07-31-google-ads-leads-v1";

const HEADERS = [
  "Submitted At",
  "Full Name",
  "Country / Region",
  "Age Range",
  "Main Facial Concerns",
  "Previous Facial Treatments",
  "Expected Treatment Timeline",
  "WhatsApp Number",
  "Email Address",
  "Preferred Contact Method",
  "Additional Notes",
  "Contact Consent",
  "Lead Status",
  "Source",
  "Sanity Record ID"
];

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const expectedSecret = PropertiesService.getScriptProperties().getProperty("WEBHOOK_SECRET") || "";

    if (expectedSecret && data.secret !== expectedSecret) {
      return jsonOutput({ ok: false, error: "Unauthorized" });
    }

    const sheet = getLeadSheet();
    ensureHeaders(sheet);
    const nextRow = sheet.getLastRow() + 1;
    sheet.getRange(nextRow, 1, 1, HEADERS.length).setNumberFormat("@");
    sheet.getRange(nextRow, 1, 1, HEADERS.length).setValues([[
      data.submittedAt || new Date().toISOString(),
      data.name || "",
      data.countryRegion || "",
      data.ageGroup || "",
      data.facialConcerns || "",
      data.previousTreatments || "",
      data.treatmentTimeline || "",
      data.whatsapp || "",
      data.email || "",
      data.preferredContactMethod || "",
      data.additionalNotes || "",
      data.consent || "No",
      data.status || "new",
      data.source || "google-ads-private-assessment-v3",
      data.sanityRecordId || ""
    ]]);

    return jsonOutput({
      ok: true,
      scriptVersion: SCRIPT_VERSION,
      sheetName: sheet.getName(),
      rowNumber: nextRow
    });
  } catch (error) {
    return jsonOutput({ ok: false, error: String(error) });
  }
}

function doGet() {
  try {
    const sheet = getLeadSheet();
    ensureHeaders(sheet);
    return jsonOutput({
      ok: true,
      scriptVersion: SCRIPT_VERSION,
      sheetName: sheet.getName(),
      lastRow: sheet.getLastRow(),
      headerMatches: headersMatch(sheet)
    });
  } catch (error) {
    return jsonOutput({ ok: false, error: String(error) });
  }
}

function getLeadSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    const firstSheet = spreadsheet.getSheets()[0];
    if (firstSheet && firstSheet.getLastRow() === 0) {
      firstSheet.setName(SHEET_NAME);
      sheet = firstSheet;
    } else {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
    }
  }

  return sheet;
}

function ensureHeaders(sheet) {
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold").setBackground("#202321").setFontColor("#FFFFFF");
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, HEADERS.length);
}

function headersMatch(sheet) {
  const current = sheet.getRange(1, 1, 1, HEADERS.length).getDisplayValues()[0];
  return HEADERS.every(function (header, index) {
    return current[index] === header;
  });
}

function jsonOutput(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
