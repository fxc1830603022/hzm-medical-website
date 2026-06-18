import { consultationSkillMarkdown } from "@/lib/agent-discovery";

export function GET() {
  return new Response(consultationSkillMarkdown, {
    headers: {
      "content-type": "text/markdown; charset=utf-8"
    }
  });
}
