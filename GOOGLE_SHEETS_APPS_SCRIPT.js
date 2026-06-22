const WEBHOOK_SECRET = "";
const SPREADSHEET_ID = "1jUpyRU57I97AiiACZyKbStT2Gq9Awr2uoD6m1BNTQIs";
const SHEET_NAME = "";

const HEADERS = [
  "Name",
  "Gender",
  "Age Group",
  "Country / Region",
  "Facial Concerns",
  "Budget",
  "WhatsApp",
  "Email",
  "WeChat",
  "Phone",
  "Interested In",
  "How Did You Hear About Us?",
  "Message",
  "Status",
  "Source",
  "Created At",
  "Sanity Record ID"
];

const HEADER_ALIASES = {
  "Message": ["Additional Info"],
  "Source": ["Source Page"],
  "Status": ["Follow-up Status"],
  "Created At": ["Submitted At"]
};

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
      data.country || data.nationality || "",
      data.facialConcerns || "",
      data.budget || "",
      data.whatsapp || "",
      data.email || "",
      data.wechat || "",
      data.phone || "",
      data.interestedIn || "",
      data.hearAbout || "",
      data.message || "",
      data.status || "new",
      data.source || "website",
      data.createdAt || data.submittedAt || new Date().toISOString(),
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
      const oldIndex = findHeaderIndex(currentHeaders, header);
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

function findHeaderIndex(currentHeaders, header) {
  const directIndex = currentHeaders.indexOf(header);
  if (directIndex !== -1) return directIndex;

  const aliases = HEADER_ALIASES[header] || [];
  for (let i = 0; i < aliases.length; i++) {
    const aliasIndex = currentHeaders.indexOf(aliases[i]);
    if (aliasIndex !== -1) return aliasIndex;
  }

  return -1;
}

function jsonOutput(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
