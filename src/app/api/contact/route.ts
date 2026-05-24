import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";

interface ContactPayload {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  message?: string;
  honeypot?: string;
}

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  const payload = (await req.json().catch(() => ({}))) as ContactPayload;

  if (payload.honeypot) return NextResponse.json({ ok: true });

  const name = (payload.name ?? "").trim();
  const email = (payload.email ?? "").trim();
  const message = (payload.message ?? "").trim();
  const company = (payload.company ?? "").trim();
  const phone = (payload.phone ?? "").trim();

  if (name.length < 2 || !isValidEmail(email) || message.length < 10) {
    return NextResponse.json({ ok: false, error: "Champs invalides." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL ?? SITE.contact.email;

  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY missing");
    return NextResponse.json({ ok: false, error: "Configuration manquante." }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const subject = `[iavarone-group.fr] ${name}${company ? ` (${company})` : ""}`;
  const html = `
    <h2>Nouveau message via iavarone-group.fr</h2>
    <table cellpadding="6" style="font-family:Inter,system-ui;font-size:14px">
      <tr><td><strong>Nom</strong></td><td>${escape(name)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escape(email)}</td></tr>
      ${company ? `<tr><td><strong>Société</strong></td><td>${escape(company)}</td></tr>` : ""}
      ${phone ? `<tr><td><strong>Téléphone</strong></td><td>${escape(phone)}</td></tr>` : ""}
    </table>
    <hr />
    <pre style="white-space:pre-wrap;font-family:Inter,system-ui;font-size:14px">${escape(message)}</pre>
  `;

  try {
    await resend.emails.send({
      from: "IAvarone Group <noreply@iavarone-group.fr>",
      to,
      replyTo: email,
      subject,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] resend send failed", err);
    return NextResponse.json({ ok: false, error: "Envoi impossible." }, { status: 502 });
  }
}

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
