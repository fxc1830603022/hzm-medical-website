"use client";

import { ArrowRight, Check, CheckCircle2, ChevronDown, LoaderCircle, LockKeyhole, ScanLine } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import {
  facebookAssessmentAgeRanges,
  facebookAssessmentConcerns,
  facebookAssessmentTimelines,
  validateFacebookAssessment
} from "@/lib/facebook-assessment";
import { assessmentCountries } from "@/lib/assessment-countries";
import { createAssessmentRequestId } from "@/lib/assessment-request-id";
import { trackFacebookAssessmentSubmit } from "@/lib/tracking";
import { WeChatBrandIcon } from "./FacebookWeChatContact";
import { TrackedWhatsAppLink } from "./TrackedWhatsAppLink";

const inputClass = "mt-2 h-12 w-full min-w-0 rounded-md border border-[#D5D7D2] bg-white px-3.5 text-sm font-normal text-[#252A26] outline-none transition placeholder:text-[#8A908B] focus:border-[#176B4A] focus:ring-2 focus:ring-[#176B4A]/15 disabled:bg-[#F3F4F1]";
const labelClass = "block min-w-0 text-[13px] font-semibold text-[#252A26]";
const steps = ["Share your concerns", "Receive a private review", "Discuss your next step"];

type Props = { whatsappUrl: string; wechatId: string; onOpenWechat: () => void };

