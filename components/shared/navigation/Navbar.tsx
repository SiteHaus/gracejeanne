import Link from "next/link";
import { NavbarDropdown } from "./NavbarDropdown";
import { NavbarLinkType } from "./NavbarLink";
import { NavbarLinkList } from "./NavbarLinkList";

interface NavbarProps {
  links: NavbarLinkType[];
}

const Wordmark = ({ compact = false }: { compact?: boolean }) => (
  <Link
    href="/"
    aria-label="Grace Jeanne Photography — home"
    className="flex flex-col items-center leading-none text-heading hover:opacity-80 transition-opacity"
  >
    <span
      className={`font-light uppercase ${
        compact
          ? "text-xl tracking-[0.25em]"
          : "text-4xl md:text-5xl tracking-[0.3em]"
      }`}
    >
      Grace Jeanne
    </span>
    <span
      className={`font-light uppercase text-heading/75 ${
        compact
          ? "mt-1 text-[10px] tracking-[0.38em]"
          : "mt-2 text-sm md:text-base tracking-[0.42em]"
      }`}
    >
      Fine Art Photography
    </span>
  </Link>
);

export const Navbar = ({ links }: NavbarProps) => {
  return (
    <header className="bg-navbar/80 relative z-50">
      {/* Desktop: centered wordmark over a hairline, nav below */}
      <div className="hidden lg:flex flex-col items-center max-w-6xl mx-auto px-6 pt-10">
        <Wordmark />
        <div className="w-full h-px bg-white/15 mt-8" />
        <NavbarLinkList links={links} />
      </div>

      {/* Mobile: compact wordmark + menu */}
      <div className="lg:hidden flex items-center justify-between px-5 py-5">
        <Wordmark compact />
        <NavbarDropdown links={links} />
      </div>
    </header>
  );
};
