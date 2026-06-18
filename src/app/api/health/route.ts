import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "dr-xiao-9d-public-website",
    timestamp: new Date().toISOString()
  });
}
