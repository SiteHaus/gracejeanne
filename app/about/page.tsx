import type { Metadata } from "next";
import Link from "next/link";

// PLACEHOLDER COPY — replace the bio, process notes and portrait with
// Grace's own words and photo before launch.

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Grace Jeanne, a landscape photographer based in St. George, Utah.",
  alternates: {
    canonical: "https://gracejeanne.com/about",
  },
  openGraph: {
    title: "About | Grace Jeanne",
    description: "Meet Grace Jeanne, a landscape photographer in St. George, Utah.",
    url: "https://gracejeanne.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="w-full">
      <header className="max-w-3xl mx-auto px-6 pt-14 pb-12 md:pt-20 md:pb-16 text-center">
        <h1 className="text-3xl md:text-4xl">About the Artist</h1>
      </header>

      {/* ── Portrait + bio ── */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-[2fr_3fr] gap-12 md:gap-16 items-start">
        {/* PLACEHOLDER portrait — replace this div with:
            <Image src="/grace-portrait.jpg" alt="Portrait of Grace Jeanne" fill
              className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" /> */}
        <div className="relative aspect-[4/5] overflow-hidden bg-card shadow-[0_10px_30px_rgba(0,0,0,0.45)] flex items-center justify-center">
          <div className="absolute inset-6 border border-accent-gold/25" />
          <span className="text-xs uppercase tracking-[0.3em] text-accent-gold/60">
            Portrait
          </span>
        </div>

        <div className="flex flex-col gap-6 text-base md:text-lg leading-relaxed text-foreground/85">
          <h2 className="text-2xl md:text-3xl">Grace Jeanne</h2>
          <p>
            Grace is a landscape photographer based in St. George, Utah. Her
            work follows the light across the American Southwest and beyond,
            from red rock canyons at dawn to alpine ridges in the last minutes
            of sunset.
          </p>
          <p>
            She returns to the same places again and again, waiting for the
            weather and the season to line up, so that each photograph feels
            like the place itself rather than a passing snapshot.
          </p>
          <p>
            When she isn&apos;t behind the camera, you can find her scouting new
            trails, planning the next trip, or in the studio preparing prints
            for collectors.
          </p>
        </div>
      </section>

      {/* ── Approach ── */}
      <section className="bg-surface border-y border-border py-20 px-6">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-12 text-center">
          {[
            {
              title: "In the Field",
              body: "Every image is made on location, often after several visits to catch the right light.",
            },
            {
              title: "In the Studio",
              body: "Photographs are finished with care to stay true to what the scene felt like in person.",
            },
            {
              title: "On Your Wall",
              body: "Prints are made to order and sized to fit your home, office or gallery space.",
            },
          ].map((item) => (
            <div key={item.title} className="flex flex-col items-center gap-3">
              <h3 className="text-lg tracking-wider">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center flex flex-col items-center gap-6">
        <h2 className="text-2xl md:text-3xl">See the work</h2>
        <p className="text-foreground/80 leading-relaxed">
          Browse the galleries, or get in touch about prints, commissions and
          licensing.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link
            href="/galleries"
            className="border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-7 py-3 text-xs uppercase tracking-[0.22em] transition-colors"
          >
            View Galleries
          </Link>
          <Link
            href="/contact"
            className="border border-white/25 text-white/85 hover:border-white hover:text-white px-7 py-3 text-xs uppercase tracking-[0.22em] transition-colors"
          >
            Contact
          </Link>
        </div>
      </section>
    </div>
  );
}
