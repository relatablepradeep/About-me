import React, { useState, useEffect } from 'react';

const Project = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.reveal-section');
      
      sections.forEach((section, index) => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionBottom = section.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        // Consider section visible when it occupies most of the viewport
        if (sectionTop < windowHeight/2 && sectionBottom > windowHeight/2) {
          setVisibleSections(prev => {
            if (!prev.includes(index)) {
              return [...prev, index];
            }
            return prev;
          });
        } else {
          setVisibleSections(prev => prev.filter(i => i !== index));
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount to check if any sections are already visible
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleSectionClick = (pageName) => {
    // Simulate navigation by changing the current page state
    setCurrentPage(pageName);
  };
  
  const sections = [
    {
      title: "Section One",
      content: "This is the first section that appears from the left side. Click to navigate to page one.",
      direction: "left",
      bgColor: "bg-blue-100",
      page: "page-one"
    },
    {
      title: "Section Two",
      content: "This is the second section that appears from the right side. Click to navigate to page two.",
      direction: "right",
      bgColor: "bg-green-100",
      page: "page-two"
    },
    {
      title: "Section Three",
      content: "This is the third section that appears again from the left side. Click to navigate to page three.",
      direction: "left",
      bgColor: "bg-yellow-100",
      page: "page-three"
    },
    {
      title: "Section Four",
      content: "This is the fourth section that appears from the right side. Click to navigate to page four.",
      direction: "right",
      bgColor: "bg-purple-100",
      page: "page-four"
    }
  ];

  // Content for different pages
  const pageContent = {
    'home': (
      <div className="w-full overflow-x-hidden">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`reveal-section h-screen w-full flex items-center justify-center transition-all duration-700 ${section.bgColor} ${
              visibleSections.includes(index)
                ? 'opacity-100 translate-x-0'
                : section.direction === 'left'
                  ? 'opacity-0 -translate-x-full'
                  : 'opacity-0 translate-x-full'
            } cursor-pointer hover:shadow-lg`}
            onClick={() => handleSectionClick(section.page)}
          >
            <div className="text-center p-6 max-w-2xl">
              <h2 className="text-4xl font-bold mb-4">{section.title}</h2>
              <p className="text-xl">{section.content}</p>
              <button className="mt-4 px-6 py-2 bg-white rounded-lg shadow hover:bg-gray-100 transition-colors">
                Visit {section.title}
              </button>
            </div>
          </div>
        ))}
      </div>
    ),
    'page-one': (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-blue-100">
        <h1 className="text-5xl font-bold mb-6">Page One</h1>
        <p className="text-xl mb-8">This is the content for Section One's page.</p>
        <button 
          onClick={() => handleSectionClick('home')}
          className="px-8 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
        >
          Back to Home
        </button>
      </div>
    ),
    'page-two': (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-green-100">
        <h1 className="text-5xl font-bold mb-6">Page Two</h1>
        <p className="text-xl mb-8">This is the content for Section Two's page.</p>
        <button 
          onClick={() => handleSectionClick('home')}
          className="px-8 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-colors"
        >
          Back to Home
        </button>
      </div>
    ),
    'page-three': (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-yellow-100">
        <h1 className="text-5xl font-bold mb-6">Page Three</h1>
        <p className="text-xl mb-8">This is the content for Section Three's page.</p>
        <button 
          onClick={() => handleSectionClick('home')}
          className="px-8 py-3 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition-colors"
        >
          Back to Home
        </button>
      </div>
    ),
    'page-four': (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-purple-100">
        <h1 className="text-5xl font-bold mb-6">Page Four</h1>
        <p className="text-xl mb-8">This is the content for Section Four's page.</p>
        <button 
          onClick={() => handleSectionClick('home')}
          className="px-8 py-3 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition-colors"
        >
          Back to Home
        </button>
      </div>
    )
  };
  
  return pageContent[currentPage];
};

export default Project;