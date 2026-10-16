"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../sanity.facebook.config";

export default function FacebookSanityStudioClient() {
  return <NextStudio config={config} />;
}
