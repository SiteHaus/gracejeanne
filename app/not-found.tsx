import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center px-6 py-32">
      <div className="text-center flex flex-col items-center gap-5">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          404
        </p>
        <h1 className="text-3xl md:text-4xl">Page not found</h1>
        <p className="text-foreground/75">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link
          href="/"
          className="mt-3 border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-7 py-3 text-xs uppercase tracking-[0.22em] transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
