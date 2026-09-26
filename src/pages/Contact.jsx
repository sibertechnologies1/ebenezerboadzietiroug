import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ContactForm from '../components/Contact/ContactForm';
import { supabase } from '../supabaseClient';

function Contact() {
  const [contactData, setContactData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactData = async () => {
      const { data, error } = await supabase
        .from('page_sections')
        .select('*')
        .eq('page', 'contact');

      if (!error && data) {
        const mappedData = {};
        data.forEach((item) => {
          mappedData[item.section_id] = item.content;
        });
        setContactData(mappedData);
      }
      setLoading(false);
    };

    fetchContactData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f1d] flex items-center justify-center text-white text-sm font-medium">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[#0a0f1d] min-h-screen  flex flex-col justify-between">
      <Navbar />
      <main className="flex-1">
        <ContactForm 
          heroContent={contactData.contact_hero} 
          formContent={contactData.contact_form} 
        />
      </main>
      <Footer />
    </div>
  );
}

export default Contact;