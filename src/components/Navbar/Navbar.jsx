import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from "../Navbar/logo.png"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' },
  ]

  const closeMenu = () => setIsOpen(false)

  return (
    <div className='bg-[#161f4a] sm:bg-white px-4 sm:px-6 lg:px-8 sticky top-0 z-50 shadow-md'>
      <div className='flex justify-between items-center py-4'>
        <img src={logo} alt="Logo" className='w-20 h-20 object-contain bg-white sm:bg-transparent rounded-full' />

        {/* Desktop nav */}
        <nav className='hidden lg:block'>
          <ul className='flex flex-row gap-8 items-center'>
            {links.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `font-bold px-3 py-1.5 rounded transition-all ${
                      isActive
                        ? 'bg-[#161f4a] text-white'
                        : 'text-[#161f4a] hover:bg-[#161f4a] hover:text-white'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='lg:hidden text-white sm:text-[#161f4a] p-2'
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls='mobile-nav'
        >
          <svg className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            {isOpen ? (
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            ) : (
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      <nav
        id='mobile-nav'
        className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-60 pb-4' : 'max-h-0'}`}
      >
        <ul className='flex flex-col gap-2'>
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                end={link.path === '/'}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block font-bold px-3 py-2 rounded transition-all ${
                    isActive
                      ? 'bg-white text-[#161f4a] sm:bg-[#161f4a] sm:text-white'
                      : 'text-white sm:text-[#161f4a] hover:bg-white hover:text-[#161f4a] sm:hover:bg-[#161f4a] sm:hover:text-white'
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Navbar