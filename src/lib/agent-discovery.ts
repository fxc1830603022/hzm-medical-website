import { absoluteUrl, seoDefaults, siteUrl } from "./seo";

export const agentDiscoveryLinks = [
  `</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"`,
  `</.well-known/openapi.json>; rel="service-desc"; type="application/openapi+json"`,
  `</consultation>; rel="service-doc"; type="text/html"`,
  `</llms.txt>; rel="describedby"; type="text/markdown"`,
  `</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"`
].join(", ");

export function markdownForPath(pathname: string) {
  const pages: Record<string, string> = {
    "/": `# ${seoDefaults.siteName}

Official English website for Dr. Xiao Zhongye's 9D Facelift practice in Shanghai, China.

## Main Resources

- Doctor profile: ${absoluteUrl("/doctor")}
- 9D Facelift: ${absoluteUrl("/procedures/9d-facelift")}
- 9D Deep Plane Facelift: ${absoluteUrl("/procedures/9d-deep-plane-facelift")}
- International patient guide: ${absoluteUrl("/international-patients")}
- Online consultation: ${absoluteUrl("/consultation")}
- Articles: ${absoluteUrl("/blog")}
- Machine-readable site guide: ${absoluteUrl("/llms.txt")}
- API catalog: ${absoluteUrl("/.well-known/api-catalog")}

## Medical Context

Website content is educational and does not replace medical consultation. Online assessment is preliminary. A final surgical plan requires in-person medical evaluation. Individual results vary, and no surgical result can be guaranteed.
`,
    "/international-patients": `# International Patients

Start with online photo assessment before arranging travel to Shanghai. Useful assessment photos include front, left side, right side, 45-degree, smile or expression, and neck or jawline views.

Online review is preliminary. Final planning, suitability, price, and procedure choice require medical assessment.

Consultation: ${absoluteUrl("/consultation")}
`,
    "/consultation": `# Online Consultation

Use this page to submit goals, photos, previous treatment history, country or region, travel timing, and contact details for a preliminary 9D Facelift assessment.

Consultation form: ${absoluteUrl("/consultation")}
`
  };

  return pages[pathname] || null;
}

export function approximateMarkdownTokens(markdown: string) {
  return String(Math.max(1, Math.ceil(markdown.trim().split(/\s+/).length * 1.35)));
}

export const publicApiCatalog = {
  linkset: [
    {
      anchor: siteUrl,
      "service-desc": [
        {
          href: absoluteUrl("/.well-known/openapi.json"),
          type: "application/openapi+json",
          title: "Dr. Xiao 9D public website API description"
        }
      ],
      "service-doc": [
        {
          href: absoluteUrl("/consultation"),
          type: "text/html",
          title: "Online consultation and lead submission guidance"
        }
      ],
      status: [
        {
          href: absoluteUrl("/api/health"),
          type: "application/json",
          title: "Public health check"
        }
      ],
      describedby: [
        {
          href: absoluteUrl("/llms.txt"),
          type: "text/markdown",
          title: "Machine-readable website summary"
        }
      ]
    }
  ]
};

export const openApiDocument = {
  openapi: "3.1.0",
  info: {
    title: "Dr. Xiao 9D Public Website API",
    version: "1.0.0",
    description:
      "Public lead intake endpoints used by the Dr. Xiao 9D website. These endpoints are intended for user-initiated consultation and newsletter submissions, not automated scraping or medical decision-making."
  },
  servers: [
    {
      url: siteUrl
    }
  ],
  paths: {
    "/api/health": {
      get: {
        summary: "Public health check",
        responses: {
          "200": {
            description: "Service is available"
          }
        }
      }
    },
    "/api/contact": {
      post: {
        summary: "Submit an online consultation inquiry",
        description:
          "Stores a user-initiated consultation request. Do not submit on behalf of a patient without explicit consent.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "gender", "ageGroup", "country", "facialConcerns", "budget", "whatsapp", "email"],
                properties: {
                  name: { type: "string" },
                  gender: { type: "string" },
                  ageGroup: { type: "string" },
                  country: { type: "string" },
                  facialConcerns: { type: "string" },
                  budget: { type: "string" },
                  whatsapp: { type: "string" },
                  email: { type: "string", format: "email" },
                  wechat: { type: "string" },
                  message: { type: "string" }
                }
              }
            }
          }
        },
        responses: {
          "200": { description: "Inquiry stored" },
          "422": { description: "Required fields missing" },
          "503": { description: "Storage backend unavailable" }
        }
      }
    },
    "/api/newsletter": {
      post: {
        summary: "Subscribe to article updates",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email"],
                properties: {
                  email: { type: "string", format: "email" }
                }
              }
            }
          }
        },
        responses: {
          "200": { description: "Subscription stored" },
          "422": { description: "Invalid email" },
          "503": { description: "Storage backend unavailable" }
        }
      }
    }
  }
};

export const consultationSkillMarkdown = `# Dr. Xiao 9D International Patient Assessment Skill

Use this skill when an agent is helping a user understand how to prepare for a preliminary 9D Facelift online assessment with Dr. Xiao Zhongye's team.

## Purpose

Guide users toward safe, consent-based consultation preparation. The agent should explain what information is useful before travel, including photos, previous treatments, health history, recovery timing, and contact preferences.

## Important Safety Rules

- Do not diagnose, promise suitability, quote a final price, or guarantee surgical results.
- Explain that online assessment is preliminary.
- Explain that final planning requires in-person medical consultation.
- Ask the user to submit information only with their own consent.
- For urgent medical concerns, advise the user to seek local medical care.

## Useful Links

- International patients: ${absoluteUrl("/international-patients")}
- Online consultation: ${absoluteUrl("/consultation")}
- Machine-readable site summary: ${absoluteUrl("/llms.txt")}
`;
