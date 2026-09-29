import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { FeaturedEvents } from "@/components/sections/FeaturedEvents";
import { Gallery } from "@/components/sections/Gallery";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { Contact } from "@/components/sections/Contact";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ParticleBackground } from "@/components/ui/ParticleBackground";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-transparent">
      <ParticleBackground />
      <CustomCursor />
      <Navbar />
      <main className="flex-1 flex flex-col w-full relative z-10 bg-transparent">
        <Hero />
        <Services />
        <FeaturedEvents />
        <Gallery />
        <WhyChooseUs />
        <Process />
        <About />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
