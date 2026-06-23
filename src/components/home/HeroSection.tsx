import Container from "../shared/Container";
import Button from "../shared/Button";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { Phone } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-orange-50">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-brand-navy leading-tight">
              Fast Home Services at Your Doorstep
            </h1>

            <p className="mt-6 text-lg text-brand-slate">
              AC repair, cleaning, plumbing and more.
            </p>

            <div className="flex gap-4 mt-8">
              <Button className="gap-2">
                <Phone size={18} />
                Book Now
              </Button>

              <Button variant="whatsapp" className="gap-2">
                <FaWhatsapp size={18} />
                WhatsApp
              </Button>
            </div>
          </div>

          <div className="relative h-[356px] rounded-3xl bg-brand-navy/10 overflow-hidden">
            <Image
              src="/HeroImg.jpg"
              alt="Hero Image"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
