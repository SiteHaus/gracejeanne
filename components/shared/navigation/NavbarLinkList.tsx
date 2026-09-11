"use client";

import Link from "next/link";
import { NavbarSearch } from "./NavbarSearch";
import { NavbarLinkType } from "./NavbarLink";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ArrowRight } from "lucide-react";

const clinicServiceLinks = [
  {
    label: "Primary Care",
    href: "/services#primary-care",
    description: "Comprehensive care for every age",
  },
  {
    label: "Dermatology",
    href: "/services#dermatology",
    description: "Skin checks, biopsies, and condition management",
  },
  {
    label: "Women's Health",
    href: "/services#womens-health",
    description: "From adolescence through menopause",
  },
  {
    label: "Men's Health",
    href: "/services#mens-health",
    description: "Strength, vitality, and testosterone management",
  },
  {
    label: "Birth Control",
    href: "/services#birth-control",
    description: "LARCs, IUDs, and contraceptive counseling",
  },
  {
    label: "Pediatric Care",
    href: "/pediatrics",
    description: "Well-child visits, immunizations, sports physicals",
  },
];

const specialtyServiceLinks = [
  {
    label: "Weight Loss",
    href: "/services/weight-loss",
    description: "Semaglutide and Tirzepatide programs",
  },
  {
    label: "Hormone Therapy",
    href: "/services/hormone-therapy",
    description: "Bioidentical HRT and pellet therapy",
  },
  {
    label: "NAD+ Infusions",
    href: "/services/nad-infusions",
    description: "Cellular energy and longevity support",
  },
  {
    label: "Vitamin Infusions",
    href: "/services/vitamin-infusions",
    description: "IV therapy for immunity and hydration",
  },
  {
    label: "PRP Injections",
    href: "/services/prp",
    description: "Joint pain relief and tissue regeneration",
  },
  {
    label: "Vitamin Injections",
    href: "/services#vitamin-injections",
    description: "IM injections for wellness and energy",
  },
];

export const NavbarLinkList = ({ links }: { links: NavbarLinkType[] }) => {
  return (
    <div className="flex items-center gap-2 px-5">
      <NavbarSearch />
      <NavigationMenu viewport={false}>
        <NavigationMenuList className="gap-0">
          {links.map((link) =>
            link.target === "/services" ? (
              <NavigationMenuItem key={link.target}>
                <NavigationMenuTrigger className="bg-transparent text-white text-sm font-medium hover:bg-white/10 hover:text-white focus:bg-white/10 data-open:bg-white/10 data-popup-open:bg-white/10 data-open:text-white h-auto px-3 py-2">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent className="left-auto right-0 min-w-[580px]">
                  <div className="p-5 grid grid-cols-2 gap-x-6">
                    {/* Clinic Services */}
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-primary mb-2 px-2">
                        Clinic Services
                      </p>
                      <div className="flex flex-col">
                        {clinicServiceLinks.map((s) => (
                          <Link
                            key={s.href}
                            href={s.href}
                            className="flex flex-col rounded-md px-2 py-2 hover:bg-muted transition-colors"
                          >
                            <span className="text-sm font-medium text-gray-900">
                              {s.label}
                            </span>
                            <span className="text-xs text-gray-500 mt-0.5">
                              {s.description}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Specialty Services */}
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-primary mb-2 px-2">
                        Specialty Services
                      </p>
                      <div className="flex flex-col">
                        {specialtyServiceLinks.map((s) => (
                          <Link
                            key={s.href}
                            href={s.href}
                            className="flex flex-col rounded-md px-2 py-2 hover:bg-muted transition-colors"
                          >
                            <span className="text-sm font-medium text-gray-900">
                              {s.label}
                            </span>
                            <span className="text-xs text-gray-500 mt-0.5">
                              {s.description}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer row */}
                  <div className="border-t border-gray-100 px-5 py-3">
                    <Link
                      href="/services"
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      View all services <ArrowRight className="h-3 w-3 inline" />
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem key={link.target}>
                <Link
                  href={link.target}
                  className="text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/10 transition-colors inline-flex items-center"
                >
                  {link.name}
                </Link>
              </NavigationMenuItem>
            )
          )}
        </NavigationMenuList>
      </NavigationMenu>
      <Link
        href="/contact#book-appointment"
        className="ml-2 whitespace-nowrap bg-white text-primary font-semibold text-sm py-1.5 px-4 rounded-full hover:bg-white/90 transition-colors"
      >
        Book Appointment
      </Link>
    </div>
  );
};
