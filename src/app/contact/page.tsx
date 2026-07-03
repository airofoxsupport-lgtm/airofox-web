"use client";
import React, { useState } from 'react';
import { useProtectedAction } from '@/hooks/useProtectedAction';

export default function Contact() {
  const { handleProtectedAction } = useProtectedAction();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all required fields (Name, Phone, and Message).' });
      return;
    }
    
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    // Simulate sending message
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully. We will get back to you shortly.' });
      setFormData({ name: '', phone: '', service: '', message: '' });
    }, 1500);
  };

  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <p className="inline-block rounded-full bg-brand-orange px-4 py-2 text-sm font-semibold text-white">
              Contact Us
            </p>
            <h1 className="mt-6 text-5xl md:text-7xl font-bold text-brand-navy">
              Need Help? Let’s Talk.
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-brand-slate">
              Reach out via call, WhatsApp, or email. We’re here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Action Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Call */}
            <a href="tel:+919326065836" onClick={(e) => handleProtectedAction(e, 'call')} className="block group">
              <div className="rounded-3xl bg-brand-navy p-8 text-white shadow-xl text-center hover:-translate-y-1 transition-all duration-300 border border-white/5">
                <div className="w-16 h-16 rounded-full bg-brand-orange mx-auto flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
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
                </div>
                <h3 className="text-2xl font-semibold">Call Us</h3>
                <p className="mt-3 text-gray-300 font-medium">+91 9326065836</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919326065836"
              onClick={(e) => handleProtectedAction(e, 'whatsapp', 'home services')}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="rounded-3xl bg-brand-navy p-8 text-white shadow-xl text-center hover:-translate-y-1 transition-all duration-300 border border-white/5">
                <div className="w-16 h-16 rounded-full bg-brand-orange mx-auto flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    height="28"
                    width="28"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold">WhatsApp</h3>
                <p className="mt-3 text-gray-300 font-medium">Instant Support</p>
              </div>
            </a>

            {/* Email */}
            <a href="mailto:support@airofox.com" className="block group">
              <div className="rounded-3xl bg-brand-navy p-8 text-white shadow-xl text-center hover:-translate-y-1 transition-all duration-300 border border-white/5">
                <div className="w-16 h-16 rounded-full bg-brand-orange mx-auto flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-mail"
                  >
                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold">Email Us</h3>
                <p className="mt-3 text-gray-300 font-medium">support@airofox.com</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Form & Info Section */}
      <section className="pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="rounded-3xl bg-white shadow-xl border border-brand-border p-8">
              <h2 className="text-3xl font-bold text-brand-navy">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name *"
                    className="w-full rounded-xl border border-brand-border p-4 outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/20 transition-all"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number *"
                    className="w-full rounded-xl border border-brand-border p-4 outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/20 transition-all"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    placeholder="Service Needed"
                    className="w-full rounded-xl border border-brand-border p-4 outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/20 transition-all"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Message *"
                    rows={5}
                    className="w-full rounded-xl border border-brand-border p-4 outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/20 transition-all"
                  ></textarea>
                </div>

                {status.message && (
                  <div
                    className={`p-4 rounded-xl text-sm ${
                      status.type === 'success'
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center rounded-xl px-5 py-4 text-sm font-semibold transition-all duration-300 cursor-pointer bg-brand-navy text-white hover:bg-brand-orange shadow-md w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </button>
              </form>
            </div>

            {/* Service Areas */}
            <div className="rounded-3xl bg-brand-navy text-white p-8 shadow-xl flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold">Service Areas</h2>
                <p className="mt-4 text-gray-300 leading-relaxed">
                  Currently serving across these locations.
                </p>
                <div className="flex flex-wrap gap-3 mt-8">
                  {['Lalbaug', 'Parel', 'Dadar', 'Matunga'].map((loc) => (
                    <div
                      key={loc}
                      className="px-5 py-3 rounded-full bg-white/10 border border-white/5 font-medium hover:bg-brand-orange transition-all duration-300"
                    >
                      {loc}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 flex items-center gap-3 text-gray-300 font-semibold text-lg border-t border-white/10 pt-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-map-pin text-brand-orange"
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Mumbai Metropolitan Region
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
