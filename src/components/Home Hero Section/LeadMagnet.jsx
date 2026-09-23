import React, { useState } from 'react';
import ui from "./ui.png";
import useInViewAnimate from '../../hooks/useInViewAnimate';
import { BiCheck, BiSend, BiErrorCircle, BiGift } from "react-icons/bi";

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xaqzrkpp';

function LeadMagnet() {
  const [ref, visible] = useInViewAnimate({ threshold: 0.15 });
  const [formData, setFormData] = useState({ fullname: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.target),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ fullname: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section 
      id="contact" 
      ref={ref} 
      className="scroll-mt-24 bg-[#0a0f1d] text-white py-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden border-t border-slate-800/80"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Left Column: Image & Feature Callouts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative group rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-3 shadow-2xl backdrop-blur-sm">
              <img 
                src={ui} 
                alt="UI/UX Design Showcase" 
                loading="lazy" 
                className="w-full h-auto rounded-xl object-cover transition-transform duration-500 group-hover:scale-102" 
              />
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 pointer-events-none" />
            </div>

            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 backdrop-blur-sm space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-blue-400">What You Get</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <BiCheck className="text-blue-400 text-lg flex-shrink-0" />
                  <span>Custom UI/UX web design & development</span>
                </li>
                <li className="flex items-center gap-2">
                  <BiCheck className="text-blue-400 text-lg flex-shrink-0" />
                  <span>SEO audit & local search optimization</span>
                </li>
                <li className="flex items-center gap-2">
                  <BiCheck className="text-blue-400 text-lg flex-shrink-0" />
                  <span>Tailored social media marketing assets</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Lead Form Card */}
          <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-md relative">
            <div className="mb-8 text-left">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full mb-4">
                <BiGift className="text-blue-400 text-base" />
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                  Limited-Time Offer
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Get 20% Off Your First Project
              </h2>

              <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed font-normal">
                Submit your project details below to claim an exclusive 20% discount on web development, SEO, or social media branding.
              </p>
            </div>

            {status === 'success' ? (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mx-auto text-2xl">
                  <BiCheck />
                </div>
                <h3 className="text-lg font-bold text-white">Discount Claimed!</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Thank you! I will review your request and get back to you personally with your 20% introductory discount details.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="fullname" className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-2">
                    Full Name
                  </label>
                  <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    required
                    autoComplete="name"
                    value={formData.fullname}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className="w-full bg-slate-950/60 border border-slate-700/80 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className="w-full bg-slate-950/60 border border-slate-700/80 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-2">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me briefly about your project goals or requirements..."
                    className="w-full bg-slate-950/60 border border-slate-700/80 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                >
                  {status === 'sending' ? (
                    'Sending Message...'
                  ) : (
                    <>
                      <span>Claim My 20% Discount</span>
                      <BiSend className="text-lg" />
                    </>
                  )}
                </button>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 text-xs mt-3 justify-center">
                    <BiErrorCircle className="text-sm" />
                    <span>Something went wrong sending your message. Please try again.</span>
                  </div>
                )}
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

export default LeadMagnet;