# Dr. Xiao 9D 网站长期优化计划

更新时间：2026-06-10

## 使用说明

这份文档是 Dr. Xiao 9D 网站后续运营、SEO、GEO、投流、CMS 和转化优化的总纲。

以后如果开启新会话，优先让 Codex 读取这份文档：

`D:\GitHub\HZM\dr-xiao-next-website\hzm-medical-website\WEBSITE_OPTIMIZATION_PLAN_CN.md`

用户是网站运营小白，需要一步步解释。改网站时要先理解现有系统，不要乱删内容。每次重要修改后，应执行构建、提交、推送、Vercel 部署和线上检查。

## 项目基础信息

项目路径：

`D:\GitHub\HZM\dr-xiao-next-website\hzm-medical-website`

正式网站：

`https://www.drxiao9d.com`

CMS 后台：

`https://www.drxiao9d.com/studio`

技术栈：

- Next.js
- Tailwind CSS
- Framer Motion
- Sanity CMS
- Vercel
- Google Sheets 表单同步
- GA4
- Google Search Console

当前运营目标：

把网站从展示型官网，逐步优化成面向海外医美客户的获客系统：官网 + CMS + SEO 内容中心 + 自媒体承接页 + 投流落地页 + 表单线索系统。

## 一、CMS 内容接入

当前已接入：

- 文章
- 案例图
- FAQ
- 表单数据
- 网站设置的一部分
- WeChat QR
- 社媒链接

后续慢慢接入：

1. 首页更多模块接入 CMS
2. 医生页内容接入 CMS
3. 9D Facelift 页面接入 CMS
4. Deep Plane 页面接入 CMS
5. International Patients 页面接入 CMS
6. Before & After 案例信息细化
7. SEO 标题、描述、关键词字段接入 CMS
8. Testimonials 用户评价接入前端展示
9. FAQ 按页面分类管理并持续补充

原则：

先接高频会修改的内容。不要为了 CMS 化而一次性重构全站。

## 二、SEO / GEO 内容布局

SEO 目标：

让 Google 更容易收录和排名网站页面。

GEO 目标：

让 AI 搜索、问答工具和未来生成式搜索更容易理解、引用网站内容。

后续方向：

1. 建立文章资源中心
2. 围绕 Deep Plane Facelift、9D Facelift、International Patients 写专题文章
3. 做问题型关键词文章
4. 每篇文章内部链接到服务页和咨询页
5. 页面加入 FAQ、医生信息、结构化数据
6. 定期查看 Google Search Console 关键词数据
7. 根据“有展示没点击”的词优化标题和描述

优先文章主题：

- What is Deep Plane Facelift?
- Deep Plane Facelift Recovery Timeline
- 9D Facelift vs Deep Plane Facelift
- Facelift Cost for International Patients
- How to Choose a Facelift Surgeon in China
- Natural Facelift Results
- Facelift in China for International Patients
- Online Facelift Consultation for International Patients

内容原则：

医学美容内容要保持专业、克制、可信。避免夸张承诺，避免刺激外貌焦虑。

## 三、独立投流落地页

首页不负责所有转化，后续要做独立落地页承接广告和高意向流量。

优先页面：

1. `/lp/deep-plane-facelift`
2. `/lp/9d-facelift`
3. `/lp/international-facelift-consultation`

每个落地页建议结构：

1. 第一屏钩子
2. 医生信任背书
3. 技术差异
4. 适合人群
5. 案例展示
6. 国际患者流程
7. FAQ
8. 表单 + WhatsApp + WeChat

首个优先落地页：

`/lp/deep-plane-facelift`

目标：

承接 Google Ads、Meta Ads、Instagram、Facebook、YouTube 和其他自媒体流量，让用户更快进入咨询。

## 四、自媒体矩阵导流

公司拥有多个 Instagram / Facebook 账号，每天浏览量很大，这是重要流量资产。

运营逻辑：

Instagram / Facebook 负责种草和放大。

网站负责承接、筛选、转化和沉淀客户线索。

当前建议：

1. 每个账号 Bio 挂带 UTM 的网站链接
2. 不同账号根据内容方向挂不同页面
3. Instagram Story 使用链接贴纸导流
4. Facebook 帖子正文可以直接放链接
5. 建一个 `/links` 官方社媒承接页，替代 Linktree
6. 用 GA4 分析哪个账号带来访问和咨询
7. 后期接 Meta Pixel 做再营销

示例链接：

官方账号首页：

`https://www.drxiao9d.com/?utm_source=instagram&utm_medium=bio&utm_campaign=dr.xiao9d`

