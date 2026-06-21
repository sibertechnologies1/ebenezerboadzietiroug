import React from 'react'
import AboutMeImg from './AboutMeImg.jpeg'
import { Link } from 'react-router-dom'
import useInViewAnimate from '../../hooks/useInViewAnimate'

function AboutMe() {
  const [ref, visible] = useInViewAnimate({ threshold: 0.2 })

  return (
    <section 
      ref={ref} 
      className="max-w-6xl mx-0 grid grid-cols-1 md:grid-cols-2 items-stretch gap-0 rounded-2xl overflow-hidden shadow-2xl bg-[#161f4a]" 
      aria-labelledby="aboutme-heading"
    >
      {/* Image column */}
      <figure className={`w-full min-h-[320px] md:h-auto overflow-hidden transition-all duration-1000 transform ${visible ? 'animate-fade-right opacity-100' : 'opacity-0'}`}>
        <img
          src={AboutMeImg}
          alt="Ebenezer — UI/UX developer and digital marketer"
          // Swapped custom focal points to object-center so it fills the left pane perfectly
          className="w-full h-full object-cover object-center"
        />
      </figure>

      {/* Content panel */}
      <div className={`flex flex-col justify-center gap-6 px-6 sm:px-12 py-12 text-white transition-all duration-1000 transform ${visible ? 'animate-fade-left opacity-100' : 'opacity-0'}`}>
        <div>
          <span className="text-orange-400 font-bold tracking-wider uppercase text-sm block mb-1">About Me</span>
          <h3 id="aboutme-heading" className="font-extrabold text-3xl sm:text-4xl">Hi, I'm Ebenezer</h3>
        </div>

        <p className="text-white/85 leading-relaxed text-base sm:text-lg">
          A multidisciplinary digital professional with years of experience driving tangible
          business growth. By blending data-driven UI/UX design with SEO and social marketing
          strategies, I create intuitive, high-converting digital products.
        </p>

        <p className="text-white/85 leading-relaxed text-base sm:text-lg">
          I craft memorable digital experiences that perform under pressure and clearly communicate
          my clients' unique value to their ideal audience — turning complex challenges into
          measurable growth.
        </p>

        {/* Contact Info Grid */}
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 border-t border-white/10 pt-6">
          <div>
            <h4 className="text-orange-400 font-semibold text-sm uppercase tracking-wider mb-0.5">Name</h4>
            <p className="text-white font-medium">Tiroug Boadzie Ebenezer</p>
          </div>

          <div>
            <h4 className="text-orange-400 font-semibold text-sm uppercase tracking-wider mb-0.5">Phone</h4>
            <p className="text-white font-medium">
              <a href="tel:+233502156703" className="hover:text-orange-300 transition-colors">+233 50 215 6703</a>
            </p>
          </div>

          <div>
            <h4 className="text-orange-400 font-semibold text-sm uppercase tracking-wider mb-0.5">Email</h4>
            <p className="text-white font-medium break-all">
              <a href="mailto:eboadzietiroug@gmail.com" className="hover:text-orange-300 transition-colors">eboadzietiroug@gmail.com</a>
            </p>
          </div>

          <div>
            <h4 className="text-orange-400 font-semibold text-sm uppercase tracking-wider mb-0.5">LinkedIn</h4>
            <p className="text-white font-medium text-sm break-all">
              <a
                href="https://www.linkedin.com/in/ebenezerboadzietiroug"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-300 transition-colors line-clamp-1"
              >
                in/ebenezerboadzietiroug
              </a>
            </p>
          </div>
        </div>

        {/* Call to Action with matching Hover Swipe effect */}
        <div className="mt-4">
          <Link 
            to="/contact" 
            className="group relative inline-block overflow-hidden bg-transparent text-white font-bold py-3 px-8 rounded-full border border-white transition-colors duration-300 hover:text-[#161f4a]"
          >
            <span className="absolute inset-0 w-full h-full bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out -z-10" />
            <span className="relative z-10">Let's talk</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AboutMe