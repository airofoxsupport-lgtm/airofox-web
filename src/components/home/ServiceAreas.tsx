import Container from "../shared/Container";

export default function ServiceAreas() {
  const areas = ["Dadar", "Parel", "Lalbaug", "Matunga"];

  return (
    <section className="py-20 bg-gray-50 ">
      <Container>
        <div className="flex flex-wrap gap-4 align-center justify-center">
          {areas.map((area) => (
            <span
              key={area}
              className="px-5 py-2 rounded-full bg-brand-orange shadow text-navy font-semibold"
            >
              {area}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
