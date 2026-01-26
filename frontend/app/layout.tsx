import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const playfair = Playfair_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Grace Jeanne Photography",
  description: "A unique look into Grace's Photography",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link
        href="https://fonts.googleapis.com/css2?family=Alex+Brush&display=swap"
        rel="stylesheet"
        precedence="default"
      />
      <body
        className={`${playfair.className} antialiased flex flex-col min-h-screen w-full bg-[url('/landing.jpg')] bg-cover bg-center bg-no-repeat`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
