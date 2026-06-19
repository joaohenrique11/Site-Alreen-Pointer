const metrics = [
  { value: "2021", label: "Barbeiro desde" },
  { value: "4.9", label: "Avaliacao media" },
  { value: "100%", label: "Hora marcada" },
];

export default function HeroSection() {
  return (
    <section className="hero-surface relative flex min-h-screen items-center pt-24 sm:pt-28">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 pb-20 pt-12 sm:px-6 sm:pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <p className="inline-flex rounded-full border border-gold/35 bg-ink/60 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.24em] text-gold backdrop-blur">
            Barbearia premium
          </p>
          <h1 className="mt-7 max-w-4xl font-title text-4xl leading-tight text-ivory sm:text-6xl lg:text-7xl">
            Corte preciso, barba alinhada e presenca de respeito.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-ivory/74 sm:text-lg">
            A Alreen Pointer combina tecnica, ambiente sobrio e atendimento com hora marcada para
            entregar uma experiencia sem atropelos.
          </p>

          <div className="mt-9 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <a
              href="#agendamento"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-7 text-sm font-extrabold uppercase tracking-[0.12em] text-ink shadow-gold transition hover:bg-brand-secondary/90"
            >
              Agende seu horario
            </a>
            <a
              href="#servicos"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/18 bg-graphite/70 px-7 text-sm font-extrabold uppercase tracking-[0.12em] text-ivory transition hover:border-gold/70 hover:text-gold"
            >
              Ver servicos
            </a>
          </div>
        </div>

        <div className="w-full">
          <div className="grid gap-4 rounded-lg border border-white/10 bg-ink/72 p-4 shadow-2xl shadow-black/30 backdrop-blur sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-md border border-white/10 bg-graphite/80 p-5 text-center"
              >
                <strong className="block font-title text-4xl text-gold">{metric.value}</strong>
                <span className="mt-2 block text-sm font-bold text-ivory/68">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
