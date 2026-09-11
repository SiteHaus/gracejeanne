import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navigation/Navbar";
import { NavbarLinkType } from "@/components/shared/navigation/NavbarLink";
import type { Metadata } from "next";
import { Funnel_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const funnel_display = Funnel_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-geist-sans", // maps to what your globals.css expects
});

const siteUrl = "https://gracejeanne.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Grace Jeanne | Photography in St. George, Utah",
    template: "%s | Grace Jeanne",
  },
  description:
    "Photgraphy in St. George, Utah. New patients always welcome. Call 435-668-3468.",
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
    title: "Grace jeanne | Photography in St. George, Utah",
    description: "Photography, collections, and more in St. George, Utah.",
    images: [
      {
        url: "/office.jpg",
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
  { name: "About Us", target: "/about" },
  { name: "Shop", target: "/shop" },
  { name: "Contact", target: "/contact" },
];

// Static hardcoded object — no user input, no XSS risk
const localBusinessSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Photography",
  name: "Grace Jeanne",
  url: siteUrl,
  telephone: "+1-435-688-0759",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2433 East 3995 South",
    addressLocality: "St. George",
    addressRegion: "UT",
    postalCode: "84790",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "City",
    name: "St. George",
    sameAs: "https://en.wikipedia.org/wiki/St._George,_Utah",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 37.0965,
    longitude: -113.5684,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  medicalSpecialty: [
    "Family Medicine",
    "Pediatrics",
    "Dermatology",
    "Women's Health",
  ],
  priceRange: "$$",
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
      <body className={`${funnel_display.className} antialiased`}>
        <Navbar links={mainLinks} />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
