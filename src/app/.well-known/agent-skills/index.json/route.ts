import { createHash } from "crypto";
import { consultationSkillMarkdown } from "@/lib/agent-discovery";
import { absoluteUrl } from "@/lib/seo";

export function GET() {
  const digest = createHash("sha256").update(consultationSkillMarkdown).digest("hex");

  return Response.json(
    {
      $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
      skills: [
        {
          name: "dr-xiao-international-patient-assessment",
          type: "skill-md",
          description:
            "Guidance for consent-based preliminary 9D Facelift online assessment preparation for international patients.",
          url: absoluteUrl("/.well-known/agent-skills/dr-xiao-international-patient-assessment/SKILL.md"),
          digest: `sha256:${digest}`
        }
      ]
    },
    {
      headers: {
        "content-type": "application/json; charset=utf-8"
      }
    }
  );
}
