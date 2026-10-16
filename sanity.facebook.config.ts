import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { facebookAdsLead } from "./src/sanity/schemaTypes/facebookAdsLead";
import { facebookLeadsStructure } from "./src/sanity/facebook-structure";

export default defineConfig({
  name: "facebook_leads",
  title: "Dr. Xiao Facebook 客户管理",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/facebook-cms",
  plugins: [structureTool({ structure: facebookLeadsStructure })],
  schema: { types: [facebookAdsLead], templates: [] },
  document: { newDocumentOptions: () => [] }
});
