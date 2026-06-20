import React from 'react'
import Nabvar from '../components/Navbar/Navbar'
import HomeHero from '../components/Home Hero Section/HomeHero'
import SkillSection from '../components/Home Hero Section/SkillSection'
import PortfolioSection from '../components/Home Hero Section/PortfolioSection'
import LeadMagnet from '../components/Home Hero Section/LeadMagnet'
const Home = () => {
  return (
    <div>
      <Nabvar />
      <HomeHero />
      <SkillSection />
      <PortfolioSection />
      <LeadMagnet />
    </div>
  )
}

export default Home
