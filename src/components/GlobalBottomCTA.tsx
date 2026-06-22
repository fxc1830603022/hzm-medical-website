"use client";

import {
  ArrowRight,
  Gem,
  Globe2,
  HeartHandshake,
  LockKeyhole,
  Mail,
  MessageCircle,
  ShieldCheck,
  Stethoscope,
  UserRoundCheck
} from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { defaultSettings, getWhatsAppUrl } from "@/lib/site-data";
import type { SiteSettings } from "@/lib/site-types";

type SubmitState = "idle" | "submitting" | "success" | "error";

type GlobalBottomCTAProps = {
  settings?: SiteSettings;
  source?: string;
};

const genderOptions = ["Female", "Male", "Prefer not to say"];
const ageGroupOptions = ["Under 25", "25-35", "36-45", "46-55", "55+"];
const countryOptions = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Singapore",
  "Malaysia",
  "Thailand",
  "Japan",
  "South Korea",
  "Hong Kong SAR",
  "Taiwan",
  "Mainland China",
  "Europe",
  "Middle East",
  "Other"
];
const concernOptions = [
  "Sagging midface",
  "Jowls / lower face laxity",
  "Loose neck skin",
  "Deep nasolabial folds",
  "Facial volume loss",
  "Eye area aging",
  "Overall anti-aging assessment",
  "Not sure"
];
const interestedOptions = [
  "9D Facelift",
  "9D Deep Plane Facelift",
  "Online assessment first",
  "Before & after case review",
  "Not sure, I need recommendations"
];
const budgetOptions = ["$5,000 - $10,000", "$10,000 - $20,000", "Over $20,000", "Not sure yet"];
const hearAboutOptions = [
  "Instagram",
  "Facebook",
  "YouTube",
  "Google Search",
  "Friend / Referral",
  "Doctor / Clinic referral",
  "Other"
];

const phoneCountryOptions = [
  { code: "us", label: "United States", dialCode: "+1" },
  { code: "cn", label: "China", dialCode: "+86" },
  { code: "my", label: "Malaysia", dialCode: "+60" },
  { code: "sg", label: "Singapore", dialCode: "+65" },
  { code: "ru", label: "Russia", dialCode: "+7" },
  { code: "th", label: "Thailand", dialCode: "+66" },
  { code: "vn", label: "Vietnam", dialCode: "+84" },
  { code: "id", label: "Indonesia", dialCode: "+62" },
  { code: "ph", label: "Philippines", dialCode: "+63" },
  { code: "kh", label: "Cambodia", dialCode: "+855" },
  { code: "la", label: "Laos", dialCode: "+856" },
  { code: "mm", label: "Myanmar", dialCode: "+95" },
  { code: "jp", label: "Japan", dialCode: "+81" },
  { code: "kr", label: "South Korea", dialCode: "+82" },
  { code: "hk", label: "Hong Kong", dialCode: "+852" },
  { code: "tw", label: "Taiwan", dialCode: "+886" },
  { code: "au", label: "Australia", dialCode: "+61" },
  { code: "gb", label: "United Kingdom", dialCode: "+44" },
  { code: "ca", label: "Canada", dialCode: "+1" },
  { code: "ae", label: "United Arab Emirates", dialCode: "+971" },
  { code: "sa", label: "Saudi Arabia", dialCode: "+966" }
];

const trustPoints = [
  {
    icon: LockKeyhole,
    title: "100% Private",
    description: "Your information is always secure and confidential."
  },
  {
    icon: UserRoundCheck,
    title: "Surgeon-Led Review",
    description: "Every case is reviewed by Dr. Xiao or his senior team."
  },
  {
    icon: Globe2,
    title: "International Support",
    description: "Multi-language team here to assist you."
  }
];

const brandTrustItems = [
  {
    icon: Gem,
    title: "Only One 9D | Only by Dr. Xiao",
    description: "The original 9D technique. Created and perfected by Dr. Xiao."
  },
  {
    icon: Stethoscope,
    title: "Surgeon-Led Care",
    description: "Your case is personally reviewed by Dr. Xiao and his senior team."
  },
  {
    textIcon: "9D",
    title: "Advanced 9D System™",
    description: "Precision. Safety. Natural Results. Powered by our proprietary 9D methodology."
  },
  {
    icon: Globe2,
    title: "Global Patients",
    description: "Trusted by patients from over 50 countries worldwide."
  },
  {
    icon: HeartHandshake,
    title: "Long-Term Support",
    description: "We're with you every step of the way - from your first consultation to long-term care."
  }
];

