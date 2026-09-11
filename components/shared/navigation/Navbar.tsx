import Link from "next/link";
import { NavbarDropdown } from "./NavbarDropdown";
import { NavbarLinkType } from "./NavbarLink";
import { NavbarLinkList } from "./NavbarLinkList";

interface NavbarProps {
  links: NavbarLinkType[];
}

export const Navbar = ({ links }: NavbarProps) => {
  return (
    <div className="bg-navbar sticky top-0 z-50 shadow-sm">
      <div className="w-full flex items-center justify-between px-6 py-2 max-w-7xl mx-auto">
        <Link href="/" className="flex gap-3 items-center">
          <img
            src="/sitehaus-logo.png"
            alt="Sitehaus Logo"
            className="h-12 w-auto rounded-lg"
          />
          <div className="flex flex-col">
            <span className="text-md lg:text-2xl text-background">
              GRACE JEANNE
            </span>
          </div>
        </Link>
        <div className="hidden lg:block">
          <NavbarLinkList links={links} />
        </div>
        <div className="lg:hidden">
          <NavbarDropdown links={links} />
        </div>
      </div>
    </div>
  );
};
