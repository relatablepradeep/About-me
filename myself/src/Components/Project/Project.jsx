import React, { useState, useEffect } from 'react';

const Project = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  
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
  
  const sections = [
    {
      title: "Section One",
      content: "This is the first section that appears from the left side.",
      direction: "left",
      bgColor: "bg-blue-100"
    },
    {
      title: "Section Two",
      content: "This is the second section that appears from the right side.",
      direction: "right",
      bgColor: "bg-green-100"
    },
    {
      title: "Section Three",
      content: "This is the third section that appears again from the left side.",
      direction: "left",
      bgColor: "bg-yellow-100"
    },
    {
      title: "Section Four",
      content: "This is the fourth section that appears from the right side.",
      direction: "right",
      bgColor: "bg-purple-100"
    }
  ];
  
  return (
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
          }`}
        >
          <div className="text-center p-6 max-w-2xl">
            <h2 className="text-4xl font-bold mb-4">{section.title}</h2>
            <p className="text-xl">{section.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Project;