export function GlobalBottomCTA({
  settings,
  source = "global-bottom-cta"
}: GlobalBottomCTAProps) {
  const safeSettings = { ...defaultSettings, ...settings };
  const whatsappUrl = getWhatsAppUrl(safeSettings);
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState(phoneCountryOptions[0].code);
  const selectedPhoneCountry =
    phoneCountryOptions.find((option) => option.code === phoneCountryCode) || phoneCountryOptions[0];

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const additionalInfo = String(formData.get("additionalInfo") || "").trim();
    const interestedIn = String(formData.get("interestedIn") || "").trim();
    const hearAbout = String(formData.get("hearAbout") || "").trim();
    const submittedPhoneCountryCode = String(formData.get("phoneCountryCode") || selectedPhoneCountry.code).trim();
    const submittedPhoneCountry =
      phoneCountryOptions.find((option) => option.code === submittedPhoneCountryCode) || selectedPhoneCountry;
    const phoneDialCode = submittedPhoneCountry.dialCode;
    const whatsappNumber = String(formData.get("whatsapp") || "").trim();
    const whatsapp = [phoneDialCode, whatsappNumber].filter(Boolean).join(" ");
    const composedMessage = [
      interestedIn ? `Interested In: ${interestedIn}` : "",
      hearAbout ? `How Did You Hear About Us: ${hearAbout}` : "",
      additionalInfo ? `Additional Information: ${additionalInfo}` : ""
    ]
      .filter(Boolean)
      .join("\n");

    const payload = {
      name: formData.get("name"),
      gender: formData.get("gender"),
      ageGroup: formData.get("ageGroup"),
      country: formData.get("country"),
      email: formData.get("email"),
      whatsapp,
      phone: whatsapp,
      facialConcerns: formData.get("facialConcerns"),
      budget: formData.get("budget"),
      hearAbout,
      message: composedMessage,
      source
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error || "Submission failed");

      setState("success");
      setMessage("Submitted. Dr. Xiao's team will contact you soon.");
      form.reset();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Please try again or contact us on WhatsApp.");
    }
  }

  return (
    <section
      className="relative isolate overflow-hidden px-[clamp(20px,4vw,72px)] py-14 text-[#171717] lg:min-h-screen lg:py-16"
      style={{
        background:
          "radial-gradient(circle at 12% 18%, rgba(184,138,59,0.10), transparent 30%), linear-gradient(135deg, #FBF7EF 0%, #F6EFE4 100%)"
      }}
    >
      <div className="pointer-events-none absolute -left-24 top-0 h-80 w-[52rem] -rotate-12 rounded-[50%] border-t border-[#B88A3B]/24" />
      <div className="pointer-events-none absolute -left-12 top-7 h-72 w-[46rem] -rotate-12 rounded-[50%] border-t border-[#B88A3B]/14" />
      <div className="pointer-events-none absolute right-0 top-10 h-96 w-[34rem] rounded-full bg-white/45 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[#E3D6C2]" />

      <div className="relative mx-auto flex w-full max-w-[1540px] flex-col gap-11 xl:gap-12">
        <div className="grid min-w-0 gap-10 xl:grid-cols-[minmax(0,0.46fr)_minmax(600px,0.54fr)] xl:items-center xl:gap-12 2xl:grid-cols-[minmax(600px,0.48fr)_minmax(720px,0.52fr)]">
          <div className="min-w-0 xl:pt-4">
            <p className="flex items-center gap-3 text-xs font-bold uppercase text-[#B88A3B] sm:text-sm" style={{ letterSpacing: "0.24em" }}>
              <Gem className="h-4 w-4 shrink-0" strokeWidth={1.55} />
              READY TO TAKE THE NEXT STEP?
            </p>
            <h2 className="mt-5 max-w-[740px] font-display text-[clamp(38px,3.1vw,56px)] font-semibold leading-[1.08] text-[#171717]">
              <span className="block">Send Your Photos for</span>
              <span className="block text-[#9F7432]">Personalized Assessment</span>
            </h2>
            <div className="mt-6 h-px w-56 bg-gradient-to-r from-[#B88A3B] via-[#E8C46E] to-transparent" />
            <p className="mt-6 max-w-xl text-base leading-8 text-[#2D2B29] xl:text-[17px]">
              Dr. Xiao&apos;s team will personally review your case and recommend the most suitable next step for your
              facial rejuvenation journey.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {trustPoints.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className={`flex gap-4 ${index > 0 ? "sm:border-l sm:border-[#E3D6C2] sm:pl-6" : ""}`}
                  >
                    <Icon className="mt-1 shrink-0 text-[#B88A3B]" size={33} strokeWidth={1.55} />
                    <div>
                      <h3 className="font-display text-base font-semibold leading-snug text-[#171717]">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#6B6257]">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="grid h-14 w-full grid-cols-[56px_minmax(0,1fr)_56px] items-center rounded-md bg-[#E2B95E] px-2 text-base font-bold text-[#171717] shadow-[0_18px_46px_rgba(184,138,59,0.24)] transition hover:bg-[#D8A94C]"
              >
                <MessageCircle className="justify-self-center" size={26} />
                <span className="justify-self-center whitespace-nowrap">Chat on WhatsApp</span>
                <ArrowRight className="justify-self-center" size={20} />
              </a>
              <a
                href={`mailto:${safeSettings.email}`}
                className="grid h-14 w-full grid-cols-[56px_minmax(0,1fr)_56px] items-center rounded-md border border-[#B88A3B] bg-[#FFFDF8] px-2 text-base font-bold text-[#171717] transition hover:bg-white"
              >
                <Mail size={26} className="justify-self-center text-[#B88A3B]" />
                <span className="justify-self-center whitespace-nowrap">Email Us</span>
                <ArrowRight className="justify-self-center text-[#B88A3B]" size={20} />
              </a>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="min-w-0 rounded-[18px] border border-[#D8C59E] bg-[#FFFDF8]/90 p-[clamp(22px,2vw,34px)] shadow-[0_22px_60px_rgba(83,63,35,0.10)]"
          >
            <h3 className="text-center font-display text-2xl font-semibold leading-tight text-[#9F7432] sm:text-[28px] xl:text-[30px]">
              Submit Your Online Assessment Request
            </h3>
            <div className="mx-auto mt-3 h-px w-20 bg-[#B88A3B]" />

            <div className="mt-6 grid gap-x-6 gap-y-3.5 md:grid-cols-2">
              <TextField label="Full Name" name="name" placeholder="Please enter your full name" required />
              <SelectField label="Gender" name="gender" options={genderOptions} placeholder="Please select" required />
              <SelectField label="Age Group" name="ageGroup" options={ageGroupOptions} placeholder="Please select" required />
              <SelectField
                label="Country / Region"
                name="country"
                options={countryOptions}
                placeholder="Please select"
                required
              />
              <TextField label="Email" name="email" type="email" placeholder="name@example.com" required />
              <PhoneField
                label="WhatsApp / Phone"
                name="whatsapp"
                placeholder="(201) 555-0123"
                selectedCode={phoneCountryCode}
                onSelectedCodeChange={setPhoneCountryCode}
                required
              />
              <SelectField
                label="Main Concerns"
                name="facialConcerns"
                options={concernOptions}
                placeholder="Please select your main concerns"
                required
              />
              <SelectField
                label="Interested In"
                name="interestedIn"
                options={interestedOptions}
                placeholder="Please select"
                required
              />
              <SelectField
                label="Budget Range (USD)"
                name="budget"
                options={budgetOptions}
                placeholder="Please select your budget range"
                required
              />
              <SelectField
                label="How Did You Hear About Us?"
                name="hearAbout"
                options={hearAboutOptions}
                placeholder="Please select"
                required
              />
              <label className="grid gap-2 text-sm font-semibold text-[#171717] md:col-span-2">
                Additional Information
                <textarea
                  className="min-h-24 rounded-md border border-[#E3D6C2] bg-[#FFFDF8] px-4 py-3 text-sm font-normal text-[#171717] outline-none transition placeholder:text-[#8D8376] focus:border-[#B88A3B] xl:min-h-20"
                  name="additionalInfo"
                  placeholder="Please share any additional details or specific requests..."
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={state === "submitting"}
              className="mt-4 inline-flex h-14 w-full items-center justify-center gap-3 rounded-md bg-[#E2B95E] px-6 text-base font-bold text-[#171717] shadow-[0_14px_34px_rgba(184,138,59,0.20)] transition hover:bg-[#D8A94C] disabled:cursor-not-allowed disabled:opacity-65 xl:h-12"
            >
              {state === "submitting" ? "Submitting..." : "Submit Request"}
              <ArrowRight size={20} />
            </button>

            <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs leading-6 text-[#6B6257] sm:text-sm">
              <ShieldCheck size={15} className="shrink-0 text-[#9F7432]" />
              Your privacy is important to us. All information is encrypted and will not be shared.
            </p>
            {message ? (
              <p className={`mt-4 text-center text-sm ${state === "success" ? "text-sage" : "text-rosewood"}`}>
                {message}
              </p>
            ) : null}
          </form>
        </div>

        <div className="border-t border-[#E3D6C2] pt-7">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
            {brandTrustItems.map((item, index) => {
              const Icon = "icon" in item ? item.icon : null;

              return (
                <div
                  key={item.title}
                  className={`rounded-md border border-[#E3D6C2] bg-[#FFFDF8]/70 p-5 lg:rounded-none lg:border-y-0 lg:border-l-0 lg:bg-transparent lg:px-6 lg:py-2 ${
                    index < brandTrustItems.length - 1 ? "lg:border-r" : "lg:border-r-0"
                  }`}
                >
                  <div className="flex gap-4">
                    {Icon ? (
                      <Icon className="mt-1 shrink-0 text-[#B88A3B]" size={42} strokeWidth={1.45} />
                    ) : (
                      <span className="mt-1 shrink-0 font-display text-4xl text-[#B88A3B]">9D</span>
                    )}
                    <div>
                      <h3 className="font-display text-lg font-semibold leading-snug text-[#9F7432]">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#6B6257]">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TextField({
  label,
  name,
  placeholder,
  type = "text",
  required = false
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-[#171717]">
      {label}
      <input
        className="h-[52px] rounded-md border border-[#E3D6C2] bg-[#FFFDF8] px-4 text-sm font-normal text-[#171717] outline-none transition placeholder:text-[#8D8376] focus:border-[#B88A3B] xl:h-12"
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
      />
    </label>
  );
}

function PhoneField({
  label,
  name,
  placeholder,
  selectedCode,
  onSelectedCodeChange,
  required = false
}: {
  label: string;
  name: string;
  placeholder: string;
  selectedCode: string;
  onSelectedCodeChange: (code: string) => void;
  required?: boolean;
}) {
  const selectedCountry = phoneCountryOptions.find((option) => option.code === selectedCode) || phoneCountryOptions[0];

  return (
    <label className="grid min-w-0 gap-2 text-sm font-semibold text-[#171717]">
      {label}
      <div className="grid grid-cols-[128px_minmax(0,1fr)] gap-3 max-[430px]:grid-cols-[112px_minmax(0,1fr)] xl:grid-cols-[118px_minmax(0,1fr)]">
        <div className="relative h-[52px] rounded-md border border-[#E3D6C2] bg-[#FFFDF8] text-sm text-[#6B6257] focus-within:border-[#B88A3B] xl:h-12">
          <FlagMark code={selectedCountry.code} />
          <select
            aria-label="Phone country code"
            className="h-full w-full appearance-none rounded-md bg-transparent pb-0 pl-10 pr-6 text-sm font-semibold text-[#6B6257] outline-none"
            name="phoneCountryCode"
            value={selectedCountry.code}
            onChange={(event) => {
              onSelectedCodeChange(event.target.value);
            }}
          >
            {phoneCountryOptions.map((option) => (
              <option key={option.code} value={option.code}>
                {option.dialCode} {option.code.toUpperCase()}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#B88A3B]">⌄</span>
        </div>
        <input
          className="h-[52px] min-w-0 rounded-md border border-[#E3D6C2] bg-[#FFFDF8] px-4 text-sm font-normal text-[#171717] outline-none transition placeholder:text-[#8D8376] focus:border-[#B88A3B] xl:h-12"
          type="tel"
          name={name}
          placeholder={placeholder}
          required={required}
        />
      </div>
    </label>
  );
}

function FlagMark({ code }: { code: string }) {
  const baseClass =
    "pointer-events-none absolute left-3 top-1/2 h-[15px] w-[22px] -translate-y-1/2 overflow-hidden rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.10)]";

  if (code === "us") {
    return (
      <span className={baseClass} aria-hidden="true">
        <span
          className="absolute inset-0"
          style={{
            background: "repeating-linear-gradient(to bottom, #B22234 0 1.15px, #FFFFFF 1.15px 2.3px)"
          }}
        />
        <span className="absolute left-0 top-0 h-[8px] w-[9.5px] bg-[#3C3B6E]" />
      </span>
    );
  }

  if (code === "cn" || code === "vn") {
    return (
      <span className={`${baseClass} bg-[#DE2910]`} aria-hidden="true">
        <span className="absolute left-[5px] top-[1px] text-[9px] leading-none text-[#FFDE00]">★</span>
      </span>
    );
  }

  if (code === "my") {
    return (
      <span className={baseClass} aria-hidden="true">
        <span
          className="absolute inset-0"
          style={{
            background: "repeating-linear-gradient(to bottom, #CC0001 0 1.08px, #FFFFFF 1.08px 2.16px)"
          }}
        />
        <span className="absolute left-0 top-0 h-[8px] w-[10px] bg-[#010066]" />
        <span className="absolute left-[3px] top-[2px] text-[6px] leading-none text-[#FFCC00]">●</span>
      </span>
    );
  }

  const simpleBackgrounds: Record<string, string> = {
    ru: "linear-gradient(to bottom, #FFFFFF 0 33.3%, #0039A6 33.3% 66.6%, #D52B1E 66.6%)",
    th: "linear-gradient(to bottom, #A51931 0 16%, #FFFFFF 16% 32%, #2D2A4A 32% 68%, #FFFFFF 68% 84%, #A51931 84%)",
    id: "linear-gradient(to bottom, #CE1126 0 50%, #FFFFFF 50%)",
    sg: "linear-gradient(to bottom, #EF3340 0 50%, #FFFFFF 50%)",
    ph: "linear-gradient(146deg, #FFFFFF 0 30%, transparent 30%), linear-gradient(to bottom, #0038A8 0 50%, #CE1126 50%)",
    kh: "linear-gradient(to bottom, #032EA1 0 25%, #E00025 25% 75%, #032EA1 75%)",
    la: "linear-gradient(to bottom, #CE1126 0 25%, #002868 25% 75%, #CE1126 75%)",
    mm: "linear-gradient(to bottom, #FECB00 0 33.3%, #34B233 33.3% 66.6%, #EA2839 66.6%)",
    jp: "radial-gradient(circle at center, #BC002D 0 28%, transparent 29%), #FFFFFF",
    kr: "radial-gradient(circle at center, #CD2E3A 0 18%, #0047A0 19% 31%, transparent 32%), #FFFFFF",
    hk: "#DE2910",
    tw: "linear-gradient(145deg, #000095 0 36%, transparent 36%), #FE0000",
    au: "linear-gradient(135deg, #FFFFFF 0 12%, transparent 12%), #012169",
    gb: "linear-gradient(90deg, transparent 0 43%, #FFFFFF 43% 57%, transparent 57%), linear-gradient(0deg, transparent 0 38%, #FFFFFF 38% 62%, transparent 62%), #012169",
    ca: "linear-gradient(to right, #D52B1E 0 25%, #FFFFFF 25% 75%, #D52B1E 75%)",
    ae: "linear-gradient(to right, #FF0000 0 25%, transparent 25%), linear-gradient(to bottom, #009739 0 33.3%, #FFFFFF 33.3% 66.6%, #000000 66.6%)",
    sa: "#006C35"
  };

  return (
    <span className={baseClass} style={{ background: simpleBackgrounds[code] || "#F8F4EA" }} aria-hidden="true">
      {code === "la" ? <span className="absolute left-[8px] top-[4px] h-[7px] w-[7px] rounded-full bg-white" /> : null}
      {code === "hk" ? <span className="absolute left-[7px] top-[2px] text-[9px] leading-none text-white">✦</span> : null}
      {code === "tw" ? <span className="absolute left-[2px] top-[1px] text-[7px] leading-none text-white">✹</span> : null}
      {code === "sa" ? <span className="absolute left-[4px] top-[2px] text-[7px] leading-none text-white">▔</span> : null}
    </span>
  );
}

function SelectField({
  label,
  name,
  options,
  placeholder,
  required = false
}: {
  label: string;
  name: string;
  options: string[];
  placeholder: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-[#171717]">
      {label}
      <select
        className="h-[52px] rounded-md border border-[#E3D6C2] bg-[#FFFDF8] px-4 text-sm font-normal text-[#6B6257] outline-none transition focus:border-[#B88A3B] xl:h-12"
        name={name}
        defaultValue=""
        required={required}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
