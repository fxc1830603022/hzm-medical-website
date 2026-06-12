type LeadPayload = {
  name: string;
  email: string;
  phone?: string;
  country?: string;
  concern?: string;
  message?: string;
  source?: string;
  createdAt: string;
};

type FeishuTenantTokenResponse = {
  code: number;
  msg?: string;
  tenant_access_token?: string;
};

type FeishuCreateRecordResponse = {
  code: number;
  msg?: string;
  data?: {
    record?: {
      record_id?: string;
    };
  };
};

function getFeishuConfig() {
  const appId = process.env.FEISHU_APP_ID;
  const appSecret = process.env.FEISHU_APP_SECRET;
  const appToken = process.env.FEISHU_BITABLE_APP_TOKEN;
  const tableId = process.env.FEISHU_BITABLE_TABLE_ID;

  if (!appId || !appSecret || !appToken || !tableId) return null;

  return {
    appId,
    appSecret,
    appToken,
    tableId
  };
}

function mapConcernToFeishuOption(value?: string) {
  const normalized = (value || "").trim();

  const options: Record<string, string> = {
    "9d-facelift": "9D Facelift",
    "9d-deep-plane": "Deep Plane Facelift",
    consultation: "Anti-aging Consultation"
  };

  return options[normalized] || normalized || "Other";
}

async function getTenantAccessToken(appId: string, appSecret: string) {
  const response = await fetch("https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      app_id: appId,
      app_secret: appSecret
    })
  });

  const data = (await response.json()) as FeishuTenantTokenResponse;
  if (!response.ok || data.code !== 0 || !data.tenant_access_token) {
    throw new Error(data.msg || "Unable to get Feishu tenant access token.");
  }

  return data.tenant_access_token;
}

export async function syncLeadToFeishu(payload: LeadPayload, sanityRecordId?: string) {
  const config = getFeishuConfig();
  if (!config) {
    return {
      configured: false,
      synced: false
    };
  }

  const token = await getTenantAccessToken(config.appId, config.appSecret);
  const submittedAt = Date.parse(payload.createdAt);

  const response = await fetch(
    `https://open.feishu.cn/open-apis/bitable/v1/apps/${config.appToken}/tables/${config.tableId}/records`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fields: {
          "姓名": payload.name,
          "电话 / WhatsApp": payload.phone || "",
          "邮箱": payload.email,
          "国家 / 地区": payload.country || "",
          "咨询项目": mapConcernToFeishuOption(payload.concern),
          "留言": payload.message || "",
          "来源页面": payload.source || "website",
          "提交时间": Number.isNaN(submittedAt) ? Date.now() : submittedAt,
          "跟进状态": "新线索",
          "Sanity记录ID": sanityRecordId || ""
        }
      })
    }
  );

  const data = (await response.json()) as FeishuCreateRecordResponse;
  if (!response.ok || data.code !== 0) {
    throw new Error(data.msg || "Unable to create Feishu record.");
  }

  return {
    configured: true,
    synced: true,
    recordId: data.data?.record?.record_id
  };
}
