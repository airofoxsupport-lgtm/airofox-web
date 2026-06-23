import Container from "../shared/Container";
import SectionHeading from "../shared/SectionHeading";

export default function Categories() {
  const categories = ["AC & Appliances Repair", "Electrician", "Plumber"];

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <SectionHeading title="Categories" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat}
              className="rounded-2xl bg-brand-navy p-8 shadow text-center text-white"
            >
              {cat}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
