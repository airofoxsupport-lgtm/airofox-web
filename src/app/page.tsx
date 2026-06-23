import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import HeroSection from "@/components/home/HeroSection";
import TrustStrip from "@/components/home/TrustStrip";
import MostBooked from "@/components/home/MostBooked";
import Categories from "@/components/home/Categories";
// import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";
import Deals from "@/components/home/Deals";
// import Testimonials from "@/components/home/Testimonials";
import ServiceAreas from "@/components/home/ServiceAreas";
import FAQPreview from "@/components/home/FAQPreview";
import CTASection from "@/components/shared/CTASection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <TrustStrip />
        <MostBooked />
        <Categories />
        {/* <WhyChooseUs /> */}
        <HowItWorks />
        <Deals />
        {/* <Testimonials /> */}
        <ServiceAreas />
        <FAQPreview />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
