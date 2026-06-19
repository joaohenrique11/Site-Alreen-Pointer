"use client";

import { useState } from "react";
import Logo from "@/components/Logo";

const navItems = [
  { label: "Servicos", href: "#servicos" },
  { label: "Trabalhos", href: "#trabalhos" },
  { label: "Agendamento", href: "#agendamento" },
  { label: "Contato", href: "#contato" },
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2"
      className="h-5 w-5"
      aria-hidden="true"
    >
      {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/92 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:h-24 sm:px-6 lg:px-8">
        <a href="#" aria-label="Pagina inicial da Alreen Pointer" onClick={() => setOpen(false)}>
          <Logo markClassName="h-12 w-12 sm:h-14 sm:w-14" />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Menu principal">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-bold text-ivory/72 transition hover:text-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#agendamento"
          className="hidden min-h-12 items-center justify-center rounded-full bg-gold px-6 text-sm font-extrabold uppercase tracking-[0.12em] text-ink shadow-gold transition hover:bg-brand-secondary/90 md:inline-flex"
        >
          Agendar
        </a>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-graphite text-ivory md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-ink px-4 pb-5 pt-2 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2" aria-label="Menu mobile">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-base font-semibold text-ivory/85 hover:bg-white/5 hover:text-gold"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
