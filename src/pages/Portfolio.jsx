import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import PortfolioHero from '../components/Portfolio/PortfolioHero';
import PortfolioGrid from '../components/Portfolio/PortfolioGrid';
import PortfolioContact from '../components/Portfolio/PortfolioContact';
import Footer from '../components/Footer/Footer';
import { supabase } from '../supabaseClient';

function Portfolio() {
  const [portfolioData, setPortfolioData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolioContent = async () => {
      const { data, error } = await supabase
        .from('page_sections')
        .select('*')
        .eq('page', 'portfolio');

      if (!error && data) {
        const mappedData = {};
        data.forEach((item) => {
          mappedData[item.section_id] = item.content;
        });
        setPortfolioData(mappedData);
      }
      setLoading(false);
    };

    fetchPortfolioContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f1d] flex items-center justify-center text-white font-medium text-sm">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <PortfolioHero content={portfolioData.portfolio_hero} />
      <PortfolioGrid content={portfolioData.portfolio_grid} />
      <PortfolioContact content={portfolioData.portfolio_contact} />
      <Footer />
    </div>
  );
}

export default Portfolio;