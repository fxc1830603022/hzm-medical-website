import { NextResponse } from "next/server";
import { makeServerSanityClient } from "@/lib/sanity";
import { makeSupabaseAdminClient } from "@/lib/supabase";

function clean(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 320) : "";
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { email?: string };
  const email = clean(body.email);

  if (!email || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "A valid email is required." }, { status: 422 });
  }

  const createdAt = new Date().toISOString();
  const preferredStorage = process.env.FORM_STORAGE || "sanity";

  if (preferredStorage === "supabase") {
    const supabase = makeSupabaseAdminClient();
    if (supabase) {
      const { error } = await supabase.from("newsletter_subscribers").insert({
        email,
        source: "blog",
        created_at: createdAt
      });

      if (!error) return NextResponse.json({ ok: true, storage: "supabase" });
    }
  }

  const sanity = makeServerSanityClient();
  if (sanity) {
    await sanity.create({
      _type: "newsletterSubscriber",
      email,
      source: "blog",
      createdAt
    });
    return NextResponse.json({ ok: true, storage: "sanity" });
  }

  return NextResponse.json(
    {
      ok: false,
      error: "Newsletter storage is not configured. Please set Sanity or Supabase environment variables."
    },
    { status: 503 }
  );
}
