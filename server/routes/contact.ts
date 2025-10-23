import { RequestHandler } from "express";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  message: z.string().min(1).max(5000),
  lang: z.enum(["en", "ar"]).optional(),
});

async function sendEmail({ to, subject, html, text }: { to: string; subject: string; html: string; text: string }) {
  const resendKey = process.env.RESEND_API_KEY;
  const sendgridKey = process.env.SENDGRID_API_KEY;

  if (resendKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to,
        from: process.env.CONTACT_FROM || "noreply@yourdomain.com",
        subject,
        html,
        text,
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Resend error: ${res.status} ${err}`);
    }
    return;
  }

  if (sendgridKey) {
    const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sendgridKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: { email: process.env.CONTACT_FROM || "noreply@yourdomain.com" },
        subject,
        content: [
          { type: "text/plain", value: text },
          { type: "text/html", value: html },
        ],
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`SendGrid error: ${res.status} ${err}`);
    }
    return;
  }

  throw new Error("Email service not configured. Set RESEND_API_KEY or SENDGRID_API_KEY.");
}

export const handleContact: RequestHandler = async (req, res) => {
  try {
    const parsed = ContactSchema.parse(req.body);
    const to = process.env.CONTACT_TO || "ayahqurantutor@gmail.com";

    const subject = `New contact from ${parsed.name}`;
    const text = `Name: ${parsed.name}\nEmail: ${parsed.email}\nLang: ${parsed.lang || "en"}\n\nMessage:\n${parsed.message}`;
    const html = `
      <div style="font-family:system-ui, -apple-system, Segoe UI, Roboto, Arial">
        <h2>New contact submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(parsed.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(parsed.email)}</p>
        <p><strong>Lang:</strong> ${parsed.lang || "en"}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space:pre-wrap">${escapeHtml(parsed.message)}</pre>
      </div>
    `;

    await sendEmail({ to, subject, html, text });
    res.status(200).json({ ok: true });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ ok: false, error: err.flatten() });
    }
    console.error("/api/contact error", err);
    res.status(500).json({ ok: false, error: "Email service not configured or failed." });
  }
};

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
