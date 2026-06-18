import { openApiDocument } from "@/lib/agent-discovery";

export function GET() {
  return Response.json(openApiDocument, {
    headers: {
      "content-type": "application/openapi+json; charset=utf-8"
    }
  });
}
