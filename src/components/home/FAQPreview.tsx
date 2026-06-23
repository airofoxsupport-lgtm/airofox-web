import Container from "../shared/Container";
import SectionHeading from "../shared/SectionHeading";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is AiroFox?",
    answer:
      "AiroFox is a trusted home-service platform connecting you with verified local professionals for home appliance repairs, electrical work, plumbing and more. We make booking fast, reliable, transparent, and hassle-free.",
  },
  {
    question: "How can I book a service?",
    answer:
      "Choose your service, select a date and time, enter your location, and confirm. A verified professional will be assigned, and you'll receive updates until the job is completed.",
  },
  {
    question: "What services does AiroFox provide?",
    answer:
      "AiroFox offers home appliance repairs, plumbing, electrical work, AC servicing and many other professional home services.",
  },
  {
    question: "Can I track the service professional in real time?",
    answer:
      "Yes. You can track your assigned professional in real time, receive arrival updates, and stay informed from booking until the service is completed.",
  },
  {
    question: "Are AiroFox prices transparent?",
    answer:
      "Yes. We provide upfront pricing with no hidden charges. If additional work is needed, you'll be informed and asked for approval before it begins. You can also download a detailed digital invoice after your service for complete transparency and easy record-keeping.",
  },
  {
    question: "Are AiroFox professionals verified?",
    answer:
      "Absolutely. Every AiroFox professional undergoes identity verification, document checks, and skill assessments to ensure safe, reliable, and professional service.",
  },
  {
    question: "How does AiroFox ensure service quality?",
    answer:
      "We ensure quality through verified professionals, customer ratings, regular performance reviews, and responsive support—delivering reliable, consistent service you can trust every time.",
  },
];

export default function FAQPreview() {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Everything you need to know before booking"
        />

        <div className="max-w-4xl mx-auto mt-10">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border rounded-2xl bg-white px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left font-semibold text-brand-navy hover:no-underline">
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent className="text-brand-slate pb-4 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  );
}
