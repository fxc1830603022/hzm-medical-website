import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    console.info("whatsapp_click", {
      placement: payload?.placement,
      page: payload?.page,
      source: payload?.lastTouch?.source || payload?.firstTouch?.source,
      medium: payload?.lastTouch?.medium || payload?.firstTouch?.medium,
      campaign: payload?.lastTouch?.campaign || payload?.firstTouch?.campaign,
      clickedAt: payload?.clickedAt
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
