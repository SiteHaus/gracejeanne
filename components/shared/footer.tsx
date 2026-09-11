"use client";

import { Check, Facebook, Instagram, Twitter } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleBookClick = () => {
    if (pathname === "/contact") {
      document
        .getElementById("book-appointment")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/contact#book-appointment");
    }
  };

  return (
    <footer className="w-full bg-primary text-white py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8">
        {/* Left Section */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-xl font-bold text-secondary">
            READY TO GET STARTED?
          </h2>
          <div>
            <h1 className="text-background text-3xl font-semibold">
              Book Your Appointment
            </h1>
            <p className="mt-2">
              Same-day and next-day appointments available. New patients always
              welcome.
            </p>

            <div className="flex flex-wrap gap-4 mt-5">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Check className="text-muted shrink-0" />
                <span>Same-day availability</span>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Check className="text-muted shrink-0" />
                <span>New patients welcome</span>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Check className="text-muted shrink-0" />
                <span>Most insurance accepted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col md:items-end lg:items-left items-center gap-4 mt-6 md:mt-0">
          <Button
            onClick={handleBookClick}
            variant="outline"
            className="border-white text-primary hover:bg-white hover:text-primary w-fit px-6 py-4 rounded-xl"
          >
            Book an Appointment
          </Button>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="text-secondary text-sm text-center">
          &copy; {new Date().getFullYear()} Grace Jeanne. All rights reserved.
        </div>

        <div className="flex gap-10">
          <a
            href="https://www.instagram.com/onehealth_southernutah/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram size={25} />
          </a>

          <a
            href="https://www.facebook.com/OneHeathSoUtah"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook size={25} />
          </a>

          <a
            href="https://x.com/OneHealth_Utah"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter size={25} />
          </a>
        </div>
        <div className="text-white/30 text-xs">
          Powered by{" "}
          <a
            href="https://sitehaus.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/60 transition-colors"
          >
            Sitehaus
          </a>
        </div>
      </div>
    </footer>
  );
};
