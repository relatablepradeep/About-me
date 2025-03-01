import React, { useEffect, useRef, useState } from 'react';

const Service = () => {
  const containerRef = useRef(null);
  const [navHeight, setNavHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  
  useEffect(() => {
    // Get navbar and footer heights
    const updateHeights = () => {
      const navbar = document.querySelector('nav');
      const footer = document.querySelector('footer');
      
      if (navbar) setNavHeight(navbar.offsetHeight);
      if (footer) setFooterHeight(footer.offsetHeight);
    };
    
    // Initial height calculation
    updateHeights();
    
    // Set up a ResizeObserver to detect when nav or footer change size
    const resizeObserver = new ResizeObserver(updateHeights);
    const navbar = document.querySelector('nav');
    const footer = document.querySelector('footer');
    
    if (navbar) resizeObserver.observe(navbar);
    if (footer) resizeObserver.observe(footer);
    
    // Improved scroll effect logic
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      
      const cards = Array.from(container.querySelectorAll('.scroll-card'));
      const containerTop = container.getBoundingClientRect().top;
      const containerHeight = container.getBoundingClientRect().height;
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the container is visible
      // This fixes the scroll calculation to be more accurate
      let scrollProgress;
      
      if (containerTop > windowHeight) {
        // Container is below viewport
        scrollProgress = 0;
      } else if (containerTop + containerHeight < 0) {
        // Container is above viewport
        scrollProgress = 1;
      } else {
        // Container is partially in viewport
        // Adjusted calculation for smoother transitions
        scrollProgress = Math.min(1, Math.max(0, 
          (windowHeight - containerTop) / (windowHeight + containerHeight)
        ));
      }
      
      const numCards = cards.length;
      const cardStep = 1 / numCards;
      
      cards.forEach((card, index) => {
        // Calculate when this card should be active
        const cardStartThreshold = cardStep * index;
        const cardEndThreshold = cardStep * (index + 1);
        
        if (scrollProgress >= cardStartThreshold && scrollProgress < cardEndThreshold) {
          card.classList.add('card-active');
          card.classList.remove('card-before', 'card-after');
        } else if (scrollProgress < cardStartThreshold) {
          card.classList.add('card-after');
          card.classList.remove('card-active', 'card-before');
        } else {
          card.classList.add('card-before');
          card.classList.remove('card-active', 'card-after');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // Call on resize too
    
    // Initial call to set positions
    setTimeout(handleScroll, 100); // Small delay to ensure DOM is ready
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      resizeObserver.disconnect();
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="relative w-full scroll-container"
      style={{ 
        minHeight: `calc(300vh)` // Make sure there's enough space to scroll
      }}
    >
      <div className="relative w-full min-h-screen">
        {/* Card Container - maintains proper height to enable scrolling */}
        <div 
          className="sticky top-0 w-full flex items-center justify-center" 
          style={{ 
            height: `calc(100vh - ${navHeight}px - ${footerHeight}px)`, 
            top: `${navHeight}px` 
          }}
        >
          {/* Card 1 */}
          <div className="scroll-card card-1 w-11/12 h-5/6 absolute flex flex-col justify-center items-center text-center p-4 sm:p-8 bg-white rounded-lg shadow-xl transition-all duration-1000">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-6">Card One</h2>
            <p className="text-base sm:text-lg md:text-xl max-w-xs sm:max-w-md md:max-w-2xl">This is the first card. Scroll down to see the next card.</p>
          </div>
          
          {/* Card 2 - from right */}
          <div className="scroll-card card-2 w-11/12 h-5/6 absolute flex flex-col justify-center items-center text-center p-4 sm:p-8 bg-gray-100 rounded-lg shadow-xl transition-all duration-1000 translate-x-full">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-6">Card Two</h2>
            <p className="text-base sm:text-lg md:text-xl max-w-xs sm:max-w-md md:max-w-2xl">This is the second card. Continue scrolling to see more cards.</p>
          </div>
          
          {/* Card 3 - from bottom */}
          <div className="scroll-card card-3 w-11/12 h-5/6 absolute flex flex-col justify-center items-center text-center p-4 sm:p-8 bg-gray-200 rounded-lg shadow-xl transition-all duration-1000 translate-y-full">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-6">Card Three</h2>
            <p className="text-base sm:text-lg md:text-xl max-w-xs sm:max-w-md md:max-w-2xl">This is the third card. One more to go!</p>
          </div>
          
          {/* Card 4 - from top */}
          <div className="scroll-card card-4 w-11/12 h-5/6 absolute flex flex-col justify-center items-center text-center p-4 sm:p-8 bg-gray-300 rounded-lg shadow-xl transition-all duration-1000 -translate-y-full">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-6">Card Four</h2>
            <p className="text-base sm:text-lg md:text-xl max-w-xs sm:max-w-md md:max-w-2xl">This is the last card. Scroll back up to see previous cards.</p>
          </div>
        </div>
        
        {/* These spacers create the scrolling area for our effect */}
        <div className="h-screen"></div>
        <div className="h-screen"></div>
        <div className="h-screen"></div>
      </div>
      
      <style jsx>{`
        .card-active {
          transform: translate(0, 0) !important;
          z-index: 40;
          opacity: 1;
        }
        
        .card-before {
          z-index: 30;
          opacity: 0.5;
        }
        
        .card-after {
          z-index: 30;
          opacity: 0.5;
        }
        
        /* Direction-specific transitions */
        .card-1.card-before {
          transform: translate(-150%, 0) !important;
        }
        
        .card-2.card-before {
          transform: translate(0, -150%) !important;
        }
        
        .card-3.card-before {
          transform: translate(-150%, 0) !important;
        }
        
        .card-4.card-before {
          transform: translate(0, -150%) !important;
        }
        
        .card-1.card-after {
          transform: translate(150%, 0) !important;
        }
        
        .card-2.card-after {
          transform: translate(0, 150%) !important;
        }
        
        .card-3.card-after {
          transform: translate(150%, 0) !important;
        }
        
        .card-4.card-after {
          transform: translate(0, 150%) !important;
        }
        
        .scroll-card {
          transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease;
        }
      `}</style>
    </div>
  );
};

export default Service;