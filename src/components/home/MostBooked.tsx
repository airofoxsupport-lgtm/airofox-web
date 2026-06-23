import Container from "../shared/Container";
import SectionHeading from "../shared/SectionHeading";
import { Snowflake, Wrench, Zap, Droplets } from "lucide-react";

const services = [
  {
    title: "AC Repair",
    desc: "Quick cooling fixes & servicing",
    price: "Starts ₹499",
    icon: Snowflake,
  },
  {
    title: "Plumbing",
    desc: "Leak & pipe repairs",
    price: "Starts ₹399",
    icon: Droplets,
  },
  {
    title: "Electrician",
    desc: "Wiring & appliance fixes",
    price: "Starts ₹299",
    icon: Zap,
  },
  {
    title: "General Repair",
    desc: "Trusted expert support",
    price: "Starts ₹349",
    icon: Wrench,
  },
];

export default function MostBooked() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          title="Most Booked Services"
          subtitle="Popular services our customers trust every day"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group rounded-3xl bg-brand-navy p-6 text-white shadow-xl border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-orange flex items-center justify-center">
                  <Icon size={30} />
                </div>

                <h3 className="mt-6 text-xl font-semibold">{service.title}</h3>

                <p className="mt-3 text-gray-300">{service.desc}</p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-brand-orange font-bold">
                    {service.price}
                  </span>

                  <span className="text-sm text-gray-400 group-hover:text-white transition">
                    →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
