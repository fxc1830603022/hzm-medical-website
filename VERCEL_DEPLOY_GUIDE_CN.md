# GitHub + Vercel 部署小白清单

## 0. 不要上传的东西

这些文件/文件夹不要上传到 GitHub，项目已经用 `.gitignore` 自动忽略：

```text
.env.local
node_modules
.next
.npm-cache
*.log
.vercel
screenshots
```

重点记住：`.env.local` 里面有 Sanity token、飞书 secret，不能上传。

## 1. 上传到 GitHub

推荐方式：GitHub Desktop。

1. 打开 GitHub Desktop
2. 选择 `File -> Add local repository`
3. 选择项目文件夹：

```text
C:\Users\9D\Desktop\dr-xiao-next-website
```

4. 如果提示不是 Git 仓库，选择创建仓库
5. 仓库名可以用：

```text
dr-xiao-next-website
```

6. Commit message 填：

```text
Initial Next.js Sanity website
```

7. 点击 `Publish repository`

发布前确认不要勾选 `.env.local`。

## 2. 导入 Vercel

1. 打开 Vercel
2. 选择 `Add New -> Project`
3. 选择刚才的 GitHub 仓库
4. Framework 选择/识别为 `Next.js`
5. Build Command 使用默认或：

```bash
npm run build
```

6. Install Command 使用：

```bash
npm install
```

## 3. 配置 Vercel 环境变量

在 Vercel 项目里进入：

```text
Project Settings -> Environment Variables
```

添加这些变量。值从本地 `.env.local` 复制，但不要发到公开地方。

必须配置：

```text
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION
SANITY_API_TOKEN
FORM_STORAGE
```

当前建议：

```text
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-02-19
FORM_STORAGE=sanity
```

飞书同步如果暂时没完全授权，可以先不填；不填不会影响 Sanity CMS 收表单。

```text
FEISHU_APP_ID
FEISHU_APP_SECRET
FEISHU_BITABLE_APP_TOKEN
FEISHU_BITABLE_TABLE_ID
```

## 4. Sanity CORS 白名单

Vercel 部署完成后，会得到一个地址，例如：

```text
https://dr-xiao-next-website.vercel.app
```

打开 Sanity 后台：

```text
https://www.sanity.io/manage
```

进入你的项目：

```text
Project Settings -> API -> CORS origins
```

添加：

```text
https://你的-vercel-地址.vercel.app
```

以后绑定正式域名后，也要把正式域名加入 CORS：

```text
https://你的正式域名.com
```

## 5. 部署后检查

部署成功后依次打开：

```text
https://你的-vercel-地址.vercel.app
https://你的-vercel-地址.vercel.app/studio
```

检查：

- 首页能打开
- 博客能打开
- `/studio` 能登录
- `Consultation Submission` 能看到表单提交
- 提交中文表单不乱码

## 6. 常见问题

### 表单提交失败

先检查 Vercel 环境变量：

```text
SANITY_API_TOKEN
FORM_STORAGE=sanity
```

### Studio 打不开或提示 CMS 未连接

检查：

```text
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
```

### 上线后前台读不到 CMS 内容

去 Sanity CORS 添加 Vercel 域名。

### 飞书没有同步

飞书同步需要应用权限和文档写入权限。Sanity CMS 是主存储，飞书可以后面继续补。
