"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarSearch } from "./NavbarSearch";
import { NavbarLinkType } from "./NavbarLink";

export const isActive = (pathname: string, target: string) =>
  target === "/" ? pathname === "/" : pathname.startsWith(target);

export const NavbarLinkList = ({ links }: { links: NavbarLinkType[] }) => {
  const pathname = usePathname();

  return (
    <nav className="w-full flex items-center justify-center gap-10 py-5">
      <ul className="flex items-center gap-10">
        {links.map((link) => {
          const active = isActive(pathname, link.target);
          return (
            <li key={link.target}>
              <Link
                href={link.target}
                aria-current={active ? "page" : undefined}
                className={`text-sm uppercase tracking-[0.18em] transition-colors ${
                  active ? "text-primary" : "text-navlink hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <NavbarSearch />
    </nav>
  );
};
