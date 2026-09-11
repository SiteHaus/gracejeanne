"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function NavbarSearch() {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const pagefindReady = useRef(false);
  const router = useRouter();

  const handleResultClick = useCallback(
    (e: Event) => {
      const target = e.target as Element;

      const anchor =
        target.closest("a") ??
        target.closest(".pagefind-ui__result")?.querySelector("a");

      console.log("target:", target);
      console.log("anchor:", anchor);
      console.log("href:", anchor?.href);

      if (!anchor?.href) return;

      e.preventDefault();
      setFocused(false);
      inputRef.current?.blur();

      const url = new URL(anchor.href);
      const pathname = url.pathname.replace(/\.html$/, "");
      const hash = url.hash;

      router.push(pathname + hash);

      if (hash) {
        const isSamePage = pathname === window.location.pathname;
        setTimeout(
          () => {
            document
              .querySelector(hash)
              ?.scrollIntoView({ behavior: "smooth" });
          },
          isSamePage ? 0 : 500,
        );
      }
    },
    [router],
  );

  // Load the script once
  useEffect(() => {
    if (document.querySelector('script[src="/pagefind/pagefind-ui.js"]'))
      return;
    const script = document.createElement("script");
    script.src = "/pagefind/pagefind-ui.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Wire up Pagefind + listeners separately
  useEffect(() => {
    const init = () => {
      if (pagefindReady.current) return;
      pagefindReady.current = true;

      // @ts-ignore
      new window.PagefindUI({
        element: "#search",
        showSubResults: true,
        showImages: false,
        resetStyles: false,
      });

      setTimeout(() => {
        const input = document.querySelector<HTMLInputElement>(
          "#search .pagefind-ui__search-input",
        );

        if (input) {
          inputRef.current = input;
          input.addEventListener("focus", () => setFocused(true));
          input.addEventListener("blur", () => {
            setTimeout(() => {
              if (!wrapperRef.current?.contains(document.activeElement)) {
                setFocused(false);
              }
            }, 200);
          });
        }

        // Drawer is always present; use it for delegation
        document
          .querySelector("#search .pagefind-ui__drawer")
          ?.addEventListener("click", handleResultClick);
      }, 100);
    };

    // @ts-ignore
    if (window.PagefindUI) {
      init();
    } else {
      const script = document.querySelector(
        'script[src="/pagefind/pagefind-ui.js"]',
      );
      script?.addEventListener("load", init);
      return () => script?.removeEventListener("load", init);
    }
  }, [handleResultClick]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        inputRef.current?.blur();
        setFocused(false);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div
      id="search-wrapper"
      ref={wrapperRef}
      className={focused ? "focused" : ""}
    >
      <Search className="sw-icon" aria-hidden="true" />
      <div id="search" />
      <div className="sw-badge" aria-hidden="true">
        <kbd>⌘</kbd>
        <kbd>K</kbd>
      </div>
    </div>
  );
}
