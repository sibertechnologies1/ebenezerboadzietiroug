import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import logo from "../Navbar/logo.png";

import { BiMenu, BiX, BiSend } from "react-icons/bi";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' },
  ];

  // Detect page scroll to adjust background shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 backdrop-blur-md border-b ${
        scrolled
          ? 'bg-slate-950/90 border-slate-800 shadow-lg shadow-black/40'
          : 'bg-slate-950/70 border-slate-800/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo & Brand */}
          <NavLink
            to="/"
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-800 p-1 border border-slate-700/60 transition-transform duration-300 group-hover:scale-105">
              <img
                src={logo}
                alt="Brand Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <span className="text-lg font-bold text-white tracking-tight group-hover:text-blue-600 transition-colors duration-200">
              Ebenezer
            </span>
          </NavLink>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 border border-slate-700/60 px-2 py-1.5 rounded-full backdrop-blur-sm">

            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30'
                      : 'text-white hover:text-blue-600 hover:bg-slate-800/60'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

          </nav>

          {/* Desktop CTA Action Button */}
          <div className="hidden lg:flex items-center">
            <NavLink
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-semibold py-2.5 px-5 rounded-full shadow-md shadow-blue-600/20 transition-all duration-200 hover:scale-[1.02]"
            >
              <span>Get in Touch</span>
              <BiSend className="text-base" />
            </NavLink>
          </div>

          {/* Mobile Menu Control Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl text-white hover:text-blue-600 hover:bg-slate-800/60 border border-slate-700/60 transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <BiX className="text-2xl" />
            ) : (
              <BiMenu className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden bg-slate-950/95 border-b border-slate-800 backdrop-blur-xl ${
          isOpen
            ? 'max-h-80 opacity-100 py-4'
            : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-2">

          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block text-base font-medium px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/20'
                    : 'text-white hover:text-blue-600 hover:bg-slate-800/60'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <NavLink
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="mt-2 text-center bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-4 rounded-xl transition-colors text-sm shadow-md shadow-blue-600/20"
          >
            Get in Touch
          </NavLink>

        </div>
      </div>
    </header>
  );
}

export default Navbar;