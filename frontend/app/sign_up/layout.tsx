import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sign Up",
  description: "A unique look into Grace's Photography",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.className} antialiased flex flex-col min-h-screen w-full bg-[url('/landing.jpg')] bg-cover bg-center bg-no-repeat`}
      >
        {children}
      </body>
    </html>
  );
}
