# Dr. Xiao 9D Lifting — 网站部署说明

## 文件结构

```
website-deploy/
├── index.html          ← 网站首页（默认打开）
├── blog.html           ← 博客文章页面
├── admin.html          ← CMS 管理后台
├── css/
│   ├── style.css       ← 前台样式
│   ├── blog.css        ← 博客样式
│   └── admin.css       ← 后台样式
├── js/
│   ├── main.js         ← 前台交互
│   ├── blog.js         ← 博客功能
│   └── admin.js        ← 后台管理逻辑
├── images/             ← 所有图片资源
├── .htaccess           ← Apache 配置
├── web.config          ← IIS 配置
└── robots.txt          ← 搜索引擎爬虫规则
```

## 部署方式

### 方式一：虚拟主机 / Apache 服务器

1. 将 `website-deploy` 目录下的**所有文件**上传到服务器根目录（如 `public_html` 或 `www`）
2. 确认 `.htaccess` 文件已上传（隐藏文件需开启显示）
3. 访问域名即可看到网站

### 方式二：Windows IIS 服务器

1. 将所有文件上传到 IIS 网站目录
2. `web.config` 会自动生效
3. 确保 IIS 已安装"静态内容"功能

### 方式三：Netlify / Vercel（推荐）

1. 登录 Netlify (netlify.com) 或 Vercel (vercel.com)
2. 将 `website-deploy` 文件夹拖拽到部署页面
3. 自动部署完成，免费获得 HTTPS 证书

### 方式四：GitHub Pages（免费）

1. 将文件推送到 GitHub 仓库
2. 在 Settings → Pages 中启用
3. 可选择绑定自定义域名

## CMS 管理后台

- **访问地址**：`https://你的域名/admin.html`
- **默认账号**：`admin`
- **默认密码**：`admin123`
- **重要**：登录后请立即修改密码（修改 `js/admin.js` 中的 `ADMIN_PASS` 变量）

### 修改后台密码

编辑 `js/admin.js` 第 6 行：
```javascript
const ADMIN_PASS = "admin123";  // 改成你的新密码
```

### 增强后台安全（推荐）

1. **Apache**：在 `.htaccess` 中取消 IP 限制注释，填入你的 IP
2. **修改后台路径**：将 `admin.html` 改名为难以猜测的路径，如 `x9d-mgmt-2024.html`
3. **Nginx** 用户：添加以下配置
   ```nginx
   location = /admin.html {
       allow 你的IP;
       deny all;
   }
   ```

## 数据说明

CMS 数据存储在浏览器 localStorage 中：
- 文章数据 → `cms_posts`
- 网站设置 → `cms_settings`

⚠️ **注意**：localStorage 是本地存储，不同浏览器/设备之间数据不共享。
建议定期在后台"网站设置"页面点击"导出数据"备份。

## 常见问题

### Q: 上传后显示 404 或空白页？
A: 确保 `index.html` 在服务器根目录，检查文件名大小写（Linux 区分大小写）。

### Q: 图片不显示？
A: 检查 `images` 文件夹是否完整上传，路径是否正确。

### Q: 后台进不去？
A: 检查浏览器控制台 (F12) 是否有 JS 错误，清除浏览器缓存后重试。

### Q: 表单提交没有反应？
A: 当前为纯静态站点，联系表单需要对接后端服务（如 Formspree、EmailJS 等）。

## 技术支持

如有问题，请联系网站管理员。
