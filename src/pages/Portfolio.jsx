import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import PortfolioHero from '../components/Portfolio/PortfolioHero'
import PortfolioGrid from '../components/Portfolio/PortfolioGrid'
import PortfolioContact from '../components/Portfolio/PortfolioContact'
import Footer from '../components/Footer/Footer'

function Portfolio() {
  return (
    <div>
      <Navbar />
      <PortfolioHero />
      <PortfolioGrid />
      <PortfolioContact />
      <Footer />
    </div>
  )
}

export default Portfolio
