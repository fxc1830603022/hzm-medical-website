import { NextResponse } from "next/server";
import { syncLeadToFeishu } from "@/lib/feishu";
import { syncLeadToGoogleSheets } from "@/lib/google-sheets";
import { createConsultationSubmission } from "@/lib/sanity-write";
import { makeSupabaseAdminClient } from "@/lib/supabase";

type ContactPayload = {
  name?: string;
  gender?: string;
  ageGroup?: string;
  nationality?: string;
  facialConcerns?: string;
  budget?: string;
  whatsapp?: string;
  email?: string;
  wechat?: string;
  phone?: string;
  country?: string;
  concern?: string;
  interestedIn?: string;
  hearAbout?: string;
  message?: string;
  source?: string;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 3000) : "";
}

function decodeLocationHeader(value: string | null) {
  if (!value) return "";

  try {
    return decodeURIComponent(value).trim();
  } catch {
    return value.trim();
  }
}

function getCountryName(code: string) {
  const names: Record<string, string> = {
    US: "United States",
    CA: "Canada",
    GB: "United Kingdom",
    AU: "Australia",
    SG: "Singapore",
    MY: "Malaysia",
    TH: "Thailand",
    JP: "Japan",
    KR: "South Korea",
    HK: "Hong Kong SAR",
    TW: "Taiwan",
    CN: "Mainland China"
  };

  return names[code.toUpperCase()] || code.toUpperCase();
}

function inferCountryRegion(request: Request) {
  const countryCode = decodeLocationHeader(request.headers.get("x-vercel-ip-country"));
  const region = decodeLocationHeader(request.headers.get("x-vercel-ip-country-region"));
  const city = decodeLocationHeader(request.headers.get("x-vercel-ip-city"));
  const country = countryCode ? getCountryName(countryCode) : "";

  return [country, region, city].filter(Boolean).join(" / ");
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as ContactPayload;
  const countryRegion = clean(body.country) || clean(body.nationality) || inferCountryRegion(request);
  const facialConcerns = clean(body.facialConcerns) || clean(body.concern);
  const payload = {
    name: clean(body.name),
    gender: clean(body.gender),
    ageGroup: clean(body.ageGroup),
    nationality: countryRegion,
    facialConcerns,
    budget: clean(body.budget),
    whatsapp: clean(body.whatsapp),
    email: clean(body.email),
    wechat: clean(body.wechat),
    phone: clean(body.phone),
    country: countryRegion,
    concern: facialConcerns,
    interestedIn: clean(body.interestedIn),
    hearAbout: clean(body.hearAbout),
    message: clean(body.message),
    status: "new",
    source: clean(body.source) || "website",
    createdAt: new Date().toISOString()
  };

  if (
    !payload.name ||
    !payload.email ||
    !payload.gender ||
    !payload.ageGroup ||
    !payload.country ||
    !payload.facialConcerns ||
    !payload.budget ||
    !payload.whatsapp ||
    !payload.interestedIn ||
    !payload.hearAbout
  ) {
    return NextResponse.json({ ok: false, error: "Please complete all required fields." }, { status: 422 });
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
        gender: payload.gender,
        age_group: payload.ageGroup,
        nationality: payload.nationality,
        facial_concerns: payload.facialConcerns,
        budget: payload.budget,
        whatsapp: payload.whatsapp,
        email: payload.email,
        wechat: payload.wechat,
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
