import { NextResponse } from "next/server";
import { syncLeadToFeishu } from "@/lib/feishu";
import { syncLeadToGoogleSheets } from "@/lib/google-sheets";
import { createConsultationSubmission } from "@/lib/sanity-write";
import { makeSupabaseAdminClient } from "@/lib/supabase";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  country?: string;
  concern?: string;
  message?: string;
  source?: string;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 3000) : "";
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as ContactPayload;
  const payload = {
    name: clean(body.name),
    email: clean(body.email),
    phone: clean(body.phone),
    country: clean(body.country),
    concern: clean(body.concern),
    message: clean(body.message),
    status: "new",
    source: clean(body.source) || "website",
    createdAt: new Date().toISOString()
  };

  if (!payload.name || !payload.email) {
    return NextResponse.json({ ok: false, error: "Name and email are required." }, { status: 422 });
  }

  const preferredStorage = process.env.FORM_STORAGE || "sanity";
  let primaryStorage = "";
  let sanityRecordId = "";
  const errors: string[] = [];

  if (preferredStorage === "supabase") {
    const supabase = makeSupabaseAdminClient();
    if (supabase) {
      const { error } = await supabase.from("consultation_submissions").insert({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        country: payload.country,
        concern: payload.concern,
        message: payload.message,
        status: payload.status,
        source: payload.source,
        created_at: payload.createdAt
      });

      if (!error) {
        primaryStorage = "supabase";
      } else {
        errors.push("Supabase storage failed.");
      }
    }
  }

  if (!primaryStorage) {
    try {
      const submission = await createConsultationSubmission(payload);

      if (submission) {
        primaryStorage = "sanity";
        sanityRecordId = submission._id;
      }
    } catch (error) {
      console.error("Sanity lead storage failed", error);
      errors.push("Sanity storage failed.");
    }
  }

  let feishu: Awaited<ReturnType<typeof syncLeadToFeishu>>;
  try {
    feishu = await syncLeadToFeishu(payload, sanityRecordId);
  } catch (error) {
    console.error("Feishu lead sync failed", error);
    errors.push("Feishu sync failed.");
    feishu = {
      configured: true,
      synced: false
    };
  }

  const googleSheets = await syncLeadToGoogleSheets(payload, sanityRecordId);
  if (googleSheets.configured && !googleSheets.synced) {
    console.error("Google Sheets lead sync failed", googleSheets.error);
    errors.push("Google Sheets sync failed.");
  }

  if (primaryStorage || feishu.synced || googleSheets.synced) {
    return NextResponse.json({
      ok: true,
      storage: primaryStorage || (feishu.synced ? "feishu" : "googleSheets"),
      feishu,
      googleSheets,
      warnings: errors
    });
  }

  return NextResponse.json(
    {
      ok: false,
      error: "Form storage is not configured or all storage targets failed. Please check Sanity, Supabase, or Feishu settings."
    },
    { status: 503 }
  );
}
