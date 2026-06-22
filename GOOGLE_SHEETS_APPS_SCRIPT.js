const WEBHOOK_SECRET = "";
const SPREADSHEET_ID = "1jUpyRU57I97AiiACZyKbStT2Gq9Awr2uoD6m1BNTQIs";
const SHEET_NAME = "";

const HEADERS = [
  "Name",
  "Gender",
  "Age Group",
  "Email",
  "Phone",
  "WhatsApp",
  "WeChat",
  "Country / Region",
  "Facial Concerns",
  "Budget",
  "How Did You Hear About Us?",
  "Additional Info",
  "Submitted At",
  "Source Page",
  "Follow-up Status",
  "Sanity Record ID"
];

function doPost(e) {
  try {
    const sheet = getTargetSheet();
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");

    if (WEBHOOK_SECRET && data.secret !== WEBHOOK_SECRET) {
      return jsonOutput({
        ok: false,
        error: "Unauthorized"
      });
    }

    ensureHeaders(sheet);

    const nextRow = sheet.getLastRow() + 1;
    formatTextColumns(sheet, nextRow, 1);
    sheet.getRange(nextRow, 1, 1, HEADERS.length).setValues([[
      data.name || "",
      data.gender || "",
      data.ageGroup || "",
      data.email || "",
      data.phone || "",
      data.whatsapp || "",
      data.wechat || "",
      data.country || data.nationality || "",
      data.facialConcerns || "",
      data.budget || "",
      data.hearAbout || "",
      data.message || "",
      data.submittedAt || new Date().toISOString(),
      data.source || "website",
      data.status || "new",
      data.sanityRecordId || ""
    ]]);

    return jsonOutput({
      ok: true
    });
  } catch (error) {
    return jsonOutput({
      ok: false,
      error: String(error)
    });
  }
}

function doGet() {
  try {
    const sheet = getTargetSheet();

    return jsonOutput({
      ok: true,
      spreadsheetId: sheet.getParent().getId(),
      spreadsheetName: sheet.getParent().getName(),
      sheetName: sheet.getName(),
      lastRow: sheet.getLastRow()
    });
  } catch (error) {
    return jsonOutput({
      ok: false,
      error: String(error)
    });
  }
}

function getTargetSheet() {
  const spreadsheet = SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();

  if (!spreadsheet) {
    throw new Error("No spreadsheet found. Set SPREADSHEET_ID to your Google Sheet ID.");
  }

  if (SHEET_NAME) {
    const namedSheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!namedSheet) {
      throw new Error("Sheet tab not found: " + SHEET_NAME);
    }

    return namedSheet;
  }

  return spreadsheet.getSheets()[0];
}

function ensureHeaders(sheet) {
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.setFrozenRows(1);
}

function formatTextColumns(sheet, startRow, rowCount) {
  sheet.getRange(startRow, 5, rowCount, 1).setNumberFormat("@");
  sheet.getRange(startRow, 6, rowCount, 1).setNumberFormat("@");
  sheet.getRange(startRow, 7, rowCount, 1).setNumberFormat("@");
}

function reorderExistingSheetColumns() {
  const sheet = getTargetSheet();
  const values = sheet.getDataRange().getValues();

  if (!values.length) {
    ensureHeaders(sheet);
    return;
  }

  const currentHeaders = values[0].map(function (header) {
    return String(header || "").trim();
  });

  const reorderedRows = values.slice(1).map(function (row) {
    return HEADERS.map(function (header) {
      const oldIndex = currentHeaders.indexOf(header);
      return oldIndex === -1 ? "" : row[oldIndex];
    });
  });

  sheet.clearContents();
  sheet.getRange(1, 1, reorderedRows.length + 1, HEADERS.length).setValues([HEADERS].concat(reorderedRows));
  sheet.setFrozenRows(1);

  if (reorderedRows.length) {
    formatTextColumns(sheet, 2, reorderedRows.length);
  }
}

function jsonOutput(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
