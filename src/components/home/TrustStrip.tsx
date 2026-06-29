import Container from "../shared/Container";

export default function TrustStrip() {
  const stats = [
    "Faster Arrival",
    "Expert Technicians",
    "Transparent Pricing",
  
  ];

  return (
    <section className="py-8 border-y">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center font-semibold">
          {stats.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>
      </Container>
    </section>
  );
}
