"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  ["Подія", "#about"],
  ["Спікери", "#speakers"],
  ["Квитки", "#tickets"],
  ["Локація", "#location"],
  ["FAQ", "#faq"],
];

export function LandingHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-accent)]/25 bg-black/55 backdrop-blur-xl">
      <nav className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="brand-mark"
          aria-label="Rave'era Group  Concerts & Marketing Agency"
          onClick={() => setIsOpen(false)}
        >
          <span>Rave&apos;era Group</span>
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
        <div className="mx-auto grid max-w-7xl gap-2 border-t border-white/10 px-4 py-4 md:hidden">
          {navItems.map(([label, href]) => (
            <a className="mobile-nav-link" href={href} key={href} onClick={() => setIsOpen(false)}>
              {label}
            </a>
          ))}
          <div className="mt-2 flex items-center gap-3">
            <span className="language-pill">UA</span>
            <Link className="button-primary min-h-11 flex-1 px-5 text-sm" href="/checkout" onClick={() => setIsOpen(false)}>
              Купити квиток
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
