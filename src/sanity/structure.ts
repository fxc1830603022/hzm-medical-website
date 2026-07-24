import type { StructureBuilder } from "sanity/structure";

export const googleAdsLandingPageDocumentId = "googleAdsLandingPage";
export const singletonSchemaTypes = new Set(["googleAdsLandingPage"]);

export function studioStructure(S: StructureBuilder) {
  return S.list()
    .title("Dr. Xiao 9D CMS")
    .items([
      S.listItem()
        .title("Google Ads Landing Page")
        .child(
          S.document()
            .schemaType("googleAdsLandingPage")
            .documentId(googleAdsLandingPageDocumentId)
            .title("Google Ads Landing Page")
        ),
      S.listItem()
        .title("Google Ads Leads")
        .child(
          S.documentList()
            .title("Google Ads Leads")
            .schemaType("consultationSubmission")
            .filter('_type == "consultationSubmission" && source == $source')
            .params({ source: "google-ads-private-assessment-v3" })
            .defaultOrdering([{ field: "createdAt", direction: "desc" }])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !singletonSchemaTypes.has(item.getId() || ""))
    ]);
}
