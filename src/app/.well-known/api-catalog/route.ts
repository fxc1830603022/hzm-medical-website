import { publicApiCatalog } from "@/lib/agent-discovery";

export function GET() {
  return Response.json(publicApiCatalog, {
    headers: {
      "content-type": "application/linkset+json; charset=utf-8"
    }
  });
}
