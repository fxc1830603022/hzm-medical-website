import { randomUUID } from "node:crypto";
import { after, NextResponse } from "next/server";
import { facebookAssessmentSource, validateFacebookAssessment } from "@/lib/facebook-assessment";
import { syncFacebookLeadToSheets } from "@/lib/facebook-leads-sheets";
import { createFacebookAdsLead, updateFacebookLeadSheetSync, type FacebookAdsLead } from "@/lib/sanity-write";

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const assessment = validateFacebookAssessment(body);
  if (!assessment.ok) {
    return NextResponse.json({ ok: false, error: assessment.error }, { status: 422 });
  }
  const suppliedId = body && typeof body === "object" ? (body as Record<string, unknown>).requestId : undefined;
  if (suppliedId !== undefined && (typeof suppliedId !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(suppliedId))) {
    return NextResponse.json({ ok: false, error: "Please refresh the page and try again." }, { status: 422 });
  }
  try {
    const payload: FacebookAdsLead = {
      _id: "facebookAdsLead." + (suppliedId || randomUUID()),
      ...assessment.data,
      source: facebookAssessmentSource,
      status: "new",
      createdAt: new Date().toISOString(),
      googleSheetsSyncStatus: "pending"
    };
    const lead = await createFacebookAdsLead(payload);
    if (!lead?._id) throw new Error("Facebook lead storage is not configured.");
    // A retry must sync the stored assessment, including its original submission time.
    const savedPayload: FacebookAdsLead = { ...payload, ...lead };
    after(async () => {
      const result = await syncFacebookLeadToSheets(savedPayload, lead._id);
      try { await updateFacebookLeadSheetSync(lead._id, result); }
      catch { console.error("Facebook CMS sheet-sync status update failed."); }
    });
    return NextResponse.json({ ok: true, backgroundSync: true });
  } catch (error) {
    console.error("Facebook assessment storage failed", error);
    return NextResponse.json(
      { ok: false, error: "We could not save your assessment. Please try again or contact us on WhatsApp." },
      { status: 503 }
    );
  }
}
