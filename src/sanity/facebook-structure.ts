import type { StructureBuilder } from "sanity/structure";

export function facebookLeadsStructure(S: StructureBuilder) {
  const list = (title: string, filter = "") =>
    S.listItem().title(title).child(
      S.documentList().title(title).schemaType("facebookAdsLead")
        .filter('_type == "facebookAdsLead"' + (filter ? " && " + filter : ""))
        .defaultOrdering([{ field: "createdAt", direction: "desc" }])
    );
  return S.list().title("Facebook 客户管理").items([
    list("全部客户"),
    list("新客户 · 待联系", 'status == "new"'),
    list("已联系", 'status == "contacted"'),
    list("有效客户", 'status == "qualified"'),
    list("已结束", 'status == "closed"'),
    S.divider(),
    list("Google 表格 · 已同步", 'googleSheetsSyncStatus == "synced"'),
    list("Google 表格 · 待同步", 'googleSheetsSyncStatus == "pending"'),
    list("Google 表格 · 同步失败", 'googleSheetsSyncStatus == "failed"'),
    list("Google 表格 · 尚未连接", '!defined(googleSheetsSyncStatus) || googleSheetsSyncStatus == "not_configured"')
  ]);
}
