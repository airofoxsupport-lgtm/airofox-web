"use client";
import React, { useEffect, useRef, Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProtectedAction } from '@/hooks/useProtectedAction';
import { detailedServices } from '@/lib/servicesPricing';

function ServicesContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service');
  const { handleProtectedAction } = useProtectedAction();
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [modalSearchQuery, setModalSearchQuery] = useState('');

  const closeModal = () => {
    setSelectedCategory(null);
    setModalSearchQuery('');
  };


  const acRef = useRef<HTMLDivElement>(null);
  const electricianRef = useRef<HTMLDivElement>(null);
  const plumberRef = useRef<HTMLDivElement>(null);
  const tvRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (serviceParam) {
      let targetRef: React.RefObject<HTMLDivElement | null> | null = null;
      if (serviceParam === 'ac-repair' || serviceParam === 'ac') {
        targetRef = acRef;
      } else if (serviceParam === 'electrician' || serviceParam === 'electrical') {
        targetRef = electricianRef;
      } else if (serviceParam === 'plumber' || serviceParam === 'plumbing') {
        targetRef = plumberRef;
      } else if (serviceParam === 'general-repairs') {
        targetRef = tvRef;
      }

      if (targetRef && targetRef.current) {
        setTimeout(() => {
          targetRef!.current!.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  }, [serviceParam]);

  const servicesData = detailedServices.map(cat => {
    // Determine which ref to use based on id
    let ref = null;
    if (cat.id === 'ac') ref = acRef;
    if (cat.id === 'electrical') ref = electricianRef;
    if (cat.id === 'plumbing') ref = plumberRef;
    if (cat.id === 'general-repairs') ref = tvRef;

    // Default descriptions if none exist
    let desc = `Professional and reliable ${cat.category.toLowerCase()} at your doorstep.`;
    if (cat.id === 'ac') desc = 'Fast diagnostics and repairs for all types of ACs.';
    if (cat.id === 'electrical') desc = 'Safe and professional electrical solutions.';
    if (cat.id === 'plumbing') desc = 'From minor leaks to major plumbing fixes.';
    if (cat.id === 'general-repairs') desc = 'Expert TV mounting and uninstallation services.';
    
    // Extract tags from subcategories
    const tags = cat.subcategories.slice(0, 4).map(sub => sub.name);

    return {
      id: cat.id,
      ref,
      title: cat.category,
      desc,
      img: cat.image?.default?.src || cat.image?.src || cat.image || '/services/ac.jpeg',
      tags,
      rawCategory: cat,
    };
  });

  return (
    <div className="flex-grow">
      {/* Hero Header */}
      <section className="py-24 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <p className="inline-block bg-brand-orange text-white px-4 py-2 rounded-full text-sm font-semibold">
            Our Services
          </p>
          <h1 className="mt-6 text-5xl md:text-7xl font-bold text-brand-navy">
            Professional Home Services
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-brand-slate">
            Quick, reliable and affordable repairs at your doorstep.
          </p>
        </div>
      </section>

      {/* Sticky Quick Nav */}
      <div className="sticky top-[64px] z-40 bg-white/80 dark:bg-brand-navy/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-3 md:py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-3 md:gap-4 overflow-x-auto no-scrollbar pb-1">
            {servicesData.map((service) => {
              let icon = '🔧';
              if (service.id === 'ac') icon = '❄️';
              if (service.id === 'plumbing') icon = '🚰';
              if (service.id === 'electrical') icon = '⚡';
              if (service.id === 'general-repairs') icon = '📺';

              return (
                <button
                  key={service.id}
                  onClick={() => {
                    if (service.ref && service.ref.current) {
                      const yOffset = -140; // Offset for header + sticky nav
                      const element = service.ref.current;
                      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}
                  className="whitespace-nowrap inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-brand-orange hover:text-white dark:hover:bg-brand-orange text-brand-navy dark:text-slate-200 font-semibold text-sm transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-brand-orange dark:hover:border-brand-orange"
                >
                  <span>{icon}</span>
                  {service.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Services List Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 space-y-12">
          {servicesData.map((service) => {
            const isHighlighted = serviceParam === service.id || (serviceParam === 'ac' && service.id === 'ac-repair');
            return (
              <div
                key={service.id}
                ref={service.ref}
                className={`grid md:grid-cols-2 gap-8 items-center rounded-3xl p-6 md:p-10 transition-all duration-500 border-2 ${
                  isHighlighted
                    ? 'border-brand-orange shadow-[0_0_30px_rgba(255,122,0,0.15)] scale-[1.01] bg-brand-navy'
                    : 'border-transparent hover:shadow-2xl bg-brand-navy'
                }`}
              >
                {/* Image */}
                <div className="relative w-full h-[250px] md:h-[350px] rounded-2xl overflow-hidden shadow-lg">
                  <img
                    alt={service.title}
                    src={service.img}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col justify-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    {service.title}
                  </h2>
                  <p className="mt-3 text-gray-300 text-base md:text-lg">
                    {service.desc}
                  </p>

                  {/* Tags */}
                  <div className="grid grid-cols-2 gap-3 mt-8">
                    {service.tags.map((tag) => (
                      <div
                        key={tag}
                        role="button"
                        onClick={() => setSelectedCategory(service.rawCategory)}
                        className="px-4 py-3 rounded-xl bg-white/10 text-sm md:text-base font-medium text-white hover:bg-brand-orange transition-all duration-300 text-left cursor-pointer"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex items-center gap-4 mt-10 flex-wrap">
                    <div
                      role="button"
                      onClick={() => setSelectedCategory(service.rawCategory)}
                      className="inline-flex items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 bg-white/10 text-white hover:bg-brand-orange shadow-md gap-2 cursor-pointer"
                      style={{ padding: '14px 28px' }}
                    >
                      View Pricing
                    </div>
                    <a
                      href="tel:+919326065836"
                      onClick={(e) => handleProtectedAction(e, 'call', service.title)}
                      className="inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300 gap-2 bg-transparent text-white hover:bg-white/10"
                      style={{ padding: '14px 28px' }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-phone"
                      >
                        <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
                      </svg>
                      Call Now
                    </a>
                    <a
                      href="https://wa.me/919326065836"
                      onClick={(e) => handleProtectedAction(e, 'whatsapp', service.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300 bg-green-500 text-white hover:bg-green-600 hover:-translate-y-0.5 shadow-md gap-2"
                      style={{ padding: '14px 28px' }}
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 448 512"
                        height="18"
                        width="18"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                      </svg>
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Specs / Why Choose Us Section */}
      <section className="py-24 bg-gray-50 border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
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
                    className="lucide lucide-zap text-white animate-pulse"
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

      {/* Pricing Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm transition-opacity"
            onClick={closeModal}
          ></div>
          
          {/* Modal Content */}
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 md:p-8 border-b border-brand-border">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-brand-navy">
                    {selectedCategory.category} Pricing
                  </h2>
                  <p className="text-brand-slate mt-1">Detailed breakdown of services and variants.</p>
                </div>
                <button 
                  onClick={closeModal}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>

              {/* Modal Search */}
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <input
                  type="text"
                  placeholder={`Search in ${selectedCategory.category}...`}
                  value={modalSearchQuery}
                  onChange={(e) => setModalSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-orange outline-none transition-all placeholder:text-slate-400 text-brand-navy"
                />
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 overflow-y-auto bg-slate-50 flex-grow">
              <div className="space-y-10">
                {(() => {
                  let filtered = selectedCategory.subcategories;
                  if (modalSearchQuery.trim()) {
                    const q = modalSearchQuery.toLowerCase();
                    filtered = selectedCategory.subcategories.map((sub: any) => {
                      if (sub.name.toLowerCase().includes(q)) return sub;
                      const matchingServices = sub.services.map((srv: any) => {
                        if (srv.name.toLowerCase().includes(q)) return srv;
                        const matchingVariants = srv.variants.filter((v: any) => v.name.toLowerCase().includes(q));
                        if (matchingVariants.length > 0) return { ...srv, variants: matchingVariants };
                        return null;
                      }).filter(Boolean);
                      if (matchingServices.length > 0) return { ...sub, services: matchingServices };
                      return null;
                    }).filter(Boolean);
                  }

                  if (filtered.length === 0) {
                    return (
                      <div className="text-center py-12">
                        <p className="text-brand-slate text-lg">No services found matching "{modalSearchQuery}"</p>
                      </div>
                    );
                  }

                  return filtered.map((sub: any, subIdx: number) => (
                  <div key={subIdx} className="bg-white rounded-2xl p-6 shadow-sm border border-brand-border">
                    <h3 className="text-xl font-bold text-brand-orange mb-6 flex items-center gap-2">
                      <span className="w-2 h-6 bg-brand-orange rounded-full"></span>
                      {sub.name}
                    </h3>
                    
                    <div className="space-y-8">
                      {sub.services.map((srv: any, srvIdx: number) => (
                        <div key={srvIdx} className="overflow-hidden rounded-xl border border-slate-200">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-brand-navy text-white">
                                <th className="p-4 font-semibold text-sm md:text-base w-3/4">{srv.name}</th>
                                <th className="p-4 font-semibold text-sm md:text-base text-right">Price (₹)</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {srv.variants.map((variant: any, varIdx: number) => (
                                <tr key={varIdx} className="hover:bg-slate-50 transition-colors">
                                  <td className="p-4 text-brand-navy font-medium text-sm md:text-base">
                                    {variant.name}
                                  </td>
                                  <td className="p-4 text-brand-slate font-bold text-right">
                                    ₹{variant.price}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ))}
                    </div>
                  </div>
                ))})()}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-brand-border bg-white flex justify-end">
              <button
                onClick={closeModal}
                className="px-6 py-3 bg-brand-navy text-white rounded-xl font-bold hover:bg-brand-navy/90 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Services() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServicesContent />
    </Suspense>
  )
}
