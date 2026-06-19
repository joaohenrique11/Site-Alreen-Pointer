import { formatPrice, services } from "@/data/services";

export default function ServicesSection() {
  return (
    <section id="servicos" className="scroll-mt-24 bg-ink py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.28em] text-gold">
            Escolha o seu estilo
          </p>
          <h2 className="mt-4 font-title text-3xl text-ivory sm:text-4xl lg:text-5xl">
            Serviços com acabamento profissional
          </h2>
          <p className="mt-5 text-base leading-8 text-ivory/68">
            Blocos centralizados, espaçamento amplo e grid responsivo para evitar qualquer desalinhamento em telas pequenas.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.name}
              className="rounded-lg border border-white/10 bg-graphite p-6 shadow-xl shadow-black/20"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-title text-2xl text-ivory">{service.name}</h3>
                <span className="shrink-0 rounded-full bg-gold/12 px-3 py-1 text-sm font-extrabold text-gold">
                  {formatPrice(service.price)}
                </span>
              </div>
              <p className="mt-5 leading-7 text-ivory/66">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
