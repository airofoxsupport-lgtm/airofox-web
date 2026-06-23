import Container from "../shared/Container";
import SectionHeading from "../shared/SectionHeading";

export default function WhyChooseUs() {
  const points = [
    "Verified Experts",
    "Affordable",
    "Fast Response",
    "Quality Guaranteed",
  ];

  return (
    <section className="py-20">
      <Container>
        <SectionHeading title="Why Choose AiroFox?" />
        <div className="grid md:grid-cols-2 gap-6">
          {points.map((point) => (
            <div key={point} className="p-6 rounded-xl border">
              {point}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

