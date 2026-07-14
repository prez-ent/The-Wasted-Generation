// Uses the Replit Resend integration (connection: resend) via @replit/connectors-sdk.
import { ReplitConnectors } from "@replit/connectors-sdk";
import { logger } from "./logger";

export const TEAM_EMAIL = "info@thewastedgeneration.com";

const FROM_EMAIL = process.env.EMAIL_FROM ?? "TWG Network <info@thewastedgeneration.com>";

export interface EmailField {
  label: string;
  value: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function fieldsToText(fields: EmailField[]): string {
  return fields.map((f) => `${f.label}:\n${f.value || "—"}`).join("\n\n");
}

export function fieldsToHtml(fields: EmailField[]): string {
  const rows = fields
    .map(
      (f) =>
        `<tr><td style="padding:6px 12px 6px 0;vertical-align:top;white-space:nowrap;"><strong>${escapeHtml(f.label)}</strong></td><td style="padding:6px 0;vertical-align:top;">${escapeHtml(f.value || "—").replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("");
  return `<table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;color:#2C2C2C;">${rows}</table>`;
}

export async function sendEmail(options: {
  to: string;
  subject: string;
  text: string;
  html: string;
}): Promise<void> {
  const connectors = new ReplitConnectors();
  const response = await connectors.proxy("resend", "/emails", {
    method: "POST",
    body: {
      from: FROM_EMAIL,
      to: [options.to],
      subject: options.subject,
      text: options.text,
      html: options.html,
    },
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "<unreadable>");
    throw new Error(`Resend API error ${response.status}: ${detail}`);
  }

  const result = (await response.json().catch(() => null)) as { id?: string } | null;
  logger.info({ to: options.to, subject: options.subject, resendId: result?.id }, "Email sent");
}
