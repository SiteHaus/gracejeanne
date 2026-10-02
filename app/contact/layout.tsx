import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Grace Jeanne about fine art prints, commissions and licensing.",
  alternates: {
    canonical: "https://gracejeanne.com/contact",
  },
  openGraph: {
    title: "Contact | Grace Jeanne",
    description:
      "Get in touch with Grace Jeanne about prints, commissions and licensing.",
    url: "https://gracejeanne.com/contact",
  },
};

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
