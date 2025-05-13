import React, { useState, useEffect, useRef } from 'react';
import Aurleaf1 from '../../Photos/Aurleaf1.png';
import aurleaf2 from '../../Photos/aurLeaf2.png';
import aurleaf3 from '../../Photos/aurleaf4.png';

const Stack = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentBackgrounds, setCurrentBackgrounds] = useState({});
  
  // Refs for animation timing
  const animationRef = useRef(null);
  const lastUpdateTimeRef = useRef(Date.now());
  const backgroundUpdateIntervalRef = useRef(2000); // 2 seconds in ms
  
  // Projects with background-url strings - removed titles and descriptions
  const projects = [
    {
      backgroundUrls: [
        Aurleaf1, 
        aurleaf2, 
        aurleaf3,
      ],
      githubLink: 'https://github.com/relatablepradeep/Aurleaf',
      liveLink: 'https://ayurleaf.vercel.app/',
    },
    {
      backgroundUrls: [
        '/Photos/taskmanager.png',
        '/Photos/taskmanager.png',
      ],
      githubLink: '#taskmanager-github',
      liveLink: '#taskmanager-live',
    },
    {
      backgroundUrls: [
        '/Photos/ecommerce1.png',
        '/Photos/ecommerce2.png',
        '/Photos/ecommerce1.png',
      ],
      githubLink: '#ecommerce-github',
      liveLink: '#ecommerce-live',
    },
    {
      backgroundUrls: [
        '/Photos/fitness.png',
        '/Photos/fitness.png',
      ],
      githubLink: '#fitness-github',
      liveLink: '#fitness-live',
    },
  ];

  // Initialize background state for each project
  useEffect(() => {
    const initialBackgrounds = {};
    projects.forEach((project, index) => {
      initialBackgrounds[index] = 0;
    });
    setCurrentBackgrounds(initialBackgrounds);
  }, []);

  // Slide rotation effect (changing between projects)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
      }
    }, 5000); // Change slides every 5 seconds
    return () => clearInterval(interval);
  }, [isPaused, projects.length]);

  // Background image rotation animation frame
  const updateBackgrounds = useRef(() => {
    const now = Date.now();
    const elapsed = now - lastUpdateTimeRef.current;
    
    // Only update backgrounds if enough time has passed
    if (elapsed > backgroundUpdateIntervalRef.current && !isPaused) {
      setCurrentBackgrounds(prev => {
        const updated = { ...prev };
        // Update background for all projects, not just the current one
        for (let i = 0; i < projects.length; i++) {
          if (projects[i].backgroundUrls.length > 1) {
            updated[i] = (updated[i] + 1) % projects[i].backgroundUrls.length;
          }
        }
        return updated;
      });
      
      // Reset timer
      lastUpdateTimeRef.current = now;
    }
    
    // Schedule next frame
    animationRef.current = requestAnimationFrame(updateBackgrounds.current);
  });

  // Start and stop the animation frame loop
  useEffect(() => {
    // Start the animation frame loop
    animationRef.current = requestAnimationFrame(updateBackgrounds.current);
    
    // Clean up function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, projects]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  return (
    <div className="w-full h-[90vh] flex justify-center items-center bg-gray-50">
      <div className="relative w-full h-full overflow-hidden shadow-lg">
        {/* Navigation buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-yellow-600 hover:text-white p-2 rounded-full shadow-lg transition-all duration-300 z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-yellow-600 hover:text-white p-2 rounded-full shadow-lg transition-all duration-300 z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slides */}
        {projects.map((project, index) => {
          // Get the current background URL for this project
          const bgIndex = currentBackgrounds[index] || 0;
          const bgUrl = project.backgroundUrls[bgIndex];
          
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out
                ${
                  currentIndex === index
                    ? 'opacity-100 translate-x-0 scale-100'
                    : currentIndex > index
                    ? 'opacity-0 -translate-x-full scale-95'
                    : 'opacity-0 translate-x-full scale-95'
                }`}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Dynamic background image with faster transition */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                style={{
                  backgroundImage: `url(${bgUrl})`,
                  opacity: 0.7, // Increased opacity to make backgrounds more visible
                }}
              />

              <div className="relative h-full flex flex-col">
                {/* Content - removed title and description */}
                <div className="flex-1"></div>

                {/* Bottom Links */}
                <div className="flex justify-between items-center p-3 md:p-4 bg-white shadow-inner">
                  <a
                    href={project.githubLink}
                    className="flex items-center gap-2 text-gray-800 hover:text-yellow-600 bg-white hover:bg-gray-100 px-3 py-2 md:px-4 md:py-2 rounded-lg shadow transition-all hover:shadow-md text-sm md:text-base"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                  <a
                    href={project.liveLink}
                    className="flex items-center gap-2 text-white bg-yellow-600 hover:bg-yellow-700 px-3 py-2 md:px-4 md:py-2 rounded-lg shadow transition-all hover:shadow-md text-sm md:text-base"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Live Preview
                  </a>
                </div>
              </div>
            </div>
          );
        })}

        {/* Slider indicators */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                currentIndex === index ? 'bg-yellow-600 w-4 md:w-6' : 'bg-gray-300 hover:bg-yellow-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stack;