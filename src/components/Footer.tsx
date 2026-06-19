import Logo from "@/components/Logo";

const links = [
  { label: "Serviços", href: "#servicos" },
  { label: "Trabalhos", href: "#trabalhos" },
  { label: "Agendamento", href: "#agendamento" },
  { label: "Contato", href: "#contato" },
];

export default function Footer() {
  return (
    <footer id="contato" className="border-t border-white/10 bg-ink py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 text-center sm:px-6 lg:px-8">
        <Logo className="justify-center text-gold" markClassName="h-14 w-14" />

        <nav className="flex w-full flex-col items-center justify-center gap-4 min-[420px]:flex-row min-[420px]:flex-wrap sm:gap-7">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-bold text-ivory/68 transition hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="map-frame h-72 w-full overflow-hidden rounded-lg border border-white/10 bg-graphite">
          <iframe
            title="Mapa da Alreen Pointer"
            src="https://www.google.com/maps?q=Centro%20Sao%20Paulo%20SP&output=embed"
            className="h-full w-full"
            loading="lazy"
          />
        </div>

        <p className="text-sm leading-7 text-ivory/55">© 2026 Barbearia. Barbeiro desde 2021.</p>
      </div>
    </footer>
  );
}
