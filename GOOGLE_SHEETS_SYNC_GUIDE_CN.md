# Google 表格同步网站表单教程

目标：网站表单提交后，数据继续进入 Sanity CMS，同时自动追加一行到 Google 表格。

你的表格地址：
https://docs.google.com/spreadsheets/d/1jUpyRU57I97AiiACZyKbStT2Gq9Awr2uoD6m1BNTQIs/edit?hl=zh-cn&gid=0#gid=0

## 第一步：打开 Apps Script

1. 打开上面的 Google 表格。
2. 顶部菜单点击「扩展程序」。
3. 点击「Apps Script」。
4. 删除默认代码，粘贴下面这段代码。

```js
const WEBHOOK_SECRET = "";

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

    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.name || "",
      data.email || "",
      data.phone || "",
      data.country || "",
      data.concern || "",
      data.message || "",
      data.source || "website",
      data.status || "new",
      data.sanityRecordId || ""
    ]);

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
  const headers = [
    "提交时间",
    "姓名",
    "邮箱",
    "电话 / WhatsApp",
    "国家 / 地区",
    "咨询项目",
    "留言",
    "来源页面",
    "跟进状态",
    "Sanity 记录 ID"
  ];

  const firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const hasHeaders = firstRow.some(function (value) {
    return value;
  });

  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  }
}

function jsonOutput(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
```

## 第二步：部署成 Web App

1. 点击右上角「部署」。
2. 选择「新建部署」。
3. 类型选择「Web 应用」。
4. 执行身份选择「我」。
5. 谁可以访问选择「任何人」。
6. 点击「部署」。
7. 第一次会要求授权，按提示允许。
8. 复制部署后得到的「Web 应用网址」。

## 第三步：填到 Vercel

进入 Vercel 项目设置：

Project Settings -> Environment Variables -> Add Environment Variable

添加：

```txt
GOOGLE_SHEETS_WEBHOOK_URL
```

Value 填第二步复制的 Web 应用网址。

环境选择：

```txt
Production and Preview
```

如果你想加一层密钥保护，再添加：

```txt
GOOGLE_SHEETS_WEBHOOK_SECRET
```

并且把 Apps Script 第一行改成同一串密钥：

```js
const WEBHOOK_SECRET = "这里填同一串密钥";
```

## 第四步：重新部署 Vercel

环境变量添加完成后，回到最新 Deployment，点击「Redeploy」。

重新部署完成后，到网站提交一次测试表单。正常情况是：

1. Sanity CMS 的「咨询意见书」会出现一条新数据。
2. Google 表格会自动追加一行。

## 注意

- 不要把 Google Sheets Webhook URL 发到公开网页上。
- `GOOGLE_SHEETS_WEBHOOK_SECRET` 不要以 `NEXT_PUBLIC_` 开头。
- 如果 Google 表格同步失败，网站表单仍然会优先保存到 CMS。
