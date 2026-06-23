import Container from "./Container";
import Button from "./Button";
import { FaWhatsapp } from "react-icons/fa";
import { Phone } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20">
      <Container>
        <div className="rounded-3xl bg-brand-navy p-10 md:p-16 text-white text-center">
          <h2 className="text-3xl md:text-5xl font-bold">Need Urgent Help?</h2>

          <p className="mt-4 text-gray-300">
            Contact AiroFox now for quick and reliable service.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <div className="flex gap-4 mt-8">
              <Button className="gap-2 bg-white  text-brand-navy hover:bg-brand-orange hover:text-white">
                <Phone size={18} />
                Book Now
              </Button>

              <Button variant="whatsapp" className="gap-2">
                <FaWhatsapp size={18} />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
