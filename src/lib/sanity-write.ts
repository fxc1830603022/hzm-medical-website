import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { makeServerSanityClient } from "./sanity";

type ConsultationSubmission = {
  name: string;
  gender?: string;
  ageGroup?: string;
  nationality?: string;
  facialConcerns?: string;
  budget?: string;
  whatsapp?: string;
  email: string;
  wechat?: string;
  phone?: string;
  country?: string;
  concern?: string;
  interestedIn?: string;
  hearAbout?: string;
  message?: string;
  status: string;
  source: string;
  createdAt: string;
};

export type GoogleAdsLead = {
  name: string;
  countryRegion: string;
  ageGroup: string;
  facialConcerns: string[];
  previousTreatments: string;
  treatmentTimeline: string;
  whatsapp?: string;
  email?: string;
  preferredContactMethod: string;
  additionalNotes?: string;
  consent: boolean;
  status: string;
  source: string;
  createdAt: string;
  googleSheetsSyncStatus: "pending" | "synced" | "not_configured" | "failed";
};

type SanityMutationResponse = {
  results?: Array<{
    id?: string;
    document?: {
      _id?: string;
    };
  }>;
};

const execFileAsync = promisify(execFile);

function getSanityMutationUrl() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-02-19";

  if (!projectId || !dataset) return "";

  return `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}?returnDocuments=true`;
}

async function createWithWindowsPowerShell(
  documentType: "consultationSubmission" | "googleAdsLead",
  payload: ConsultationSubmission | GoogleAdsLead
) {
  if (process.platform !== "win32") return null;

  const token = process.env.SANITY_API_TOKEN;
  const url = getSanityMutationUrl();
  if (!token || !url) return null;

  const body = JSON.stringify({
    mutations: [
      {
        create: {
          _type: documentType,
          ...payload
        }
      }
    ]
  });

  const script = [
    "$ErrorActionPreference = 'Stop'",
    "$headers = @{ Authorization = 'Bearer ' + $env:SANITY_API_TOKEN }",
    "$bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($env:SANITY_MUTATION_BODY)",
    "$response = Invoke-RestMethod -Uri $env:SANITY_MUTATION_URL -Method POST -ContentType 'application/json; charset=utf-8' -Headers $headers -Body $bodyBytes -TimeoutSec 60",
    "$response | ConvertTo-Json -Depth 20 -Compress"
  ].join("; ");

  const { stdout } = await execFileAsync(
    "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
    ["-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", script],
    {
      env: {
        ...process.env,
        SANITY_API_TOKEN: token,
        SANITY_MUTATION_URL: url,
        SANITY_MUTATION_BODY: body
      },
      maxBuffer: 1024 * 1024,
      timeout: 90000,
      windowsHide: true
    }
  );

  const parsed = JSON.parse(stdout) as SanityMutationResponse;
  const result = parsed.results?.[0];
  const id = result?.id || result?.document?._id;

  if (!id) {
    throw new Error("Sanity fallback write completed without a document id.");
  }

  return {
    _id: id
  };
}

export async function createConsultationSubmission(payload: ConsultationSubmission) {
  const { country: _legacyCountry, concern: _legacyConcern, ...sanityPayload } = payload;
  const sanity = makeServerSanityClient();

  if (sanity) {
    try {
      return await sanity.create({
        _type: "consultationSubmission",
        ...sanityPayload
      });
    } catch (error) {
      const fallback = await createWithWindowsPowerShell("consultationSubmission", sanityPayload);
      if (fallback) return fallback;
      throw error;
    }
  }

  return createWithWindowsPowerShell("consultationSubmission", sanityPayload);
}

export async function createGoogleAdsLead(payload: GoogleAdsLead) {
  const sanity = makeServerSanityClient();

  if (sanity) {
    try {
      return await sanity.create({
        _type: "googleAdsLead",
        ...payload
      });
    } catch (error) {
      const fallback = await createWithWindowsPowerShell("googleAdsLead", payload);
      if (fallback) return fallback;
      throw error;
    }
  }

  return createWithWindowsPowerShell("googleAdsLead", payload);
}

export async function updateGoogleAdsLeadSheetSync(
  documentId: string,
  result: { configured: boolean; synced: boolean; error?: string }
) {
  const sanity = makeServerSanityClient();
  if (!sanity) return false;

  const status = result.synced ? "synced" : result.configured ? "failed" : "not_configured";
  const values: Record<string, string> = {
    googleSheetsSyncStatus: status
  };

  if (result.synced) {
    values.googleSheetsSyncedAt = new Date().toISOString();
  }
  if (result.error) {
    values.googleSheetsSyncError = result.error.slice(0, 1000);
  }

  let patch = sanity.patch(documentId).set(values);
  if (!result.error) {
    patch = patch.unset(["googleSheetsSyncError"]);
  }
  await patch.commit();
  return true;
}
