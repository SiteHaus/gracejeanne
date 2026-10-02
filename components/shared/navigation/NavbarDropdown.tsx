"use client";

import { NavbarLinkType } from "./NavbarLink";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { isActive } from "./NavbarLinkList";

export const NavbarDropdown = ({ links }: { links: NavbarLinkType[] }) => {
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open menu"
        className="text-white/85 hover:text-white transition-colors"
      >
        <Menu size={26} strokeWidth={1.5} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-surface border-border w-60 py-2"
      >
        {links.map((link) => (
          <DropdownMenuItem key={link.target} asChild>
            <Link
              href={link.target}
              className={`text-sm uppercase tracking-[0.18em] cursor-pointer px-4 py-3 ${
                isActive(pathname, link.target)
                  ? "text-primary"
                  : "text-navlink hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
