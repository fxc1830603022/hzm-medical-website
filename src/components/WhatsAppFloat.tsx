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
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 items-center gap-3 rounded-full bg-whatsapp px-5 font-semibold text-white shadow-lift transition hover:-translate-y-1"
    >
      <MessageCircle size={23} />
      <span className="hidden sm:inline">WhatsApp Consultation</span>
    </a>
  );
}
