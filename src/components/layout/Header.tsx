/* eslint-disable @next/next/no-html-link-for-pages */
import Image from "next/image";
import Container from "../shared/Container";
import Button from "../shared/Button";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-brand-border">
      <Container className="h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.jpeg" alt="AiroFox" width={75} height={75} />
          <span className="font-bold text-xl text-brand-navy">AiroFox</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-brand-slate">
          <a href="/">Home</a>
          <a href="/services">Services</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>

        <div className="hidden md:block">
          <Button>Book Now</Button>
        </div>

        <MobileMenu />
      </Container>
    </header>
  );
}
