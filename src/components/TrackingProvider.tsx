"use client";

import { useEffect } from "react";
import { captureTrafficSource } from "@/lib/tracking";

export function TrackingProvider() {
  useEffect(() => {
    captureTrafficSource();
  }, []);

  return null;
}
