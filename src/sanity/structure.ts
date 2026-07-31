import type { StructureBuilder } from "sanity/structure";

export const googleAdsLandingPageDocumentId = "googleAdsLandingPage.content";
export const singletonSchemaTypes = new Set(["googleAdsLandingPage"]);
const customStructureSchemaTypes = new Set(["googleAdsLandingPage", "googleAdsLead"]);

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
            .schemaType("googleAdsLead")
            .filter('_type == "googleAdsLead"')
            .defaultOrdering([{ field: "createdAt", direction: "desc" }])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !customStructureSchemaTypes.has(item.getId() || ""))
    ]);
}
