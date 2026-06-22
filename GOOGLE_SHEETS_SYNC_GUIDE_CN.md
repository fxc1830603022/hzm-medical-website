# Google Sheets form sync guide

This project sends consultation form submissions to Sanity CMS first, then syncs the same lead data to Google Sheets through a Google Apps Script Web App.

Current sheet:

https://docs.google.com/spreadsheets/d/1jUpyRU57I97AiiACZyKbStT2Gq9Awr2uoD6m1BNTQIs/edit?hl=zh-cn&gid=0#gid=0

## Update the Apps Script

1. Open the Google Sheet.
2. Click Extensions -> Apps Script.
3. Replace the script with the code in `GOOGLE_SHEETS_APPS_SCRIPT.js`.
4. Click Deploy -> Manage deployments.
5. Edit the existing Web App deployment.
6. Keep these settings:
   - Execute as: Me
   - Who has access: Anyone
7. Click Deploy / Update.

Important: the script now uses `SPREADSHEET_ID` to write directly to the target Google Sheet. This avoids the common problem where Apps Script returns `ok: true` but writes to another bound spreadsheet instead of the sheet you are viewing.

The script writes these columns:

1. Name
2. Gender
3. Age Group
4. Country / Region
5. Facial Concerns
6. Budget
7. WhatsApp
8. Email
9. WeChat
10. Phone
11. Interested In
12. How Did You Hear About Us?
13. Message
14. Status
15. Source
16. Created At
17. Sanity Record ID

## Reorder existing rows

After replacing and saving the Apps Script, run this function once from the Apps Script toolbar:

```txt
reorderExistingSheetColumns
```

This reorders the existing sheet columns to match the CMS consultation submission schema order. Future submissions will use the same order automatically.

## Vercel environment variable

The Vercel project needs:

```txt
GOOGLE_SHEETS_WEBHOOK_URL
```

The value should be the Apps Script Web App URL ending in `/exec`.

Optional:

```txt
GOOGLE_SHEETS_WEBHOOK_SECRET
```

If this is used, set the same value in the first line of `GOOGLE_SHEETS_APPS_SCRIPT.js`.

## Test

After the Vercel deployment is ready and the Apps Script has been updated, submit a test lead on the website.

Expected result:

1. Sanity CMS gets one new consultation submission.
2. Google Sheets gets one new row with all form fields.
