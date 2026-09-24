// Home.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; // Ensure you have configured your supabase client
import Nabvar from '../components/Navbar/Navbar';
import HomeHero from '../components/Home Hero Section/HomeHero';
import SkillSection from '../components/Home Hero Section/SkillSection';
import PortfolioSection from '../components/Home Hero Section/PortfolioSection';
import LeadMagnet from '../components/Home Hero Section/LeadMagnet';
import Footer from '../components/Footer/Footer';

const Home = () => {
  const [sections, setSections] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeContent = async () => {
      const { data, error } = await supabase.from('page_sections').select('*');
      if (!error && data) {
        const contentMap = data.reduce((acc, row) => {
          acc[row.section_id] = row.content;
          return acc;
        }, {});
        setSections(contentMap);
      }
      setLoading(false);
    };

    fetchHomeContent();
  }, []);

  if (loading) return <div className="bg-[#090D16] min-h-screen flex items-center justify-center text-white">Loading...</div>;

  return (
    <div>
      <Nabvar />
      <HomeHero data={sections.hero} />
      <SkillSection servicesData={sections.skills} />
      <PortfolioSection projectsData={sections.portfolio} />
      <LeadMagnet data={sections.lead_magnet} />
      <Footer />
    </div>
  );
};

export default Home;