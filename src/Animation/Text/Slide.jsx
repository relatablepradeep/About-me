import React, { useEffect, useRef, useState } from 'react';

const Slide = () => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When element comes into view
        if (entry.isIntersecting) {
          // Clear any existing timeout
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          setIsVisible(true);
        } else {
          // When element goes out of view
          setIsVisible(false);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '-50px' // Adds a small margin to trigger animation earlier
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className="w-full flex justify-center items-center h-48 overflow-hidden"
    >
      <div className="relative flex gap-3 sm:gap-4 md:gap-6">
        {/* Project Text */}
        <div
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-blue-600 transform transition-all duration-1000 ease-in-out ${
            isVisible
              ? 'translate-x-0 opacity-100'
              : '-translate-x-[400%] opacity-0'
          }`}
        >
          Project
        </div>

        {/* Section Text */}
        <div
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-green-600 transform transition-all duration-1000 ease-in-out ${
            isVisible
              ? 'translate-x-0 opacity-100'
              : 'translate-x-[400%] opacity-0'
          }`}
        >
          Section
        </div>
      </div>
    </div>
  );
};

export default Slide;