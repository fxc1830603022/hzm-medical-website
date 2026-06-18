import { NextResponse, type NextRequest } from "next/server";
import { agentDiscoveryLinks, approximateMarkdownTokens, markdownForPath } from "@/lib/agent-discovery";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const acceptsMarkdown = request.headers.get("accept")?.toLowerCase().includes("text/markdown");
  const markdown = acceptsMarkdown ? markdownForPath(pathname) : null;

  if (markdown) {
    return new NextResponse(markdown, {
      headers: {
        "content-type": "text/markdown; charset=utf-8",
        "x-markdown-tokens": approximateMarkdownTokens(markdown),
        link: agentDiscoveryLinks
      }
    });
  }

  const response = NextResponse.next();

  if (pathname === "/") {
    response.headers.set("link", agentDiscoveryLinks);
  }

  return response;
}

export const config = {
  matcher: ["/", "/international-patients", "/consultation"]
};
