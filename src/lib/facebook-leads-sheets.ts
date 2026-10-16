import { execFile } from "node:child_process";
import { promisify } from "node:util";
import type { FacebookAdsLead } from "./sanity-write";

export const facebookSheetsScriptVersion = "2026-10-13-facebook-assessment-v1";
export type FacebookSheetsSyncResult = { configured: boolean; synced: boolean; error?: string };
const execFileAsync = promisify(execFile);

async function sendFacebookSheetRequest(url: string, body: string, signal: AbortSignal) {
  // Windows may have working system proxy access while Node's fetch cannot connect.
  if (process.platform === "win32") {
    const script = [
      "$ErrorActionPreference = 'Stop'",
      "$bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($env:FACEBOOK_SHEETS_REQUEST_BODY)",
      "$response = Invoke-WebRequest -Uri $env:FACEBOOK_SHEETS_REQUEST_URL -Method POST -ContentType 'application/json; charset=utf-8' -Body $bodyBytes -UseBasicParsing -TimeoutSec 15",
      "$response.Content"
    ].join("; ");
    const { stdout } = await execFileAsync(
      "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
      ["-NoProfile", "-Command", script],
      {
        env: { ...process.env, FACEBOOK_SHEETS_REQUEST_URL: url, FACEBOOK_SHEETS_REQUEST_BODY: body },
        timeout: 20000,
        maxBuffer: 1024 * 1024,
        windowsHide: true
      }
    );
    return { ok: true, result: JSON.parse(stdout) as unknown };
  }
  const response = await fetch(url, {
    method: "POST", headers: { "Content-Type": "application/json" },
    cache: "no-store", signal, body
  });
  return { ok: response.ok, result: await response.json().catch(() => null) as unknown };
}

export async function syncFacebookLeadToSheets(payload: FacebookAdsLead, sanityRecordId: string): Promise<FacebookSheetsSyncResult> {
  const url = process.env.FACEBOOK_ADS_SHEETS_WEBHOOK_URL?.trim();
  const secret = process.env.FACEBOOK_ADS_SHEETS_WEBHOOK_SECRET?.trim();
  if (!url || !secret) return { configured: false, synced: false };
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const body = JSON.stringify({
        secret,
        submittedAt: payload.createdAt,
        name: payload.name,
        countryRegion: payload.countryRegion,
        ageGroup: payload.ageGroup,
        facialConcerns: payload.facialConcerns.join(", "),
        treatmentTimeline: payload.treatmentTimeline,
        whatsapp: payload.whatsapp,
        email: payload.email,
        additionalNotes: payload.additionalNotes,
        consent: payload.consent ? "Yes" : "No",
        status: payload.status,
        source: payload.source,
        sanityRecordId
      });
    const { ok, result } = await sendFacebookSheetRequest(url, body, controller.signal);
    const data = result && typeof result === "object" ? result as Record<string, unknown> : null;
    if (!ok || data?.ok !== true || data.scriptVersion !== facebookSheetsScriptVersion || data.sheetName !== "Facebook Ads Leads") {
      return { configured: true, synced: false, error: "Facebook Sheets did not confirm a write to the dedicated table. Check deployment, access, secret and script version." };
    }
    return { configured: true, synced: true };
  } catch {
    return { configured: true, synced: false, error: "Facebook Sheets request failed or timed out. The lead remains saved in CMS." };
  } finally { clearTimeout(timeout); }
}
