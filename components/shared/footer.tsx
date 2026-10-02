import Link from "next/link";
import { Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full bg-surface text-foreground mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-3">
        {/* About */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg">Grace Jeanne</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Fine art landscape photography from Southern Utah and beyond,
            printed to hang in your home or business.
          </p>
        </div>

        {/* Explore */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg">Explore</h3>
          <ul className="flex flex-col gap-2 text-sm">
            {[
              { href: "/galleries", label: "Galleries" },
              { href: "/shop", label: "Shop Prints" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg">Follow</h3>
          <a
            href="https://www.instagram.com/gracejeanne"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
          >
            <Instagram size={18} strokeWidth={1.5} />
            Instagram
          </a>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>
            All material &copy; {new Date().getFullYear()} by Grace Jeanne. All
            rights reserved.
          </p>
          <p className="text-white/30">
            Powered by{" "}
            <a
              href="https://sitehaus.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition-colors"
            >
              Sitehaus
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