export function FacebookAssessmentSection({ whatsappUrl, wechatId, onOpenWechat }: Props) {
  return (
    <section id="private-assessment" aria-labelledby="facebook-assessment-heading" className="scroll-mt-6 bg-[#F6F2EB] px-4 py-14 text-[#252A26] sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 xl:gap-20">
        <div className="lg:pt-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#AA8555] sm:text-xs">Private online assessment</p>
          <h2 id="facebook-assessment-heading" className="mt-5 max-w-[540px] font-display text-[42px] leading-[1.08] tracking-[-0.035em] sm:text-6xl xl:text-[72px]">
            Your next step,<br />made personal.
          </h2>
          <p className="mt-5 max-w-[490px] text-sm leading-7 text-[#6D746E] sm:text-base">
            Speak with our team or share a few details for a private assessment with Dr. Xiao.
          </p>
          <div className="mt-8 space-y-5 sm:mt-10">
            <div>
              <TrackedWhatsAppLink href={whatsappUrl} placement="final" label="Private assessment WhatsApp" className="flex min-h-14 w-full items-center gap-3 rounded-md bg-[#176B4A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#11583C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176B4A] sm:text-base">
                <WhatsAppIcon />
                Chat on WhatsApp
                <ArrowRight className="ml-auto h-5 w-5 shrink-0" aria-hidden="true" />
              </TrackedWhatsAppLink>
              <p className="mt-2 px-1 text-xs text-[#6D746E] sm:text-sm">+1 304 356 7880</p>
            </div>
            <div>
              <button type="button" onClick={onOpenWechat} aria-haspopup="dialog" className="flex min-h-14 w-full items-center gap-3 rounded-md border border-[#BABFB7] bg-white/70 px-5 py-3 text-sm font-semibold transition hover:border-[#176B4A] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176B4A] sm:text-base">
                <WeChatBrandIcon className="h-7 w-7 shrink-0 text-[#13966B]" />
                Connect on WeChat
                <ScanLine className="ml-auto h-5 w-5 shrink-0" aria-hidden="true" />
              </button>
              <p className="mt-2 px-1 text-xs text-[#6D746E] sm:text-sm">WeChat ID: {wechatId}</p>
            </div>
          </div>
          <ol className="mt-8 space-y-4 border-t border-[#C5A474]/65 pt-6 sm:mt-10">
            {steps.map((step, index) => (
              <li key={step} className="flex items-center gap-5">
                <span className="w-9 shrink-0 font-display text-2xl text-[#B39365]">0{index + 1}</span>
                <span className="border-l border-[#C5A474]/60 pl-5 font-display text-lg sm:text-xl">{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 flex items-center gap-2 text-xs text-[#737A74]"><LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />Your details stay private.</p>
          <div className="mt-7 hidden sm:block">
            <p className="font-display text-3xl">Dr. Xiao</p>
            <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.32em] text-[#797970]">9D Facelift</p>
          </div>
        </div>
        <div>
          <FacebookAssessmentForm />
          <p className="mx-auto mt-4 max-w-[630px] text-center text-[11px] leading-5 text-[#777E77]">
            Online assessment provides initial guidance only. Final recommendations require in-person medical evaluation.
          </p>
        </div>
      </div>
    </section>
  );
}

function FacebookAssessmentForm() {
  const [concerns, setConcerns] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [error, setError] = useState("");
  const submittingRef = useRef(false);
  const submissionRef = useRef({ fingerprint: "", requestId: "" });
  const feedbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error || status === "success") feedbackRef.current?.focus();
  }, [error, status]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;
    const form = new FormData(event.currentTarget);
    const validation = validateFacebookAssessment({
      name: form.get("name"),
      countryRegion: form.get("countryRegion"),
      ageGroup: form.get("ageGroup"),
      treatmentTimeline: form.get("treatmentTimeline"),
      whatsapp: form.get("whatsapp"),
      email: form.get("email"),
      facialConcerns: concerns,
      additionalNotes: form.get("additionalNotes"),
      consent: form.get("consent") === "on"
    });
    if (!validation.ok) {
      setError(validation.error);
      return;
    }
    submittingRef.current = true;
    setError("");
    setStatus("submitting");
    let requestTimeout: ReturnType<typeof setTimeout> | undefined;
    try {
      const fingerprint = JSON.stringify(validation.data);
      if (submissionRef.current.fingerprint !== fingerprint) {
        submissionRef.current = { fingerprint, requestId: createAssessmentRequestId() };
      }
      const controller = new AbortController();
      requestTimeout = setTimeout(() => controller.abort(), 30000);
      const response = await fetch("/api/facebook-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({ ...validation.data, requestId: submissionRef.current.requestId })
      });
      const result: unknown = await response.json().catch(() => null);
      const data = result && typeof result === "object" ? result as Record<string, unknown> : null;
      if (!response.ok || data?.ok !== true) {
        throw new Error(typeof data?.error === "string" ? data.error : "We could not save your assessment. Please try again or contact us on WhatsApp.");
      }
      setStatus("success");
      // A tracking failure must never turn a saved assessment into an apparent failed submission.
      try { trackFacebookAssessmentSubmit(); } catch { /* Storage already succeeded. */ }
    } catch (issue) {
      setError(issue instanceof Error && issue.name === "AbortError"
        ? "We could not confirm your submission in time. Please try again or contact us on WhatsApp."
        : issue instanceof TypeError
          ? "Please check your connection and try again, or contact us on WhatsApp."
          : issue instanceof Error ? issue.message : "Please check your connection and try again.");
      setStatus("idle");
    } finally {
      if (requestTimeout !== undefined) clearTimeout(requestTimeout);
      submittingRef.current = false;
    }
  }

  return (
    <div className="rounded-xl border border-white/90 bg-[#FFFEFC] p-5 shadow-[0_14px_60px_rgba(45,44,36,0.045)] sm:p-8 lg:p-9">
      {status === "success" ? (
        <div ref={feedbackRef} tabIndex={-1} role="status" className="flex min-h-[440px] flex-col items-center justify-center text-center outline-none">
          <CheckCircle2 className="h-12 w-12 text-[#176B4A]" aria-hidden="true" />
          <h3 className="mt-5 font-display text-3xl">Your request has been received.</h3>
          <p className="mt-4 max-w-[390px] text-sm leading-7 text-[#6D746E]">Our team will review your details and contact you using the information you provided.</p>
          <p className="mt-6 flex items-center gap-2 text-xs text-[#737A74]"><LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />Your assessment stays private.</p>
        </div>
      ) : (
        <form onSubmit={submit} aria-labelledby="facebook-form-heading" aria-busy={status === "submitting"}>
          <h3 id="facebook-form-heading" className="font-display text-[28px] leading-tight tracking-[-0.025em] sm:text-[34px]">Request a Private Assessment</h3>
          <div className="mb-6 mt-2 flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs leading-6 text-[#6D746E]">A few details help us understand your needs.</p>
            <p className="text-[10px] text-[#777E77]">Fields marked * are required</p>
          </div>
          <fieldset disabled={status === "submitting"} className="min-w-0 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className={labelClass}>Full Name <RequiredMark /><input name="name" autoComplete="name" maxLength={120} placeholder="Your name" required className={inputClass} /></label>
              <label className={labelClass}>Country / Region <RequiredMark /><div className="relative"><select name="countryRegion" autoComplete="country-name" defaultValue="" required className={inputClass + " appearance-none pr-9"}><option value="" disabled>Select country</option>{assessmentCountries.map((country) => <option key={country} value={country}>{country}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-[24px] h-4 w-4 text-[#777E77]" aria-hidden="true" /></div></label>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className={labelClass}>Age Range <RequiredMark /><select name="ageGroup" defaultValue="" required className={inputClass}><option value="" disabled>Select age range</option>{facebookAssessmentAgeRanges.map((age) => <option key={age}>{age}</option>)}</select></label>
              <label className={labelClass}>Treatment Timeline<select name="treatmentTimeline" defaultValue="Just exploring" className={inputClass}>{facebookAssessmentTimelines.map((timeline) => <option key={timeline}>{timeline}</option>)}</select></label>
            </div>
            <fieldset className="min-w-0" aria-describedby="facebook-contact-help">
              <legend className={labelClass}>How can we reach you? <RequiredMark /></legend>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <label className="block min-w-0 text-xs text-[#6D746E]">WhatsApp<input name="whatsapp" type="tel" autoComplete="tel" maxLength={40} placeholder="+ Country code and number" className={inputClass} /></label>
                <label className="block min-w-0 text-xs text-[#6D746E]">Email<input name="email" type="email" autoComplete="email" maxLength={254} placeholder="you@example.com" className={inputClass} /></label>
              </div>
              <p id="facebook-contact-help" className="mt-2 text-[11px] text-[#777E77]">Please provide WhatsApp or email.</p>
            </fieldset>
            <fieldset className="min-w-0">
              <legend className={labelClass}>Main Concerns <RequiredMark /></legend>
              <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {facebookAssessmentConcerns.map((concern) => (
                  <label key={concern} className="relative cursor-pointer">
                    <input type="checkbox" name="facialConcerns" value={concern} checked={concerns.includes(concern)} onChange={(event) => setConcerns((current) => event.target.checked ? [...current, concern] : current.filter((value) => value !== concern))} className="peer sr-only" />
                    <span className="flex min-h-11 items-center justify-center gap-1.5 rounded-md border border-[#D5D7D2] bg-white px-2 text-xs text-[#525A54] transition hover:border-[#176B4A] peer-checked:border-[#176B4A] peer-checked:bg-[#EDF4EE] peer-checked:text-[#11583C] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#176B4A]">
                      {concerns.includes(concern) ? <Check className="h-3 w-3" aria-hidden="true" /> : null}{concern}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <label className={labelClass}>Additional Notes <span className="font-normal text-[#777E77]">(optional)</span><textarea name="additionalNotes" maxLength={2000} rows={3} placeholder="Tell us what matters most to you." className={inputClass + " h-auto min-h-[84px] resize-y py-3"} /></label>
            <label className="flex cursor-pointer items-start gap-3 text-[11px] leading-5 text-[#606A61]">
              <input name="consent" type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-[#176B4A]" />
              I agree to be contacted and understand that online guidance does not replace an in-person consultation.
            </label>
            {error ? <div ref={feedbackRef} role="alert" tabIndex={-1} className="rounded-md border border-[#E2BAB0] bg-[#FFF5F1] px-3 py-2 text-xs leading-5 text-[#8C3525] outline-none">{error}</div> : null}
            <button type="submit" className="flex min-h-12 w-full items-center justify-center gap-3 rounded-md bg-[#176B4A] px-4 text-sm font-semibold text-white transition hover:bg-[#11583C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176B4A] disabled:cursor-wait disabled:opacity-70">
              {status === "submitting" ? <><LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />Sending your request...</> : <>Request My Assessment<ArrowRight className="h-4 w-4" aria-hidden="true" /></>}
            </button>
          </fieldset>
          <p className="mt-4 flex items-center justify-center gap-2 text-[10px] text-[#777E77]"><LockKeyhole className="h-3 w-3" aria-hidden="true" />Private review · No obligation</p>
        </form>
      )}
    </div>
  );
}

function RequiredMark() { return <span className="text-[#A74339]" aria-hidden="true">*</span>; }

function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 shrink-0" aria-hidden="true"><path d="M20.52 3.48A11.91 11.91 0 0 0 12.04 0C5.45 0 .09 5.36.09 11.95c0 2.11.55 4.17 1.6 5.99L0 24l6.21-1.63a11.94 11.94 0 0 0 5.82 1.49h.01c6.59 0 11.95-5.36 11.96-11.95 0-3.19-1.24-6.19-3.48-8.43ZM12.04 21.84a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.69.97.98-3.6-.24-.37a9.87 9.87 0 0 1-1.51-5.3c0-5.48 4.46-9.94 9.95-9.94a9.9 9.9 0 0 1 7.02 2.91 9.88 9.88 0 0 1 2.91 7.04c0 5.48-4.46 9.94-9.94 9.94Zm5.45-7.44c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.6.14-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.62-.93-2.22-.24-.58-.49-.5-.68-.51h-.57c-.2 0-.52.08-.79.38-.28.3-1.05 1.02-1.05 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.62.71.22 1.36.19 1.87.12.57-.09 1.77-.73 2.02-1.43.25-.7.25-1.3.17-1.43-.07-.13-.27-.2-.57-.35Z" /></svg>;
}
