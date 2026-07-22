import React, { useState, useEffect } from 'react'
import useInViewAnimate from '../../hooks/useInViewAnimate'

// Configuration
const GOOGLE_DRIVE_FOLDER_ID = '1MZBE_vAMflQliGgUCTe2KqZvIb4Ydpp2';
const GOOGLE_API_KEY = 'AIzaSyDw1zpAvs36G7ViEFUGkcR-GTzw8_SD_uE';

// Fixed projects
const fixedProjects = [
  {
    id: 'mansur-site',
    image: 'https://via.placeholder.com/600x400?text=Mansur+Enterprises+Preview',
    title: 'Mansur Enterprises',
    description: 'Brand website with modern e-commerce layout, service highlights, and polished product presentation.',
    label: 'E-commerce Website',
    href: 'https://mansurenterprise-oxr3.vercel.app/',
    isExternal: true
  }
];

function PortfolioGrid() {
  const [ref, visible] = useInViewAnimate({ threshold: 0.2 });
  const [driveProjects, setDriveProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDriveImages = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/drive/v3/files?q='${GOOGLE_DRIVE_FOLDER_ID}'+in+parents+and+mimeType+contains+'image/'&key=${GOOGLE_API_KEY}&fields=files(id,name)`
        );
        const data = await response.json();

        if (data.files && data.files.length > 0) {
          const fetchedProjects = data.files.map((file, index) => ({
            id: file.id,
            // UPDATED: Uses the reliable googleusercontent link structure to bypass CORS issues
            image: `https://lh3.googleusercontent.com/d/${file.id}`,
            title: file.name.replace(/\.[^/.]+$/, "") || `Campaign Flyer ${index + 1}`,
            description: 'High-impact flyer design created for digital marketing campaigns and social media presence.',
            label: 'Marketing Design',
            href: `https://drive.google.com/drive/folders/${GOOGLE_DRIVE_FOLDER_ID}`,
            isExternal: true
          }));
          setDriveProjects(fetchedProjects);
        }
      } catch (error) {
        console.error("Error fetching Google Drive images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDriveImages();
  }, []);

  const allProjects = [...fixedProjects, ...driveProjects];

  return (
    <section ref={ref} className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
      <div className='max-w-6xl mx-auto'>
        <div className={`mb-12 text-center ${visible ? 'animate-fade-up' : 'opacity-0'}`}>
          <p className='text-xs sm:text-sm uppercase tracking-[0.3em] text-blue-500 font-semibold'>Recent projects</p>
          <h2 className='text-3xl sm:text-4xl font-extrabold text-[#161f4a] mt-4'>Work that moves brands forward</h2>
          <p className='max-w-2xl mx-auto mt-4 text-[#161f4a]/75 leading-relaxed'>
            Explore a selection of my recent design and digital marketing work, built to make online experiences feel clean, engaging, and memorable.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading portfolio items...</div>
        ) : (
          <div className={`grid gap-8 lg:grid-cols-2 ${visible ? 'animate-fade-up delay-100' : 'opacity-0'}`}>
            {allProjects.map(({ id, image, title, description, label, href, isExternal }) => (
              <a
                key={id}
                href={href}
                target={isExternal ? '_blank' : '_self'}
                rel={isExternal ? 'noopener noreferrer' : ''}
                className='group block overflow-hidden rounded-[2rem] border border-[#161f4a]/10 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl'
              >
                <div className='relative overflow-hidden bg-gray-100'>
                  <img
                    src={image}
                    alt={title}
                    className='w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105'
                    loading='lazy'
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/600x400?text=Preview+Unavailable';
                    }}
                  />
                  <div className='absolute inset-0 bg-[#161f4a]/0 group-hover:bg-[#161f4a]/40 transition-colors duration-300' />
                </div>
                <div className='bg-white p-8'>
                  {/* <p className='text-sm uppercase tracking-[0.25em] text-[#161f4a]/60 mb-3'>{label}</p>
                  <h3 className='text-2xl font-bold text-[#161f4a] mb-3'>{title}</h3>
                  <p className='text-[#161f4a]/75 leading-relaxed'>{description}</p> */}
                  <div className='mt-6 text-blue-500 font-bold transition-colors duration-300 group-hover:text-blue-700'>
                    {href.includes('drive.google.com') ? 'View full Drive folder →' : 'View live site →'}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default PortfolioGrid;