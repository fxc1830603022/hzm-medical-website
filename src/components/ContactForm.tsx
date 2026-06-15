"use client";

import { Send } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

type ContactFormProps = {
  compact?: boolean;
  className?: string;
  title?: string;
};

const ageGroupOptions = ["Under 25", "25-35", "36-45", "46-55", "55+"];

const facialConcernOptions = [
  "9D Facelift (mild to moderate aging)",
  "9D Deep Plane Facelift (severe laxity)",
  "Not sure, I need an assessment",
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

export function ContactForm({
  compact = false,
  className = "",
  title = "Online Consultation"
}: ContactFormProps = {}) {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const fieldClass = "grid gap-2 text-sm font-semibold text-graphite";
  const inputClass =
    "h-12 rounded-md border border-ink/15 px-4 font-normal outline-none transition focus:border-champagne";
  const selectClass =
    "h-12 rounded-md border border-ink/15 bg-white px-4 font-normal outline-none transition focus:border-champagne";
  const fullSpanClass = compact ? "sm:col-span-2" : "";

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
    <form
      onSubmit={onSubmit}
      className={`rounded-md bg-white p-6 shadow-soft sm:p-8 ${compact ? "lg:p-7" : ""} ${className}`}
    >
      <h3 className="font-display text-2xl font-semibold text-ink">{title}</h3>
      <div className={`mt-7 grid gap-5 ${compact ? "sm:grid-cols-2 sm:gap-4" : ""}`}>
        <label className={fieldClass}>
          Name
          <input
            className={inputClass}
            type="text"
            name="name"
            placeholder="Enter your full name"
            required
          />
        </label>
        <label className={fieldClass}>
          Gender
          <select
            className={selectClass}
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
        <label className={fieldClass}>
          Age Group
          <select
            className={selectClass}
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
        <label className={fieldClass}>
          Email
          <input
            className={inputClass}
            type="email"
            name="email"
            placeholder="Enter your email address"
            required
          />
        </label>
        <label className={fieldClass}>
          Phone
          <input
            className={inputClass}
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
          />
        </label>
        <label className={fieldClass}>
          WhatsApp
          <input
            className={inputClass}
            type="tel"
            name="whatsapp"
            placeholder="Enter your WhatsApp contact"
            required
          />
        </label>
        <label className={fieldClass}>
          WeChat
          <input
            className={inputClass}
            type="text"
            name="wechat"
            placeholder="Enter your WeChat ID (optional)"
          />
        </label>
        <label className={fieldClass}>
          Country / Region
          <input
            className={inputClass}
            type="text"
            name="country"
            list="country-region-options"
            autoComplete="country-name"
            placeholder="e.g. Canada, United Kingdom..."
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
        <label className={fieldClass}>
          Facial Concerns
          <select
            className={selectClass}
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
        <label className={fieldClass}>
          Budget
          <select
            className={selectClass}
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
        <label className={`${fieldClass} ${fullSpanClass}`}>
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