案例账号：

`https://www.drxiao9d.com/before-after?utm_source=instagram&utm_medium=bio&utm_campaign=账号名`

国际患者账号：

`https://www.drxiao9d.com/international-patients?utm_source=instagram&utm_medium=bio&utm_campaign=账号名`

后续推荐创建：

`https://www.drxiao9d.com/links`

## 五、转化追踪

当前 GA4 已安装。

后续要继续增强：

1. 表单提交事件
2. WhatsApp 点击事件
3. WeChat 点击事件
4. Instagram / Facebook 来源追踪
5. Google Ads 转化追踪
6. Meta Pixel
7. 后期 Meta Conversions API

追踪目标：

- 谁带来了流量
- 哪个页面转化好
- 哪个账号带来的客户质量高
- 广告是否带来真实咨询

原则：

不要只看浏览量，更要看咨询、WhatsApp 点击、WeChat 点击和表单提交。

## 六、表单与客户管理

当前表单已能进入：

- Sanity CMS
- Google Sheets

现有重要字段：

- Name
- Gender
- Age Group
- Email
- Phone
- WhatsApp
- WeChat，可选
- Country / Region
- Facial Concerns
- Budget
- Additional Info

后续优化：

1. 表单字段继续精简和美化
2. 根据不同页面自动记录来源页面
3. Google 表格字段顺序保持规范
4. 增加客户状态管理
5. 按预算、国家、咨询项目做筛选
6. 后期考虑接 CRM 或 Supabase

原则：

表单既要筛选客户质量，也不能过长导致用户放弃。

## 七、信任信号优化

医美网站最重要的是信任。

后续增加和强化：

1. 医生资历模块
2. 技术理念模块
3. 国际患者流程
4. 真实案例说明
5. 风险和适应症说明
6. 恢复期说明
7. 线上咨询流程
8. 隐私和数据安全说明
9. 术前评估声明

信任信号应渗透在全站，不只放在医生页。

## 八、移动端体验

大量用户会从 Instagram / Facebook 手机打开网站。

后续检查重点：

1. 首页首屏是否抓人
2. 按钮是否明显
3. 表单是否太长
4. 图片是否加载慢
5. FAQ 是否好读
6. WhatsApp / WeChat 是否容易点击
7. 底部导航和浮动按钮是否遮挡内容
8. 落地页手机端转化路径是否足够短

原则：

移动端优先。投流用户大概率不是从电脑访问。

## 九、视觉细节与高级感

当前网站设计方向：

黑、白、金、米色为主，整体保持高级、克制、专业。

后续继续优化：

1. 图标统一品牌感
2. 黑金白色系保持克制
3. 卡片不要太杂
4. 页面留白更高级
5. 图片质量逐步替换
6. 案例区重新美化
7. CMS 后台预览图标继续优化
8. 避免页面像模板站

原则：

网站要高级，但不能只为了好看。视觉最终要服务信任和转化。

## 十、技术稳定性

每次改完网站，推荐流程：

1. 本地构建：`npm run build`
2. 检查 Git 状态
3. 提交 Git
4. 推送 GitHub
5. Vercel 生产部署
6. 检查线上页面
7. 检查 CMS 是否正常
8. 检查表单是否提交成功
9. 检查 GA4 是否仍能收到数据

注意：

不要删除用户已有内容。遇到 CMS、表单、Vercel、GitHub 网络问题时，先确认状态再操作。

## 十一、推荐下一步优先级

短期优先：

1. 做 `/links` 社媒承接页
2. 给 GA4 加表单、WhatsApp、WeChat 转化事件
3. 做 `/lp/deep-plane-facelift` 独立落地页

中期优先：

1. 继续把核心页面内容接入 CMS
2. 开始写第一批 SEO 文章
3. 强化国际患者页
4. 优化案例页和信任模块

长期优先：

1. Search Console 和 GA4 每周复盘
2. 自媒体账号 UTM 数据分析
3. Meta Pixel 和再营销
4. Google Ads / Meta Ads 小预算测试
5. 根据数据迭代落地页和内容

## 十二、与用户协作方式

用户不是技术人员，需要：

- 每一步解释清楚
- 不要只说技术名词
- 修改前说明要改什么
- 修改后说明用户怎么查看
- 部署后给出正式链接
- 出错时解释原因和下一步

用户希望 Codex 作为网站运营师长期参与，不只是写代码。

后续如果用户说“按网站计划继续”，优先读取本文件，并根据当前情况提出当天最值得做的 1-2 个优化任务。

