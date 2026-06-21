import React from 'react'
import AboutMeImg from './AboutMeImg.jpeg'
import { Link } from 'react-router-dom'
import useInViewAnimate from '../../hooks/useInViewAnimate'

function AboutMe() {
  const [ref, visible] = useInViewAnimate({ threshold: 0.2 })

  return (
    <section ref={ref} className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-stretch gap-6" aria-labelledby="aboutme-heading">
      {/* Image column */}
      <figure className={`w-full h-64 sm:h-80 md:h-auto md:min-h-full overflow-hidden ${visible ? 'animate-fade-right' : 'opacity-0'}`}>
        <img
          src={AboutMeImg}
          alt="Ebenezer — UI/UX developer and digital marketer"
          className="w-full h-full object-cover object-center"
        />
      </figure>

      {/* Content panel */}
      <div className={`flex flex-col justify-center gap-6 bg-[#161f4a] px-6 sm:px-12 py-10 text-white ${visible ? 'animate-fade-left' : 'opacity-0'}`}>
        <h3 id="aboutme-heading" className="font-extrabold text-2xl sm:text-3xl">Hi, I'm Ebenezer</h3>

        <p className="text-white/90 leading-relaxed">
          A multidisciplinary digital professional with years of experience driving tangible
          business growth. By blending data-driven UI/UX design with SEO and social marketing
          strategies, I create intuitive, high-converting digital products.
        </p>

        <p className="text-white/90 leading-relaxed">
          I craft memorable digital experiences that perform under pressure and clearly communicate
          my clients' unique value to their ideal audience — turning complex challenges into
          measurable growth.
        </p>

        <div className="mt-2 grid grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <h4 className="text-orange-400 font-semibold text-lg">Name</h4>
            <p className="text-white">Tiroug Boadzie Ebenezer</p>
          </div>

          <div>
            <h4 className="text-orange-400 font-semibold text-lg">Phone</h4>
            <p className="text-white">
              <a href="tel:+233502156703" className="underline hover:text-blue-200">+233 50 215 6703</a>
            </p>
          </div>

          <div>
            <h4 className="text-orange-400 font-semibold text-lg">Email</h4>
            <p className="text-white break-all">
              <a href="mailto:eboadzietiroug@gmail.com" className="underline hover:text-blue-200">eboadzietiroug@gmail.com</a>
            </p>
          </div>

          <div>
            <h4 className="text-orange-400 font-semibold text-lg">LinkedIn</h4>
            <p className="text-white break-all">
              <a
                href="https://www.linkedin.com/in/ebenezerboadzietiroug"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-200 break-words"
              >
                linkedin.com/in/ebenezerboadzietiroug
              </a>
            </p>
          </div>
        </div>

        <div className="mt-6">
          <Link to="/contact" className="inline-block bg-white text-[#161f4a] font-bold py-2 px-6 rounded-full hover:bg-blue-50 transition">Let's talk</Link>
        </div>
      </div>
    </section>
  )
}

export default AboutMe