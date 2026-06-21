import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa6"
import logo from "../Navbar/logo.png"

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Contact', path: '/contact' },
]

const socialLinks = [
  { icon: FaFacebook, href: 'https://www.facebook.com/ebenezer.tirougdimafa', label: 'Facebook' },
  { icon: FaInstagram, href: 'https://www.instagram.com/tirougdimafa/', label: 'Instagram' },
  { icon: FaLinkedin, href: 'http://www.linkedin.com/in/ebenezerboadzietiroug', label: 'LinkedIn' },
  { icon: FaTiktok, href: 'https://www.tiktok.com/@gratdimafa?_r=1&_t=ZS-97IBL1GaP4u', label: 'TikTok' },
]

function Footer() {
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className='bg-white text-[#161f4a] border-t border-[#161f4a]/10 px-4 sm:px-6 lg:px-8 pt-16 pb-8 animate-fade-up'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto'>
        {/* Brand */}
        <div className='flex flex-col items-center md:items-start text-center md:text-left'>
          <img src={logo} alt="Logo" className='w-16 h-16 object-contain rounded-full mb-4' />
          <p className='text-[#161f4a]/70 leading-relaxed max-w-xs'>
            UI/UX developer and digital marketer turning everyday visitors into loyal clients.
          </p>
          <ul className='flex gap-4 mt-5 text-xl'>
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className='text-[#161f4a] hover:text-blue-500 transition-colors duration-300'
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div className='flex flex-col items-center md:items-start text-center md:text-left'>
          <h3 className='text-sm font-bold uppercase tracking-[0.2em] text-blue-500 mb-4'>Quick Links</h3>
          <ul className='flex flex-col gap-2'>
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className='text-[#161f4a]/70 hover:text-[#161f4a] transition-colors duration-300'
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className='flex flex-col items-center md:items-start text-center md:text-left'>
          <h3 className='text-sm font-bold uppercase tracking-[0.2em] text-blue-500 mb-4'>Get In Touch</h3>
          <a
            href="mailto:eboadzietiroug@gmail.com"
            className='text-[#161f4a]/70 hover:text-[#161f4a] transition-colors duration-300 break-all'
          >
            eboadzietiroug@gmail.com
          </a>
          <Link
            to="/contact"
            className='mt-5 bg-[#161f4a] text-white font-bold py-2 px-6 rounded-full hover:bg-[#0d1530] transition-colors duration-300'
          >
            Start a Project
          </Link>
        </div>
      </div>

      <div className='max-w-5xl mx-auto border-t border-[#161f4a]/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[#161f4a]/60'>
        <p>© {year} Ebenezer. All rights reserved.</p>
        <button
          onClick={scrollToTop}
          className='hover:text-[#161f4a] transition-colors duration-300'
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  )
}

export default Footer