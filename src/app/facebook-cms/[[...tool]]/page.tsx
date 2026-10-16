import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Facebook 客户管理 | Dr. Xiao" },
  robots: { index: false, follow: false }
};

export default async function FacebookCmsPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F6F2EB] px-5 py-12 text-[#252A26]">
        <section className="w-full max-w-xl rounded-xl border border-[#DED7CB] bg-white p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#AA8555]">Dr. Xiao · Facebook</p>
          <h1 className="mt-4 text-2xl font-semibold">Facebook 客户管理后台</h1>
          <p className="mt-5 leading-7 text-[#697269]">后台入口已经建立，连接网站现有 CMS 后即可查看客户。</p>
          <p className="mt-3 text-sm leading-7 text-[#697269]">这里单独管理 Facebook 表单提交、客户跟进和 Google 表格同步状态。</p>
          <p className="mt-6 rounded-md bg-[#F3F5F0] p-4 text-sm leading-6">当前缺少本地 CMS 配置，尚不能读取或保存真实客户数据。</p>
        </section>
      </main>
    );
  }
  const Studio = (await import("@/components/FacebookSanityStudioClient")).default;
  return <Studio />;
}
