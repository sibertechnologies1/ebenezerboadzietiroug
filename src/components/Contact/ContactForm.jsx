import React, { useState } from 'react';
import { BiPaperPlane, BiCheckCircle, BiErrorCircle, BiEnvelope, BiPhone, BiMap } from 'react-icons/bi';
import useInViewAnimate from '../../hooks/useInViewAnimate';
import contactFallbackImg from './contact.jpg';
import { supabase } from '../../supabaseClient';

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5 w-full text-white" >
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
        {label}
      </span>
      {children}
    </label>
  );
}

function ContactForm({ heroContent, formContent }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const [ref, visible] = useInViewAnimate({ threshold: 0.15 });

  // Contact details with default fallbacks
  const detailsTagline = heroContent?.tagline || 'Contact Details';
  const detailsTitle = heroContent?.title || "Let's build something together";
  const detailsDesc = heroContent?.description || 'If you have a project, idea, or just want to say hello...';
  const email = heroContent?.email || 'eboadzietiroug@gmail.com';
  const phone = heroContent?.phone || '+233 50 215 6703';
  const location = heroContent?.location || 'Kumasi, Ghana';
  const directLineTitle = heroContent?.directLineTitle || 'Direct Line';
  const directLineDesc = heroContent?.directLineDescription || 'Quick response guaranteed for all inquiries.';
  const image = heroContent?.image || contactFallbackImg;

  // Form setup with fallbacks
  const formTagline = formContent?.tagline || 'Get In Touch';
  const formTitle = formContent?.title || 'Send a Message';

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.name.trim()) return 'Please enter your name.';
    if (!/\S+@\S+\.\S+/.test(form.email)) return 'Please enter a valid email address.';
    if (!form.message.trim()) return 'Please enter a message.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      setStatus({ type: 'error', message: error });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const { error: dbError } = await supabase
        .from('messages')
        .insert([
          {
            name: form.name.trim(),
            email: form.email.trim(),
            subject: form.subject.trim() || 'No Subject',
            message: form.message.trim(),
            read: false
          }
        ]);

      if (dbError) throw dbError;

      setStatus({ type: 'success', message: "Message sent — I'll be in touch soon!" });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      const subject = encodeURIComponent(form.subject || 'New message from portfolio');
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
      );
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      setStatus({ type: 'success', message: 'Opening your default email client...' });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = 
    "w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-black placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200";

  return (
    <section 
      ref={ref} 
      className="bg-[#0a0f1d]  py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      aria-labelledby="contact-form-title"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className={`max-w-6xl mx-auto relative z-10 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="inline-block text-xs  font-semibold uppercase tracking-[0.2em] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 rounded-full">
                {detailsTagline}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                {detailsTitle}
              </h2>
              <p className="text-white text-sm leading-relaxed">
                {detailsDesc}
              </p>
            </div>

            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-3 text-white">
                <div className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-blue-400">
                  <BiEnvelope className="text-base" />
                </div>
                <div>
                  <p className="text-[11px] text-white uppercase tracking-wider font-bold">Email</p>
                  <a href={`mailto:${email}`} className="text-xs sm:text-sm  text-white hover:text-blue-400 transition-colors">
                    {email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <div className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-blue-400">
                  <BiPhone className="text-base" />
                </div>
                <div>
                  <p className="text-[11px] text-white font-bold uppercase tracking-wider">Phone</p>
                  <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-xs sm:text-sm text-white hover:text-blue-400 transition-colors">
                    {phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <div className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-blue-400">
                  <BiMap className="text-base" />
                </div>
                <div>
                  <p className="text-[11px] text-white font-bold uppercase tracking-wider ">Location</p>
                  <p className="text-xs sm:text-sm text-white cursor-pointer hover:text-blue-400 transition-colors">{location}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-5 bg-slate-900/40 border border-slate-800/80 backdrop-blur-md shadow-xl flex flex-col items-center text-center space-y-3">
              <img
                src={image}
                alt="Direct Contact"
                className="w-full max-w-[160px] h-auto object-contain filter drop-shadow-2xl"
              />
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-white">{directLineTitle}</h3>
                <p className="text-xs text-white">{directLineDesc}</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7">
            <form 
              onSubmit={handleSubmit} 
              noValidate 
              className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-5 sm:p-7 lg:p-8 backdrop-blur-md shadow-2xl space-y-5"
            >
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                  {formTagline}
                </span>
                <h3 id="contact-form-title" className="text-xl sm:text-2xl font-bold text-white">
                  {formTitle}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Name">
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className={inputStyle}
                      placeholder="Your full name"
                    />
                  </Field>

                  <Field label="Email">
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className={inputStyle}
                      placeholder="name@company.com"
                    />
                  </Field>
                </div>

                <Field label="Subject">
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className={inputStyle}
                    placeholder="What is your project about?"
                  />
                </Field>

                <Field label="Message" className="text-white">
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    className={`${inputStyle} resize-none`}
                    placeholder="Tell me about your project goals or requirements..."
                  />
                </Field>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
                >
                  <span>{loading ? 'Sending Message...' : 'Send Message'}</span>
                  <BiPaperPlane className="text-base transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                {status && (
                  <div
                    className={`flex items-center gap-2 text-xs text-white font-medium px-3.5 py-2 rounded-xl border ${
                      status.type === 'error'
                        ? 'text-red-400 bg-red-500/10 border-red-500/20'
                        : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                    }`}
                  >
                    {status.type === 'error' ? (
                      <BiErrorCircle className="text-base flex-shrink-0" />
                    ) : (
                      <BiCheckCircle className="text-base flex-shrink-0" />
                    )}
                    <span>{status.message}</span>
                  </div>
                )}
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ContactForm;