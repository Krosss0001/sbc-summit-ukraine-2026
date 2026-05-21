"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  ["Подія", "#about"],
  ["Спікери", "#speakers"],
  ["Квитки", "#tickets"],
  ["Локація", "#location"],
  ["FAQ", "#faq"],
];

export function LandingHeader() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-[var(--color-accent)]/25 bg-black/55 backdrop-blur-xl">
      <nav className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="brand-mark"
          aria-label="RAVE'ERA GROUP"
          onClick={() => setIsOpen(false)}
        >
          <span>RAVE&apos;ERA GROUP</span>
          <small>Concerts &amp; Marketing Agency</small>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {navItems.map(([label, href]) => (
            <a className="nav-link text-sm text-white/72" href={href} key={href}>
              {label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <span className="language-pill">UA</span>
          <Link className="button-primary h-11 px-5 text-sm" href="/checkout">
            Купити квиток
          </Link>
        </div>

        <button
          type="button"
          className="mobile-menu-button md:hidden"
          aria-label={isOpen ? "Закрити меню" : "Відкрити меню"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {isOpen ? (
        <div className="mobile-nav-overlay md:hidden" role="dialog" aria-modal="true" aria-label="Мобільне меню">
          <div className="mobile-nav-panel">
            <div className="mobile-nav-meta">
              <span className="language-pill">UA</span>
              <span>SBC Summit Ukraine 2026</span>
            </div>
            <div className="mobile-nav-list">
              {navItems.map(([label, href]) => (
                <a className="mobile-nav-link" href={href} key={href} onClick={() => setIsOpen(false)}>
                  {label}
                </a>
              ))}
            </div>
            <Link className="button-primary mobile-nav-cta" href="/checkout" onClick={() => setIsOpen(false)}>
              Купити квиток
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
