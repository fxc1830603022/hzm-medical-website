export default async function StudioPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  if (!projectId) {
    return <MissingCmsConfig />;
  }

  const StudioClient = (await import("@/components/SanityStudioClient")).default;
  return <StudioClient />;
}

function MissingCmsConfig() {
  return (
    <main style={{ minHeight: "100vh", background: "#fbfaf7", color: "#151514", padding: "48px 20px" }}>
      <section
        style={{
          maxWidth: 760,
          margin: "0 auto",
          background: "white",
          border: "1px solid rgba(21,21,20,0.12)",
          borderRadius: 8,
          padding: 32,
          boxShadow: "0 18px 60px rgba(21,21,20,0.10)"
        }}
      >
        <p style={{ color: "#9d7b45", fontWeight: 700, letterSpacing: "0.18em", fontSize: 13 }}>
          SANITY CMS
        </p>
        <h1 style={{ fontSize: 34, lineHeight: 1.2, margin: "14px 0 12px" }}>CMS 还没有连接</h1>
        <p style={{ lineHeight: 1.8, color: "#4a4742" }}>
          这是正常状态。你需要先创建 Sanity 项目，然后在 <code>.env.local</code> 里填写
          <code> NEXT_PUBLIC_SANITY_PROJECT_ID</code>、<code>NEXT_PUBLIC_SANITY_DATASET</code> 和
          <code>SANITY_API_TOKEN</code>。
        </p>
        <div style={{ marginTop: 24, padding: 18, background: "#f0f3f2", borderRadius: 6, lineHeight: 1.9 }}>
          <strong>下一步：</strong>
          <br />
          打开项目里的 <code>CMS_SETUP_GUIDE_CN.md</code>，按步骤创建 Sanity 后台、填写环境变量、导入旧站内容。
        </div>
      </section>
    </main>
  );
}
