import React, { useEffect, useRef, useState } from 'react';

const Slide = () => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false); // Reset animation when out of view
        }
      },
      {
        threshold: 0.5 // Trigger when element is 50% visible
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={elementRef}
      className="h-screen w-full flex items-center justify-center"
    >
      <div className="relative w-full flex justify-center items-center overflow-hidden bottom-96  ">
        <div 
          className={`transform-gpu text-7xl font-bold text-blue-500 transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
          }`}
        >
          Project
        </div>
        <div 
          className={`transform-gpu text-7xl font-bold text-green-500 ml-2 transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}
        >
          Section
        </div>
      </div>
    </div>
  );
};

export default Slide;