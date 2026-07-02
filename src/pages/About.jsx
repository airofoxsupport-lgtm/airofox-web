import React from 'react';

export default function About() {
  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center py-20 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="inline-block bg-brand-orange text-white px-4 py-2 rounded-full text-sm font-semibold">
                About AiroFox
              </p>
              <h1 className="mt-6 text-5xl md:text-7xl font-bold text-brand-navy leading-tight">
                Fast, Reliable Home Services
              </h1>
              <p className="mt-6 text-lg text-brand-slate max-w-xl">
                AiroFox makes home service booking simple, quick, and stress-free. From AC repairs to plumbing, we connect you with trusted professionals.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                alt="AiroFox Logo"
                className="drop-shadow-2xl rounded-3xl max-w-xs md:max-w-md w-full object-cover"
                src="/logo.jpeg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="rounded-3xl bg-brand-navy text-white p-10 md:p-16 shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-bold">Our Story</h2>
            <p className="mt-6 text-gray-300 leading-relaxed text-lg">
              AiroFox started with one simple goal: finding reliable home services shouldn’t feel difficult.
            </p>
            <p className="mt-4 text-gray-300 leading-relaxed text-lg">
              Whether it’s AC repair, electrical work, or plumbing emergencies, we ensure quick response, verified professionals, and fair pricing.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gray-50 border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-center text-4xl md:text-5xl font-bold text-brand-navy">
            Why Choose AiroFox?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {/* Same Day Service */}
            <div className="rounded-3xl bg-brand-navy p-8 text-white text-center shadow-xl border border-white/10 hover:-translate-y-2 transition-all duration-300">
              <div className="w-20 h-20 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
                <div className="w-14 h-14 rounded-full bg-brand-orange/15 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-zap text-white"
                  >
                    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-semibold">Same Day Service</h3>
            </div>

            {/* Verified Experts */}
            <div className="rounded-3xl bg-brand-navy p-8 text-white text-center shadow-xl border border-white/10 hover:-translate-y-2 transition-all duration-300">
              <div className="w-20 h-20 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
                <div className="w-14 h-14 rounded-full bg-brand-orange/15 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-shield-check text-white"
                  >
                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-semibold">Verified Experts</h3>
            </div>

            {/* Transparent Pricing */}
            <div className="rounded-3xl bg-brand-navy p-8 text-white text-center shadow-xl border border-white/10 hover:-translate-y-2 transition-all duration-300">
              <div className="w-20 h-20 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
                <div className="w-14 h-14 rounded-full bg-brand-orange/15 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-badge-indian-rupee text-white"
                  >
                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
                    <path d="M8 8h8"></path>
                    <path d="M8 12h8"></path>
                    <path d="m13 17-5-1h1a4 4 0 0 0 0-8"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-semibold">Transparent Pricing</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
