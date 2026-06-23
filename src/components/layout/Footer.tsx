import Container from "../shared/Container";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white py-16">
      <Container>
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/logo.jpeg" alt="logo" width={50} height={50} />
              <h3 className="text-2xl font-bold">AiroFox</h3>
            </div>

            <p className="mt-4 text-gray-300">
              Fast & reliable home services at your doorstep.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Home</li>
              <li>Services</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Cleaning</li>
              <li>Plumbing</li>
              <li>AC Repair</li>
              <li>Electrician</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>+91 XXXXX XXXXX</li>
              <li>contact@airofox.com</li>
              <li>Mumbai, India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-gray-400">
          © 2026 AiroFox. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
