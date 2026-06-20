import React from 'react'
import AboutMeImg from './AboutMeImg.jpeg'

function AboutMe() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      {/* Image — fills its column edge to edge */}
      <div className="relative h-80 py-12 sm:h-auto">
        <img
          src={AboutMeImg}
          alt="Portrait of Ebenezer"
          className="absolute inset-0  w-full h-full object-cover object-[center_87%]"
        />
      </div>

      {/* Content panel */}
      <div className="flex flex-col justify-center gap-6 bg-[#161f4a] px-6 sm:px-12 py-12 my-8">
        <h3 className="text-white font-extrabold text-2xl sm:text-3xl">
          Hi, I'm Ebenezer
        </h3>

        <p className="text-white/90 leading-relaxed">
          A multi-disciplined digital professional with years of experience driving tangible
          business growth. By seamlessly blending data-driven UI/UX design with advanced SEO
          and social marketing strategies, I create intuitive, high-converting digital products.
        </p>

        <p className="text-white/90 leading-relaxed">
          My goal is to craft memorable digital experiences that not only perform under pressure
          but also clearly communicate my clients' unique value to their ideal audience. I turn
          complex challenges into clear, measurable growth.
        </p>

        <div className="grid grid-cols-2 gap-x-8 gap-y-6 mt-2">
          <div>
            <h4 className="text-orange-400 font-semibold text-lg">Name</h4>
            <p className="text-white">Tiroug Boadzie Ebenezer</p>
          </div>
          <div>
            <h4 className="text-orange-400 font-semibold text-lg">Phone</h4>
            <p className="text-white">0502156703</p>
          </div>
          <div>
            <h4 className="text-orange-400 font-semibold text-lg">Email</h4>
            <p className="text-white break-all">eboadzietiroug@gmail.com</p>
          </div>
          <div>
            <h4 className="text-orange-400 font-semibold text-lg">LinkedIn</h4>
            <p className="text-white break-all">www.linkedin.com/in/ebenezerboadzietiroug</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutMe