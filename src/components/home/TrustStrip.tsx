import Container from "../shared/Container";

export default function TrustStrip() {
  const stats = [
    "5000+ Customers",
    "4.8 Rating",
    "100+ Experts",
    "24/7 Support",
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
