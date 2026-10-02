import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navigation/Navbar";
import { NavbarLinkType } from "@/components/shared/navigation/NavbarLink";
import type { Metadata, Viewport } from "next";
import { Merriweather, Roboto } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Light serif for headings/captions, clean sans for body and nav —
// the pairing fine-art print galleries tend to use.
const displaySerif = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-display-serif",
});

const body = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
});

const siteUrl = "https://gracejeanne.com";

// Matches --background so mobile browser chrome and app previews blend in
export const viewport: Viewport = {
  themeColor: "#1c1916",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Grace Jeanne | Photography in St. George, Utah",
    template: "%s | Grace Jeanne",
  },
  description:
    "Fine art landscape photography and prints by Grace Jeanne, based in St. George, Utah.",
  keywords: [
    "photography St. George Utah",
    "Grace Jeanne",
    "photographer St. George",
  ],
  authors: [{ name: "Grace Jeanne" }],
  creator: "Grace Jeanne",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Grace Jeanne",
    title: "Grace Jeanne | Photography in St. George, Utah",
    description: "Fine art photography and prints from St. George, Utah.",
    images: [
      {
        url: "/landing.jpg",
        width: 1200,
        height: 630,
        alt: "Photography in St. George, Utah",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grace Jeanne | Photography in St. George, Utah",
    description: "Photography in St. George, Utah.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

const mainLinks: NavbarLinkType[] = [
  { name: "Home", target: "/" },
  { name: "Galleries", target: "/galleries" },
  { name: "Shop", target: "/shop" },
  { name: "About", target: "/about" },
  { name: "Contact", target: "/contact" },
];

// Static hardcoded object — no user input, no XSS risk
const localBusinessSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Grace Jeanne Photography",
  description: "Fine art landscape photography and prints.",
  url: siteUrl,
  image: `${siteUrl}/landing.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "St. George",
    addressRegion: "UT",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "City",
    name: "St. George",
    sameAs: "https://en.wikipedia.org/wiki/St._George,_Utah",
  },
  sameAs: ["https://www.instagram.com/gracejeanne"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          // Safe: content is a static hardcoded object, not user input
          dangerouslySetInnerHTML={{ __html: localBusinessSchema }}
        />
      </head>
      <body
        className={`${displaySerif.variable} ${body.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <Navbar links={mainLinks} />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
