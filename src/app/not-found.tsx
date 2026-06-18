import Link from "next/link";
import { ArrowRight, BookOpenText, Home, Stethoscope, UserRoundCheck } from "lucide-react";
import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { getSiteSettings } from "@/lib/sanity";

const helpfulLinks = [
  {
    href: "/",
    label: "Home",
    description: "Return to Dr. Xiao 9D Facelift overview.",
    icon: Home
  },
  {
    href: "/doctor",
    label: "Doctor",
    description: "Meet Dr. Xiao Zhongye and his surgical philosophy.",
    icon: UserRoundCheck
  },
  {
    href: "/procedures/9d-facelift",
    label: "9D Facelift",
    description: "Understand the signature 9D Facelift approach.",
    icon: Stethoscope
  },
  {
    href: "/consultation",
    label: "Consultation",
    description: "Send photos and start an online assessment.",
    icon: ArrowRight
  },
  {
    href: "/blog",
    label: "Articles",
    description: "Read guides on facelift planning and recovery.",
    icon: BookOpenText
  }
];

export default async function NotFound() {
  const settings = await getSiteSettings();

  return (
    <>
      <Navbar settings={settings} />
      <main className="bg-porcelain pt-28">
        <section className="px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase text-bronze" style={{ letterSpacing: "0.18em" }}>
                Page Not Found
              </p>
              <h1 className="mt-5 font-display text-5xl font-semibold leading-tight text-ink sm:text-6xl">
                This page is no longer available.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-graphite/75">
                The link may have changed. You can continue from the main medical pages below, or start with an
                online consultation if you are planning a 9D Facelift journey.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-ink px-6 text-sm font-bold text-white transition hover:bg-champagne hover:text-ink"
                >
                  <Home size={18} />
                  Return Home
                </Link>
                <Link
                  href="/consultation"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-bronze/35 bg-white px-6 text-sm font-bold text-bronze transition hover:border-bronze hover:bg-mist"
                >
                  Consultation
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {helpfulLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group rounded-md border border-ink/10 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-champagne/70 hover:shadow-lift"
                  >
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-mist text-bronze transition group-hover:bg-champagne group-hover:text-ink">
                      <Icon size={23} />
                    </span>
                    <span className="mt-5 block font-display text-2xl font-semibold text-ink">{item.label}</span>
                    <span className="mt-3 block text-sm leading-7 text-graphite/70">{item.description}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppFloat settings={settings} />
    </>
  );
}
