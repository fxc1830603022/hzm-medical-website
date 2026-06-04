# Dr. Xiao 9D Website

This is the Next.js version of the Dr. Xiao 9D brand website.

## Tech Stack

- Next.js App Router
- Tailwind CSS
- Framer Motion
- Sanity CMS Studio at `/studio`
- Vercel deployment
- Supabase reserved for later database use
- Cloudflare R2 reserved for later image storage

## Local Development

```bash
npm install
npm run dev
```

Local URLs:

```text
Website: http://127.0.0.1:3000
Studio:  http://127.0.0.1:3000/studio
```

The desktop helper script `START_WEBSITE_3001.cmd` starts the site on:

```text
http://127.0.0.1:3001
```

## Environment Variables

Copy `.env.example` to `.env.local` for local development.

Never upload `.env.local` to GitHub. It contains private tokens.

Required for Sanity CMS:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-02-19
SANITY_API_TOKEN=
FORM_STORAGE=sanity
```

Optional for Feishu / Lark lead sync:

```bash
FEISHU_APP_ID=
FEISHU_APP_SECRET=
FEISHU_BITABLE_APP_TOKEN=
FEISHU_BITABLE_TABLE_ID=
```

Optional reserved variables:

```bash
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
CLOUDFLARE_R2_PUBLIC_URL=
CLOUDFLARE_R2_ACCOUNT_ID=
CLOUDFLARE_R2_BUCKET=
CLOUDFLARE_R2_ACCESS_KEY_ID=
CLOUDFLARE_R2_SECRET_ACCESS_KEY=
```

## CMS Content

Old website content is seeded in:

```text
sanity-seed.ndjson
```

Import seed content after configuring Sanity:

```bash
npm run sanity:import
```

Current Sanity document types include:

- Article
- Gallery Item
- Site Settings
- Consultation Submission
- Newsletter Subscriber
- Doctor
- Treatment
- FAQ Item
- Testimonial

## Deployment

1. Push this project to GitHub.
2. Import the GitHub repository in Vercel.
3. Add the environment variables from `.env.local` into Vercel Project Settings.
4. Deploy.
5. Add the Vercel domain and final custom domain to Sanity CORS origins.

For a beginner-friendly deployment checklist, see:

```text
VERCEL_DEPLOY_GUIDE_CN.md
```
