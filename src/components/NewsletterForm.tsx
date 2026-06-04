"use client";

import { MailPlus } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.get("email") })
      });

      if (!response.ok) throw new Error("Subscribe failed");
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
      <input
        type="email"
        name="email"
        required
        placeholder="Enter your email address"
        className="h-12 flex-1 rounded-md border border-white/25 bg-white px-4 text-ink outline-none focus:border-champagne"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-champagne px-6 text-sm font-semibold text-ink transition hover:bg-white disabled:opacity-70"
      >
        <MailPlus size={17} />
        {status === "loading" ? "Subscribing..." : "Subscribe"}
      </button>
      {status === "done" ? <p className="sm:self-center text-sm text-white">Subscribed!</p> : null}
      {status === "error" ? <p className="sm:self-center text-sm text-white">Please try again.</p> : null}
    </form>
  );
}
