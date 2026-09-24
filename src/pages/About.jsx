import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import AboutMe from '../components/AboutComponents/AboutMe';
import AboutCore from '../components/AboutComponents/AboutCore';
import StatsSection from '../components/AboutComponents/StatsSection';
import Footer from '../components/Footer/Footer';
import { supabase } from '../supabaseClient';

function About() {
  const [aboutData, setAboutData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutContent = async () => {
      const { data, error } = await supabase
        .from('page_sections')
        .select('*')
        .eq('page', 'about');

      if (!error && data) {
        const mappedData = {};
        data.forEach((item) => {
          mappedData[item.section_id] = item.content;
        });
        setAboutData(mappedData);
      }
      setLoading(false);
    };

    fetchAboutContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f1d] flex flex-col items-center justify-center gap-3 text-white font-medium">
        <div className="w-8 h-8 border-4 border-slate-700 border-t-sky-400 rounded-full animate-spin" />
        <p className="text-sm text-slate-400">Loading details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-grow">
        {/* Header / Breadcrumb Banner */}
      

        {/* Dynamic Page Sections */}
        <AboutMe content={aboutData.about_me} />
        <AboutCore content={aboutData.about_core} />
        <StatsSection content={aboutData.stats} />
      </main>

      <Footer />
    </div>
  );
}

export default About;