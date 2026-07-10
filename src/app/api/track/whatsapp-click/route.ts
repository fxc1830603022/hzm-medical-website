import { NextResponse } from "next/server";
import { sendGa4ServerEvents } from "@/lib/ga4-server";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const source = payload?.lastTouch?.source || payload?.firstTouch?.source || "unknown";
    const medium = payload?.lastTouch?.medium || payload?.firstTouch?.medium || "";
    const campaign = payload?.lastTouch?.campaign || payload?.firstTouch?.campaign || "";
    const placement = String(payload?.placement || "whatsapp_click");

    console.info("whatsapp_click", {
      placement,
      page: payload?.page,
      source,
      medium,
      campaign,
      clickedAt: payload?.clickedAt
    });

    const ga4 = await sendGa4ServerEvents(request, [
      {
        name: "whatsapp_click",
        params: {
          event_category: "lead",
          method: "whatsapp",
          placement,
          traffic_source: source,
          traffic_medium: medium,
          campaign,
          lead_source: "whatsapp"
        }
      },
      {
        name: "generate_lead",
        params: {
          event_category: "lead",
          method: "whatsapp",
          placement,
          traffic_source: source,
          traffic_medium: medium,
          campaign,
          lead_source: "whatsapp"
        }
      }
    ]);

    if (ga4.configured && !ga4.sent) {
      console.error("GA4 server WhatsApp sync failed", ga4.error);
    }

    return NextResponse.json({ ok: true, ga4 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
