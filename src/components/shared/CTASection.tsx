"use client";
import Link from "next/link";
import Container from "./Container";
import Button from "./Button";
import { FaWhatsapp } from "react-icons/fa";
import { Phone } from "lucide-react";
import { useProtectedAction } from '@/hooks/useProtectedAction';

export default function CTASection() {
  const { handleProtectedAction } = useProtectedAction();

  const message = encodeURIComponent(
    "Hi AiroFox, I need help with home services.",
  );
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
              <Link href="/book" onClick={(e) => handleProtectedAction(e, 'book')}>
                <Button className="gap-2 bg-white  text-brand-navy hover:bg-brand-orange hover:text-white">
                  <Phone size={18} />
                  Book Now
                </Button>
              </Link>

              <a
                href="https://wa.me/919326065836"
                onClick={(e) => handleProtectedAction(e, 'whatsapp', 'home services')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" className="gap-2">
                  <FaWhatsapp size={18} />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
