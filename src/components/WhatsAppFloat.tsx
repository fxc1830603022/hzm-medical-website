import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/site-data";
import type { SiteSettings } from "@/lib/site-types";

type WhatsAppFloatProps = {
  settings: SiteSettings;
};

export function WhatsAppFloat({ settings }: WhatsAppFloatProps) {
  return (
    <a
      href={getWhatsAppUrl(settings)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Chat"
      className="fixed bottom-3 right-3 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-whatsapp px-0 font-semibold text-white shadow-lift transition hover:-translate-y-1 sm:bottom-5 sm:right-5 sm:h-14 sm:w-auto sm:justify-start sm:gap-3 sm:px-5"
    >
      <MessageCircle size={23} />
      <span className="hidden sm:inline">WhatsApp Consultation</span>
    </a>
  );
}
