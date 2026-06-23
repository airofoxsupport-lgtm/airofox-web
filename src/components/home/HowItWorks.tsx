import Container from "../shared/Container";

const steps = [
  { number: "1", label: "Select a service", position: "bottom" },
  { number: "2", label: "Choose your time slot", position: "top" },
  { number: "3", label: "Confirm booking", position: "bottom" },
  { number: "4", label: "Track expert live", position: "top" },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <Container>
        {/* Badge */}
        <div className="inline-flex rounded-full bg-brand-orange px-5 py-2 text-sm font-semibold text-white">
          How It Works
        </div>

        {/* Heading */}
        <h2 className="mt-6 text-4xl md:text-6xl font-light text-brand-navy">
          How does this actually work?
        </h2>

        {/* Timeline */}
        <div className="relative mt-24 hidden md:block">
          {/* dashed connector */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-slate-400" />

          <div className="grid grid-cols-4 items-center relative z-10">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex flex-col items-center relative"
              >
                {step.position === "top" && (
                  <p className="mb-8 text-center max-w-[150px] text-brand-slate">
                    {step.label}
                  </p>
                )}

                <div className="h-20 w-20 rounded-full bg-brand-navy text-white flex items-center justify-center text-3xl font-bold shadow-lg">
                  {step.number}
                </div>

                {step.position === "bottom" && (
                  <p className="mt-8 text-center max-w-[150px] text-brand-slate">
                    {step.label}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile fallback */}
        <div className="md:hidden mt-12 space-y-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex items-center gap-4 rounded-2xl border p-4"
            >
              <div className="h-14 w-14 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold text-xl">
                {step.number}
              </div>

              <p className="font-medium text-brand-slate">{step.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
