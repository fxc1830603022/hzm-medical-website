import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/site-data";
import type { SiteSettings } from "@/lib/site-types";
import { TrackedWhatsAppLink } from "./TrackedWhatsAppLink";

type WhatsAppFloatProps = {
  settings: SiteSettings;
};

export function WhatsAppFloat({ settings }: WhatsAppFloatProps) {
  return (
    <TrackedWhatsAppLink
      href={getWhatsAppUrl(settings)}
      placement="floating_whatsapp"
      label="Floating WhatsApp"
      aria-label="WhatsApp Chat"
      className="fixed bottom-3 right-3 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-whatsapp px-0 font-semibold text-white shadow-lift transition hover:-translate-y-1 sm:bottom-5 sm:right-5 sm:h-14 sm:w-auto sm:justify-start sm:gap-3 sm:px-5"
    >
      <MessageCircle size={23} />
      <span className="hidden sm:inline">WhatsApp Consultation</span>
    </TrackedWhatsAppLink>
  );
}
