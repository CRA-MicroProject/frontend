import { BrevoClient, BrevoError } from "@getbrevo/brevo";
import { NextResponse } from "next/server";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type ContactBody = {
  name?: unknown;
  email?: unknown;
  helpDescription?: unknown;
};

export async function POST(request: Request) {
  const apiKey = process.env.BREVO_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL?.trim();
  const senderEmail =
    process.env.BREVO_SENDER_EMAIL?.trim() || adminEmail || "";

  if (!apiKey || !adminEmail) {
    console.error("contact: missing BREVO_API_KEY or ADMIN_EMAIL");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 503 });
  }
  if (!senderEmail) {
    console.error("contact: no sender email (set ADMIN_EMAIL or BREVO_SENDER_EMAIL)");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 503 });
  }

  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const helpDescription =
    typeof body.helpDescription === "string" ? body.helpDescription.trim() : "";

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  if (!helpDescription) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeHelp = escapeHtml(helpDescription).replace(/\r\n|\n|\r/g, "<br/>");

  const htmlContent = `
<!DOCTYPE html>
<html>
<body style="font-family: system-ui, sans-serif; line-height: 1.5; color: #0f172a;">
  <h1 style="font-size: 1.125rem;">New contact form submission</h1>
  <p><strong>Name:</strong> ${safeName}</p>
  <p><strong>Email:</strong> ${safeEmail}</p>
  <p><strong>Message:</strong></p>
  <p style="white-space: pre-wrap;">${safeHelp}</p>
</body>
</html>`.trim();

  const client = new BrevoClient({ apiKey });

  try {
    await client.transactionalEmails.sendTransacEmail({
      sender: {
        name: process.env.BREVO_SENDER_NAME?.trim() || "Website contact",
        email: senderEmail,
      },
      to: [{ email: adminEmail }],
      replyTo: { email, name: name.slice(0, 70) },
      subject: `Contact: ${name.slice(0, 80)}`,
      htmlContent,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof BrevoError) {
      const detail =
        typeof err.body === "object" && err.body !== null
          ? JSON.stringify(err.body)
          : String(err.body ?? "");
      console.error("Brevo API error:", err.statusCode, detail.slice(0, 500));
    } else {
      console.error("contact: Brevo request failed:", err);
    }
    return NextResponse.json({ error: "Failed to send message" }, { status: 502 });
  }
}
