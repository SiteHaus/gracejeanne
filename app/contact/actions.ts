"use server";

import { Resend } from "resend";

// Same setup as onehealthclinics: Resend for delivery, Cloudflare Turnstile
// plus a honeypot for spam. Needs RESEND_API_KEY, CONTACT_EMAIL and
// TURNSTILE_SECRET_KEY in the environment (see .env.example).

export type ContactFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

const TOPICS = new Set([
  "Print purchase",
  "Commission",
  "Licensing",
  "Something else",
]);

/** Escape visitor input before it goes into the HTML email body. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // skip verification if not configured (dev)

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token }),
    },
  );
  const data = await res.json();
  return data.success === true;
}

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot: bots fill this, humans don't
  if (formData.get("_gotcha")?.toString()) {
    return { status: "success" }; // silent drop
  }

  const turnstileToken =
    formData.get("cf-turnstile-response")?.toString() ?? "";
  const isHuman = await verifyTurnstile(turnstileToken);
  if (!isHuman) {
    return {
      status: "error",
      message: "Verification failed. Please try again.",
    };
  }

  const firstName = formData.get("firstName")?.toString().trim() ?? "";
  const lastName = formData.get("lastName")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const phone = formData.get("phone")?.toString().trim() ?? "";
  const rawTopic = formData.get("topic")?.toString() ?? "";
  const topic = TOPICS.has(rawTopic) ? rawTopic : "Something else";
  const message = formData.get("message")?.toString().trim() ?? "";

  if (!firstName || !email || !message) {
    return {
      status: "error",
      message: "Please fill out all required fields.",
    };
  }

  const to = process.env.CONTACT_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;
  if (!to || !apiKey) {
    return { status: "error", message: "Contact form is not configured." };
  }

  const name = `${firstName} ${lastName}`.trim();
  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    phone: escapeHtml(phone),
    topic: escapeHtml(topic),
    message: escapeHtml(message),
  };

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Grace Jeanne Photography <contact@notify.sitehaus.dev>",
      to,
      replyTo: email,
      subject: `${topic}: new message from ${name}`,
      text: `Topic: ${topic}\nName: ${name}\nEmail: ${email}\n${phone ? `Phone: ${phone}\n` : ""}\n${message}`,
      html: `
        <p><strong>Topic:</strong> ${safe.topic}</p>
        <p><strong>Name:</strong> ${safe.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${safe.email}">${safe.email}</a></p>
        ${safe.phone ? `<p><strong>Phone:</strong> ${safe.phone}</p>` : ""}
        <hr />
        <p style="white-space:pre-wrap">${safe.message}</p>
      `,
    });

    if (error) throw new Error(error.message);
    return { status: "success" };
  } catch {
    return {
      status: "error",
      message: "Failed to send message. Please try again.",
    };
  }
}
