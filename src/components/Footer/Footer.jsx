import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaArrowUp, FaEnvelope } from "react-icons/fa6";
import logo from "../Navbar/logo.png";

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Contact', path: '/contact' },
];

const socialLinks = [
  { icon: FaFacebook, href: 'https://www.facebook.com/ebenezer.tirougdimafa', label: 'Facebook' },
  { icon: FaInstagram, href: 'https://www.instagram.com/tirougdimafa/', label: 'Instagram' },
  { icon: FaLinkedin, href: 'http://www.linkedin.com/in/ebenezerboadzietiroug', label: 'LinkedIn' },
  { icon: FaTiktok, href: 'https://www.tiktok.com/@gratdimafa?_r=1&_t=ZS-97IBL1GaP4u', label: 'TikTok' },
];

function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0a0f1d] text-white border-t border-slate-800/80 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 mb-12">
          
          {/* Brand & Bio Column */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-800 p-1 border border-slate-700/60 transition-transform duration-300 group-hover:scale-105">
                <img src={logo} alt="Ebenezer Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                Ebenezer
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              UI/UX developer and digital marketer focused on building intuitive web experiences and conversion strategies.
            </p>

            {/* Social Icons */}
            <ul className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-200 shadow-sm"
                  >
                    <Icon className="text-base" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & CTA Column */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">
              Get In Touch
            </h3>
            <a
              href="mailto:eboadzietiroug@gmail.com"
              className="inline-flex items-center gap-2 text-slate-300 hover:text-blue-400 text-sm transition-colors duration-200 mb-6 break-all"
            >
              <FaEnvelope className="text-blue-400 flex-shrink-0" />
              <span>eboadzietiroug@gmail.com</span>
            </a>

            <Link
              to="/contact"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm py-2.5 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/20"
            >
              Start a Project
            </Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {year} Ebenezer. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 group"
          >
            <span>Back to top</span>
            <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-slate-700 transition-colors">
              <FaArrowUp className="text-xs text-slate-400 group-hover:text-blue-400" />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
}

export default Footer;