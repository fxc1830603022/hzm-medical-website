"use client";

import { useEffect } from "react";
import { captureTrafficSource, configureWhatsAppSourceGreetings, type WhatsAppSourceGreetings } from "@/lib/tracking";

type TrackingProviderProps = {
  whatsappSourceGreetings?: WhatsAppSourceGreetings;
};

export function TrackingProvider({ whatsappSourceGreetings }: TrackingProviderProps) {
  useEffect(() => {
    configureWhatsAppSourceGreetings(whatsappSourceGreetings);
    captureTrafficSource();
  }, [whatsappSourceGreetings]);

  return null;
}
