const WEBHOOK_SECRET = "";

const HEADERS = [
  "Submitted At",
  "Name",
  "Gender",
  "Age Group",
  "Nationality",
  "Facial Concerns",
  "Budget",
  "WhatsApp",
  "Email",
  "WeChat",
  "Phone",
  "Country / Region",
  "Procedure Interest",
  "Additional Info",
  "Source Page",
  "Follow-up Status",
  "Sanity Record ID"
];

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");

    if (WEBHOOK_SECRET && data.secret !== WEBHOOK_SECRET) {
      return jsonOutput({
        ok: false,
        error: "Unauthorized"
      });
    }

    ensureHeaders(sheet);

    const nextRow = sheet.getLastRow() + 1;
    sheet.getRange(nextRow, 8).setNumberFormat("@");
    sheet.getRange(nextRow, 10).setNumberFormat("@");
    sheet.getRange(nextRow, 11).setNumberFormat("@");
    sheet.getRange(nextRow, 1, 1, HEADERS.length).setValues([[
      data.submittedAt || new Date().toISOString(),
      data.name || "",
      data.gender || "",
      data.ageGroup || "",
      data.nationality || "",
      data.facialConcerns || "",
      data.budget || "",
      data.whatsapp || "",
      data.email || "",
      data.wechat || "",
      data.phone || "",
      data.country || "",
      data.concern || "",
      data.message || "",
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

function ensureHeaders(sheet) {
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.setFrozenRows(1);
}

function jsonOutput(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
