"use client";

import { useActionState } from "react";
import { Instagram, MapPin } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import { submitContactForm, type ContactFormState } from "./actions";

const initialState: ContactFormState = { status: "idle" };

const fieldClass =
  "w-full bg-card border border-input rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";
const labelClass = "text-xs uppercase tracking-[0.18em] text-muted-foreground";

export default function ContactPage() {
  const [state, action, pending] = useActionState(
    submitContactForm,
    initialState,
  );

  return (
    <div className="w-full">
      <header className="max-w-3xl mx-auto px-6 pt-14 pb-12 md:pt-20 md:pb-16 text-center flex flex-col items-center gap-5">
        <h1 className="text-3xl md:text-4xl">Contact</h1>
        <p className="text-base md:text-lg leading-relaxed text-foreground/80">
          Questions about a print, a size or finish, a commission or licensing?
          Send a note and Grace will get back to you.
        </p>
      </header>

      <section className="max-w-5xl mx-auto px-6 pb-24 grid md:grid-cols-[2fr_3fr] gap-14 md:gap-20">
        {/* ── Details ── */}
        <div className="flex flex-col gap-8">
          <h2 className="text-xl md:text-2xl">Get in touch</h2>

          {/* PLACEHOLDER: add Grace's email or phone here if she wants them public */}
          <div className="flex flex-col gap-1.5">
            <p className={labelClass}>Based in</p>
            <p className="inline-flex items-center gap-2 text-foreground">
              <MapPin size={16} strokeWidth={1.5} className="text-primary" />
              St. George, Utah
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <p className={labelClass}>Follow</p>
            <a
              href="https://www.instagram.com/gracejeanne"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors w-fit"
            >
              <Instagram size={16} strokeWidth={1.5} className="text-primary" />
              @gracejeanne
            </a>
          </div>

          <div className="flex flex-col gap-1.5">
            <p className={labelClass}>Response time</p>
            <p className="text-foreground">Usually within two business days.</p>
          </div>
        </div>

        {/* ── Form ── */}
        <div id="contact-form" className="flex flex-col gap-6 scroll-mt-24">
          <h2 className="text-xl md:text-2xl">Send a message</h2>

          {state.status === "success" ? (
            <div
              role="status"
              className="border border-border bg-surface px-6 py-10 text-center flex flex-col gap-3"
            >
              <p className="font-display text-xl text-heading">
                Thank you for reaching out
              </p>
              <p className="text-sm text-muted-foreground">
                Your message is on its way. Grace will reply as soon as she can.
              </p>
            </div>
          ) : (
            <form action={action} className="flex flex-col gap-5">
              {/* Honeypot — hidden from humans, bots fill it */}
              <input
                name="_gotcha"
                type="text"
                tabIndex={-1}
                aria-hidden="true"
                autoComplete="off"
                className="absolute -left-[9999px] opacity-0 pointer-events-none"
              />

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className={labelClass}>
                    First name *
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    className={fieldClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className={labelClass}>
                    Last name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className={labelClass}>
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={fieldClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className={labelClass}>
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="topic" className={labelClass}>
                  What&apos;s this about?
                </label>
                <select
                  id="topic"
                  name="topic"
                  defaultValue="Print purchase"
                  className={fieldClass}
                >
                  <option>Print purchase</option>
                  <option>Commission</option>
                  <option>Licensing</option>
                  <option>Something else</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className={labelClass}>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className={`${fieldClass} resize-y min-h-32`}
                />
              </div>

              <Turnstile
                siteKey={
                  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ??
                  "1x00000000000000000000AA" // Cloudflare's always-pass test key
                }
                options={{ theme: "dark", size: "normal" }}
              />

              {state.status === "error" && (
                <p role="alert" className="text-sm text-destructive">
                  {state.message}
                </p>
              )}

              <button
                type="submit"
                disabled={pending}
                className="self-start border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3.5 text-xs uppercase tracking-[0.22em] transition-colors disabled:opacity-60 disabled:cursor-wait"
              >
                {pending ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
