import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import AboutMe from '../components/AboutComponents/AboutMe'
import AboutCore from '../components/AboutComponents/AboutCore'
import StatsSection from '../components/AboutComponents/StatsSection'
import Footer from '../components/Footer/Footer'

function About() {
  return (
    <div>
      <Navbar />
<div className=' flex flex-col bg-white justify-center items-center h-auto w-full py-4'>
    <div className=' flex flex-col  '>
        <h1 className=' text-[#161f4a] font-extrabold text-[3rem]'>About Us</h1>
       <div className="flex flex-row gap bg-[#161f4a] text-center align-center justify-center rounded-md px-4 mt-0">
         <a href="/" className='  text-white py-2 px-4  transition duration-300'>Home</a>
         <span className=' text-[#ffffff] pt-2'>||</span>
         <p className='  text-white py-2 px-4  transition duration-300'>About</p>
       </div>
    </div>
</div>
<AboutMe />
<AboutCore />
<StatsSection />

<Footer />
    </div>
  )
}

export default About
