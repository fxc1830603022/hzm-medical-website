"use client";

import { Send } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

const ageGroupOptions = ["Under 25", "25-35", "36-45", "46-55", "55+"];

const facialConcernOptions = [
  "Sagging midface",
  "Jowls / lower face laxity",
  "Loose neck skin",
  "Deep nasolabial folds",
  "Facial volume loss",
  "Eye area aging",
  "Overall anti-aging assessment",
  "Not sure"
];

const budgetOptions = [
  "$5,000 - $10,000",
  "$10,000 - $20,000",
  "Over $20,000"
];

export function ContactForm() {
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
      setMessage("Submitted! We will contact you soon.");
      form.reset();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Please try again or contact us on WhatsApp.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-md bg-white p-6 shadow-soft sm:p-8">
      <h3 className="font-display text-2xl font-semibold text-ink">Online Consultation</h3>
      <div className="mt-7 grid gap-5">
        <label className="grid gap-2 text-sm font-semibold text-graphite">
          Name
          <input
            className="h-12 rounded-md border border-ink/15 px-4 font-normal outline-none transition focus:border-champagne"
            type="text"
            name="name"
            placeholder="Enter your full name"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-graphite">
          Gender
          <select
            className="h-12 rounded-md border border-ink/15 bg-white px-4 font-normal outline-none transition focus:border-champagne"
            name="gender"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-graphite">
          Age Group
          <select
            className="h-12 rounded-md border border-ink/15 bg-white px-4 font-normal outline-none transition focus:border-champagne"
            name="ageGroup"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select age group
            </option>
            {ageGroupOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-graphite">
          Email
          <input
            className="h-12 rounded-md border border-ink/15 px-4 font-normal outline-none transition focus:border-champagne"
            type="email"
            name="email"
            placeholder="Enter your email address"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-graphite">
          Phone
          <input
            className="h-12 rounded-md border border-ink/15 px-4 font-normal outline-none transition focus:border-champagne"
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-graphite">
          WhatsApp
          <input
            className="h-12 rounded-md border border-ink/15 px-4 font-normal outline-none transition focus:border-champagne"
            type="tel"
            name="whatsapp"
            placeholder="Enter your WhatsApp contact"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-graphite">
          WeChat
          <input
            className="h-12 rounded-md border border-ink/15 px-4 font-normal outline-none transition focus:border-champagne"
            type="text"
            name="wechat"
            placeholder="Enter your WeChat ID"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-graphite">
          Nationality
          <input
            className="h-12 rounded-md border border-ink/15 px-4 font-normal outline-none transition focus:border-champagne"
            type="text"
            name="nationality"
            list="country-region-options"
            autoComplete="country-name"
            placeholder="e.g. Canada, United Kingdom..."
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-graphite">
          Country / Region
          <input
            className="h-12 rounded-md border border-ink/15 px-4 font-normal outline-none transition focus:border-champagne"
            type="text"
            name="country"
            list="country-region-options"
            autoComplete="country-name"
            placeholder="e.g. United States"
            required
          />
        </label>
        <datalist id="country-region-options">
          <option value="United States" />
          <option value="Canada" />
          <option value="United Kingdom" />
          <option value="Australia" />
          <option value="Singapore" />
          <option value="Malaysia" />
          <option value="Thailand" />
          <option value="Japan" />
          <option value="South Korea" />
          <option value="Hong Kong SAR" />
          <option value="Taiwan" />
          <option value="Mainland China" />
          <option value="Europe" />
          <option value="Middle East" />
        </datalist>
        <label className="grid gap-2 text-sm font-semibold text-graphite">
          Your Concern
          <select
            className="h-12 rounded-md border border-ink/15 bg-white px-4 font-normal outline-none transition focus:border-champagne"
            name="concern"
            defaultValue=""
          >
            <option value="">Select the procedure you are interested in</option>
            <option value="9d-facelift">9D Facelift (mild to moderate aging)</option>
            <option value="9d-deep-plane">9D Deep Plane Facelift (severe laxity)</option>
            <option value="consultation">Not sure, I need an assessment</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-graphite">
          Facial Concerns
          <select
            className="h-12 rounded-md border border-ink/15 bg-white px-4 font-normal outline-none transition focus:border-champagne"
            name="facialConcerns"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select your main facial concern
            </option>
            {facialConcernOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-graphite">
          Budget
          <select
            className="h-12 rounded-md border border-ink/15 bg-white px-4 font-normal outline-none transition focus:border-champagne"
            name="budget"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select budget
            </option>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-graphite">
          Additional Info
          <textarea
            className="min-h-32 rounded-md border border-ink/15 px-4 py-3 font-normal outline-none transition focus:border-champagne"
            name="message"
            placeholder="Briefly describe your goals, previous procedures, or concerns..."
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={state === "submitting"}
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-ink px-5 text-sm font-semibold text-white transition hover:bg-champagne hover:text-ink disabled:cursor-not-allowed disabled:opacity-70"
      >
        <Send size={17} />
        {state === "submitting" ? "Submitting..." : "Submit Consultation Request"}
      </button>

      {message ? (
        <p className={`mt-4 text-sm ${state === "success" ? "text-sage" : "text-rosewood"}`}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
