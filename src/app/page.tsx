import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import MediaGallery from "@/components/MediaGallery";
import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/ServicesSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">
        <HeroSection />
        <ServicesSection />
        <MediaGallery />
        <section id="agendamento" className="scroll-mt-24 bg-brand-primary py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div className="flex flex-col justify-center text-center lg:text-left">
              <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-gold">
                Agenda
              </p>
              <h2 className="mt-4 font-title text-3xl text-ivory sm:text-4xl lg:text-5xl">
                Agende seu horario sem choque de reservas
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-ivory/68 lg:mx-0">
                Ao escolher uma data, o sistema consulta o banco e bloqueia os horarios que ja
                foram reservados.
              </p>
              <div className="mt-8 rounded-lg border border-white/10 bg-graphite p-6 text-left">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">
                  Contato do barbeiro
                </p>
                <p className="mt-2 text-lg font-extrabold text-ivory">87 91787690</p>
              </div>
            </div>
            <BookingForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
