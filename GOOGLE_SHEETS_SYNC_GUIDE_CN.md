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

The script writes these columns:

1. Name
2. Gender
3. Age Group
4. Email
5. Phone
6. WhatsApp
7. WeChat
8. Country / Region
9. Facial Concerns
10. Budget
11. Additional Info
12. Submitted At
13. Source Page
14. Follow-up Status
15. Sanity Record ID

## Reorder existing rows

After replacing and saving the Apps Script, run this function once from the Apps Script toolbar:

```txt
reorderExistingSheetColumns
```

This reorders the existing sheet columns to match the website form order. Future submissions will use the same order automatically.

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
