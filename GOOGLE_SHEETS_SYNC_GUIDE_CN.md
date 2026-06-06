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

1. Submitted At
2. Name
3. Gender
4. Age Group
5. Nationality
6. Facial Concerns
7. Budget
8. WhatsApp
9. Email
10. WeChat
11. Phone
12. Country / Region
13. Procedure Interest
14. Additional Info
15. Source Page
16. Follow-up Status
17. Sanity Record ID

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
