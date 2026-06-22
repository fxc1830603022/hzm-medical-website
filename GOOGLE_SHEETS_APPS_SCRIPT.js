const WEBHOOK_SECRET = "";
const SPREADSHEET_ID = "1jUpyRU57I97AiiACZyKbStT2Gq9Awr2uoD6m1BNTQIs";
const SHEET_NAME = "";
const SCRIPT_VERSION = "2026-06-22-cms-schema-v4";
const ACTIVE_SPREADSHEET_PROPERTY = "ACTIVE_SPREADSHEET_ID";
const ACTIVE_SHEET_PROPERTY = "ACTIVE_SHEET_NAME";
const FRESH_SPREADSHEET_PREFIX = "Dr Xiao 9D CMS Form Data";
const FRESH_SHEET_PREFIX = "CMS Form Data";
const SANITY_PROJECT_ID = "rawfdegz";
const SANITY_DATASET = "production";
const SANITY_API_VERSION = "2025-02-19";

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
      ok: true,
      scriptVersion: SCRIPT_VERSION,
      spreadsheetId: sheet.getParent().getId(),
      spreadsheetUrl: sheet.getParent().getUrl(),
      sheetName: sheet.getName(),
      activeSpreadsheetId: getActiveSpreadsheetId(),
      activeSheetName: getActiveSheetName(),
      rowNumber: nextRow,
      headers: getCurrentHeaders(sheet),
      headerMatches: headersMatch(sheet)
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
      scriptVersion: SCRIPT_VERSION,
      spreadsheetId: sheet.getParent().getId(),
      spreadsheetName: sheet.getParent().getName(),
      sheetName: sheet.getName(),
      activeSpreadsheetId: getActiveSpreadsheetId(),
      activeSheetName: getActiveSheetName(),
      lastRow: sheet.getLastRow(),
      expectedHeaders: HEADERS,
      currentHeaders: getCurrentHeaders(sheet),
      headerMatches: headersMatch(sheet),
      latestRows: getLatestRows(sheet, 5)
    });
  } catch (error) {
    return jsonOutput({
      ok: false,
      error: String(error)
    });
  }
}

function getActiveSpreadsheetId() {
  return PropertiesService.getScriptProperties().getProperty(ACTIVE_SPREADSHEET_PROPERTY) || SPREADSHEET_ID || "";
}

function getTargetSpreadsheet() {
  const activeSpreadsheetId = getActiveSpreadsheetId();
  const spreadsheet = activeSpreadsheetId
    ? SpreadsheetApp.openById(activeSpreadsheetId)
    : SpreadsheetApp.getActiveSpreadsheet();

  if (!spreadsheet) {
    throw new Error("No spreadsheet found. Set ACTIVE_SPREADSHEET_ID or SPREADSHEET_ID.");
  }

  return spreadsheet;
}

function getActiveSheetName() {
  return PropertiesService.getScriptProperties().getProperty(ACTIVE_SHEET_PROPERTY) || SHEET_NAME || "";
}

function getTargetSheet() {
  const spreadsheet = getTargetSpreadsheet();
  const activeSheetName = getActiveSheetName();

  if (activeSheetName) {
    const namedSheet = spreadsheet.getSheetByName(activeSheetName);
    if (!namedSheet) {
      throw new Error("Sheet tab not found: " + activeSheetName);
    }

    return namedSheet;
  }

  return spreadsheet.getSheets()[0];
}

function ensureHeaders(sheet) {
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.setFrozenRows(1);
}

function getCurrentHeaders(sheet) {
  if (sheet.getLastColumn() < 1) return [];
  return sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), HEADERS.length)).getValues()[0].map(function (header) {
    return String(header || "").trim();
  });
}

function headersMatch(sheet) {
  const currentHeaders = getCurrentHeaders(sheet).slice(0, HEADERS.length);
  if (currentHeaders.length < HEADERS.length) return false;

  for (let i = 0; i < HEADERS.length; i++) {
    if (currentHeaders[i] !== HEADERS[i]) return false;
  }

  return true;
}

function getLatestRows(sheet, count) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];

  const startRow = Math.max(2, lastRow - count + 1);
  const rowCount = lastRow - startRow + 1;
  const values = sheet.getRange(startRow, 1, rowCount, HEADERS.length).getDisplayValues();

  return values.map(function (row, index) {
    const object = {
      rowNumber: startRow + index
    };

    HEADERS.forEach(function (header, columnIndex) {
      object[header] = row[columnIndex] || "";
    });

    return object;
  });
}

function formatTextColumns(sheet, startRow, rowCount) {
  return;
}

function createFreshCmsSubmissionSheet() {
  const spreadsheet = getTargetSpreadsheet();
  const sheetName = getUniqueSheetName(spreadsheet, FRESH_SHEET_PREFIX + " " + Utilities.formatDate(new Date(), "Asia/Shanghai", "yyyyMMdd-HHmm"));
  const sheet = spreadsheet.insertSheet(sheetName);

  PropertiesService.getScriptProperties().setProperty(ACTIVE_SHEET_PROPERTY, sheetName);

  const result = syncFromSanityToSheet(sheet, true);
  Logger.log(JSON.stringify(result));
  return result;
}

