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
  message?: string;
  status: string;
  source: string;
  createdAt: string;
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

async function createWithWindowsPowerShell(payload: ConsultationSubmission) {
  if (process.platform !== "win32") return null;

  const token = process.env.SANITY_API_TOKEN;
  const url = getSanityMutationUrl();
  if (!token || !url) return null;

  const body = JSON.stringify({
    mutations: [
      {
        create: {
          _type: "consultationSubmission",
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
      const fallback = await createWithWindowsPowerShell(sanityPayload);
      if (fallback) return fallback;
      throw error;
    }
  }

  return createWithWindowsPowerShell(sanityPayload);
}
