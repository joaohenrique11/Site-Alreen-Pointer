const works = [
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1593702288056-7927b442d0bf?auto=format&fit=crop&w=900&q=82",
];

export default function GallerySection() {
  return (
    <section id="trabalhos" className="bg-brand-primary py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.28em] text-gold">
            Nossos trabalhos
          </p>
          <h2 className="mt-4 font-title text-3xl text-ivory sm:text-4xl lg:text-5xl">
            Linhas limpas, presença forte
          </h2>
          <p className="mt-5 text-base leading-8 text-ivory/68">
            Uma galeria simples e responsiva para reforçar a identidade escura e dourada sem quebrar o fluxo vertical.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((src, index) => (
            <figure key={src} className="overflow-hidden rounded-lg border border-white/10 bg-graphite">
              <img
                src={src}
                alt={`Trabalho da Alreen Pointer ${index + 1}`}
                className="h-72 w-full object-cover transition duration-500 hover:scale-105"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
