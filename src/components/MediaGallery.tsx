const placeholders = ["Foto 1", "Foto 2", "Foto 3"];

export default function MediaGallery() {
  return (
    <section id="trabalhos" className="scroll-mt-24 bg-brand-primary py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-gold">
            Nossos Trabalhos
          </p>
          <h2 className="mt-4 font-title text-3xl text-ivory sm:text-4xl lg:text-5xl">
            Galeria em preparacao
          </h2>
          <p className="mt-5 text-base leading-8 text-ivory/68">
            Este espaco esta reservado para fotos reais dos cortes e acabamentos da barbearia.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {placeholders.map((label) => (
            <div
              key={label}
              className="flex aspect-[4/3] items-center justify-center rounded-lg border border-dashed border-gold/30 bg-graphite/70 text-sm font-extrabold uppercase tracking-[0.18em] text-ivory/45"
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
