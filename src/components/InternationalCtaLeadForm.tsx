"use client";

import { Send } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function InternationalCtaLeadForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error || "Submission failed");

      setState("success");
      setMessage("Submitted. Our team will contact you soon.");
      form.reset();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Please try again or contact us on WhatsApp.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-md border border-ink/10 bg-white p-4 shadow-lift sm:p-5">
      <input type="hidden" name="source" value="international-patients-cta" />
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 rounded-md border border-ink/12 bg-porcelain px-4 text-sm outline-none transition placeholder:text-graphite/42 focus:border-champagne"
          type="text"
          name="name"
          placeholder="Full Name"
          required
        />
        <input
          className="h-11 rounded-md border border-ink/12 bg-porcelain px-4 text-sm outline-none transition placeholder:text-graphite/42 focus:border-champagne"
          type="email"
          name="email"
          placeholder="Email Address"
          required
        />
        <select
          className="h-11 rounded-md border border-ink/12 bg-porcelain px-4 text-sm text-graphite outline-none transition focus:border-champagne"
          name="gender"
          defaultValue=""
          required
        >
          <option value="" disabled>
            Gender
          </option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>
        <select
          className="h-11 rounded-md border border-ink/12 bg-porcelain px-4 text-sm text-graphite outline-none transition focus:border-champagne"
          name="ageGroup"
          defaultValue=""
          required
        >
          <option value="" disabled>
            Age Group
          </option>
          <option value="Under 25">Under 25</option>
          <option value="25-35">25-35</option>
          <option value="36-45">36-45</option>
          <option value="46-55">46-55</option>
          <option value="55+">55+</option>
        </select>
        <input
          className="h-11 rounded-md border border-ink/12 bg-porcelain px-4 text-sm outline-none transition placeholder:text-graphite/42 focus:border-champagne"
          type="text"
          name="country"
          placeholder="Country / Region"
          required
        />
        <input
          className="h-11 rounded-md border border-ink/12 bg-porcelain px-4 text-sm outline-none transition placeholder:text-graphite/42 focus:border-champagne"
          type="tel"
          name="whatsapp"
          placeholder="WhatsApp"
          required
        />
        <select
          className="h-11 rounded-md border border-ink/12 bg-porcelain px-4 text-sm text-graphite outline-none transition focus:border-champagne sm:col-span-2"
          name="facialConcerns"
          defaultValue=""
          required
        >
          <option value="" disabled>
            I&apos;m interested in...
          </option>
          <option value="9D Facelift (mild to moderate aging)">9D Facelift</option>
          <option value="9D Deep Plane Facelift (severe laxity)">9D Deep Plane Facelift</option>
          <option value="Not sure, I need an assessment">Not sure, I need an assessment</option>
          <option value="Sagging midface">Sagging midface</option>
          <option value="Jowls / lower face laxity">Jowls / lower face laxity</option>
          <option value="Loose neck skin">Loose neck skin</option>
          <option value="Deep nasolabial folds">Deep nasolabial folds</option>
        </select>
        <select
          className="h-11 rounded-md border border-ink/12 bg-porcelain px-4 text-sm text-graphite outline-none transition focus:border-champagne"
          name="budget"
          defaultValue=""
          required
        >
          <option value="" disabled>
            Budget
          </option>
          <option value="$5,000 - $10,000">$5,000 - $10,000</option>
          <option value="$10,000 - $20,000">$10,000 - $20,000</option>
          <option value="Over $20,000">Over $20,000</option>
        </select>
        <input
          className="h-11 rounded-md border border-ink/12 bg-porcelain px-4 text-sm outline-none transition placeholder:text-graphite/42 focus:border-champagne"
          type="text"
          name="wechat"
          placeholder="WeChat ID (optional)"
        />
      </div>
      <textarea
        className="mt-3 min-h-20 w-full rounded-md border border-ink/12 bg-porcelain px-4 py-3 text-sm outline-none transition placeholder:text-graphite/42 focus:border-champagne"
        name="message"
        placeholder="Briefly describe your goals or concerns..."
      />
      <button
        type="submit"
        disabled={state === "submitting"}
        className="mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-ink px-5 text-sm font-bold text-white transition hover:bg-champagne hover:text-ink disabled:cursor-not-allowed disabled:opacity-65"
      >
        <Send size={16} />
        {state === "submitting" ? "Submitting..." : "Submit Consultation Request"}
      </button>
      {message ? (
        <p className={`mt-3 text-sm ${state === "success" ? "text-sage" : "text-rosewood"}`}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