function createNewGoogleSpreadsheetFromCms() {
  const spreadsheetName = FRESH_SPREADSHEET_PREFIX + " " + Utilities.formatDate(new Date(), "Asia/Shanghai", "yyyyMMdd-HHmm");
  const spreadsheet = SpreadsheetApp.create(spreadsheetName);
  const sheet = spreadsheet.getSheets()[0];
  const sheetName = FRESH_SHEET_PREFIX;
  sheet.setName(sheetName);

  PropertiesService.getScriptProperties().setProperty(ACTIVE_SPREADSHEET_PROPERTY, spreadsheet.getId());
  PropertiesService.getScriptProperties().setProperty(ACTIVE_SHEET_PROPERTY, sheetName);

  const result = syncFromSanityToSheet(sheet, true);
  result.spreadsheetUrl = spreadsheet.getUrl();
  Logger.log(JSON.stringify(result));
  return result;
}

function useSpreadsheetById(spreadsheetId, sheetName) {
  if (!spreadsheetId) {
    throw new Error("Please pass a spreadsheet ID.");
  }

  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const targetSheetName = sheetName || spreadsheet.getSheets()[0].getName();
  let sheet = spreadsheet.getSheetByName(targetSheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(targetSheetName);
  }

  PropertiesService.getScriptProperties().setProperty(ACTIVE_SPREADSHEET_PROPERTY, spreadsheet.getId());
  PropertiesService.getScriptProperties().setProperty(ACTIVE_SHEET_PROPERTY, targetSheetName);
  ensureHeaders(sheet);

  const result = {
    ok: true,
    scriptVersion: SCRIPT_VERSION,
    spreadsheetId: spreadsheet.getId(),
    spreadsheetName: spreadsheet.getName(),
    spreadsheetUrl: spreadsheet.getUrl(),
    sheetName: sheet.getName(),
    activeSpreadsheetId: getActiveSpreadsheetId(),
    activeSheetName: getActiveSheetName(),
    headerMatches: headersMatch(sheet)
  };
  Logger.log(JSON.stringify(result));
  return result;
}

function syncFromSanity() {
  const result = syncFromSanityToSheet(getTargetSheet(), true);
  Logger.log(JSON.stringify(result));
  return result;
}

function syncFromSanityToSheet(sheet, clearSheet) {
  const submissions = fetchSanitySubmissions();
  const rows = submissions.map(mapSanitySubmissionToRow);

  if (clearSheet) {
    sheet.clearContents();
  }

  ensureHeaders(sheet);

  if (rows.length) {
    sheet.getRange(2, 1, rows.length, HEADERS.length).setValues(rows);
  }

  sheet.autoResizeColumns(1, HEADERS.length);

  return {
    ok: true,
    scriptVersion: SCRIPT_VERSION,
    spreadsheetId: sheet.getParent().getId(),
    spreadsheetName: sheet.getParent().getName(),
    spreadsheetUrl: sheet.getParent().getUrl(),
    sheetName: sheet.getName(),
    activeSpreadsheetId: getActiveSpreadsheetId(),
    activeSheetName: getActiveSheetName(),
    rowsWritten: rows.length,
    headers: getCurrentHeaders(sheet),
    headerMatches: headersMatch(sheet)
  };
}

function fetchSanitySubmissions() {
  const query = [
    '*[_type == "consultationSubmission"] | order(coalesce(createdAt, _createdAt) asc) {',
    '  _id,',
    '  name,',
    '  gender,',
    '  ageGroup,',
    '  nationality,',
    '  country,',
    '  facialConcerns,',
    '  concern,',
    '  budget,',
    '  whatsapp,',
    '  email,',
    '  wechat,',
    '  phone,',
    '  interestedIn,',
    '  hearAbout,',
    '  message,',
    '  status,',
    '  source,',
    '  createdAt,',
    '  _createdAt',
    '}'
  ].join("\n");
  const url = "https://" + SANITY_PROJECT_ID + ".api.sanity.io/v" + SANITY_API_VERSION + "/data/query/" + SANITY_DATASET + "?query=" + encodeURIComponent(query);
  const response = UrlFetchApp.fetch(url, {
    method: "get",
    muteHttpExceptions: true
  });
  const statusCode = response.getResponseCode();
  const body = response.getContentText();

  if (statusCode < 200 || statusCode >= 300) {
    throw new Error("Sanity fetch failed with " + statusCode + ": " + body.slice(0, 200));
  }

  const payload = JSON.parse(body);
  return payload.result || [];
}

function mapSanitySubmissionToRow(item) {
  return [
    item.name || "",
    item.gender || "",
    item.ageGroup || "",
    item.nationality || item.country || "",
    item.facialConcerns || item.concern || "",
    item.budget || "",
    item.whatsapp || "",
    item.email || "",
    item.wechat || "",
    item.phone || "",
    item.interestedIn || "",
    item.hearAbout || "",
    item.message || "",
    item.status || "new",
    item.source || "website",
    item.createdAt || item._createdAt || "",
    item._id || ""
  ];
}

function getUniqueSheetName(spreadsheet, baseName) {
  let sheetName = baseName;
  let index = 2;

  while (spreadsheet.getSheetByName(sheetName)) {
    sheetName = baseName + " " + index;
    index++;
  }

  return sheetName;
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
  const aliases = HEADER_ALIASES[header] || [];

  if (header === "Created At") {
    for (let i = 0; i < aliases.length; i++) {
      const aliasIndex = currentHeaders.indexOf(aliases[i]);
      if (aliasIndex !== -1) return aliasIndex;
    }
  }

  const directIndex = currentHeaders.indexOf(header);
  if (directIndex !== -1) return directIndex;

  for (let i = 0; i < aliases.length; i++) {
    const aliasIndex = currentHeaders.indexOf(aliases[i]);
    if (aliasIndex !== -1) return aliasIndex;
  }

  return -1;
}

function jsonOutput(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
