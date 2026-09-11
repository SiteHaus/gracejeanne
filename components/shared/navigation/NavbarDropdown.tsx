"use client";

import { NavbarLinkType } from "./NavbarLink";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

export const NavbarDropdown = ({ links }: { links: NavbarLinkType[] }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Menu size={28} className="text-white cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-navbar border-border w-64">
        {links.map((link) => (
          <DropdownMenuItem key={link.target} asChild>
            <Link
              href={link.target}
              className="text-white text-base font-medium hover:text-white cursor-pointer px-4 py-3"
            >
              {link.name}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem asChild>
          <Link
            href="/contact#book-appointment"
            className="mx-2 my-1 justify-center bg-white text-primary font-semibold text-sm py-2.5 rounded-full hover:bg-white/90 transition-colors cursor-pointer"
          >
            Book Appointment
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
