import React, { useEffect, useRef, useState } from 'react';

const Projects = () => {
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
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate the total height of the scrollable area
      const totalHeight = container.offsetHeight;
      // Calculate the height of one "section" - this is important for proper pacing
      const sectionHeight = totalHeight / cards.length;
      
      // Calculate which card should be active based on scroll position
      const scrollRatio = scrollPosition / (totalHeight - windowHeight);
      const activeCardIndex = Math.min(
        Math.floor(scrollRatio * cards.length),
        cards.length - 1
      );
      
      // Define entry directions for each card
      const directions = ['none', 'right', 'bottom', 'top', 'left'];
      
      cards.forEach((card, index) => {
        // Reset transforms first
        card.style.transform = '';
        
        if (index === activeCardIndex) {
          // Active card - centered
          card.classList.add('active');
          card.style.opacity = '1';
          card.style.transform = 'translate(0, 0)';
        } else if (index > activeCardIndex) {
          // Cards that haven't appeared yet - position off-screen based on their direction
          card.classList.remove('active');
          card.style.opacity = '0';
          
          const direction = directions[index % directions.length];
          switch (direction) {
            case 'right':
              card.style.transform = 'translateX(100%)';
              break;
            case 'bottom':
              card.style.transform = 'translateY(100%)';
              break;
            case 'top':
              card.style.transform = 'translateY(-100%)';
              break;
            case 'left':
              card.style.transform = 'translateX(-100%)';
              break;
          }
        } else {
          // Cards that have already been shown - move off-screen in opposite direction
          card.classList.remove('active');
          card.style.opacity = '0';
          
          const direction = directions[index % directions.length];
          switch (direction) {
            case 'right':
              card.style.transform = 'translateX(-100%)';
              break;
            case 'bottom':
              card.style.transform = 'translateY(-100%)';
              break;
            case 'top':
              card.style.transform = 'translateY(100%)';
              break;
            case 'left':
              card.style.transform = 'translateX(100%)';
              break;
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    // Initial call to set positions
    setTimeout(handleScroll, 100);
    
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
    // This is key - calculate exactly how much scrolling space we need
    // for 5 cards, we need 5 * 100vh of scrollable area
    minHeight: `calc(${5 * 100}vh)` 
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
          {/* Card 1 - Projects Introduction */}
          <div 
            className="scroll-card card-1 w-full h-full absolute flex flex-col justify-center items-center text-center p-4 sm:p-8 rounded-lg shadow-xl transition-all duration-1000"
            style={{ 
              background: 'linear-gradient(135deg, rgba(0, 107, 84, 0.9) 0%, rgba(0, 173, 136, 0.8) 100%)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
          >
            <div className="card-content max-w-4xl">
              <div className="text-bubble">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-6 text-white text-glow">
                  My Projects
                </h2>
              </div>
              <p className="text-base sm:text-lg md:text-xl max-w-xs sm:max-w-md md:max-w-2xl text-white">
                Discover innovative solutions I've built to solve real-world problems.
                Each project represents my passion for creating impactful applications.
              </p>
              <div className="mt-8 scroll-indicator">
                <span className="text-white text-sm">Scroll to explore my work</span>
                <svg className="w-6 h-6 mx-auto mt-2 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              
              <div className="absolute bottom-4 w-full flex justify-between px-8">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-btn linkedin-btn">
                  <div className="bg-white bg-opacity-20 p-3 rounded-full hover-lift flex items-center space-x-2">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span className="text-white font-semibold">LinkedIn</span>
                  </div>
                </a>
                
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-btn github-btn">
                  <div className="bg-white bg-opacity-20 p-3 rounded-full hover-lift flex items-center space-x-2">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="text-white font-semibold">GitHub</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Card 2 - Aurleaf Project */}
          <div 
            className="scroll-card card-2 w-full h-full absolute flex flex-col justify-center items-center text-center p-4 sm:p-8 rounded-lg shadow-xl transition-all duration-1000 translate-x-full"
            style={{ 
              background: 'linear-gradient(135deg, #2a7d60 0%, #38a583 100%)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
          >
            <div className="card-content max-w-4xl">
              <div className="leaf-icon float-animation">
                <svg className="w-16 h-16 mx-auto mb-4 text-green-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.56 1.14c-.69-.23-1.43.14-1.66.83-.23.7.14 1.44.84 1.67 8.33 2.65 9.58 12.06 9.6 12.14.11.6.61 1.04 1.2 1.04a1.25 1.25 0 001.13-1.1 1.19 1.19 0 00.01-.14c0-.56-1.34-11.31-11.12-14.44zM6.31 3.76c-.58.18-.93.76-.82 1.35l1.94 9.47c.11.58.63.99 1.21.99.08 0 .17-.01.25-.03.67-.14 1.11-.79.97-1.46L8.04 4.67c-.15-.68-.81-1.11-1.48-.96l-.25.05z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-6 text-white text-glow">
                Aurleaf
              </h2>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-green-200">
                Ayurvedic Medical Platform
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-4">
                <div className="bg-white bg-opacity-10 p-5 rounded-lg feature-card hover-lift">
                  <div className="feature-icon pulse-animation">🩺</div>
                  <h4 className="text-lg font-bold text-white mb-2">Medical Equipment</h4>
                  <p className="text-white text-opacity-90">Blood sugar monitors and healthcare devices</p>
                </div>
                <div className="bg-white bg-opacity-10 p-5 rounded-lg feature-card hover-lift">
                  <div className="feature-icon pulse-animation">👨‍⚕️</div>
                  <h4 className="text-lg font-bold text-white mb-2">Doctor Directory</h4>
                  <p className="text-white text-opacity-90">Find Ayurvedic practitioners with ratings</p>
                </div>
                <div className="bg-white bg-opacity-10 p-5 rounded-lg feature-card hover-lift">
                  <div className="feature-icon pulse-animation">🤖</div>
                  <h4 className="text-lg font-bold text-white mb-2">AI Chatbot</h4>
                  <p className="text-white text-opacity-90">Health queries and Ayurvedic treatments</p>
                </div>
                <div className="bg-white bg-opacity-10 p-5 rounded-lg feature-card hover-lift">
                  <div className="feature-icon pulse-animation">🥗</div>
                  <h4 className="text-lg font-bold text-white mb-2">AI Diet & Exercise Planner</h4>
                  <p className="text-white text-opacity-90">Personalized health recommendations</p>
                </div>
              </div>
              
              <div className="tech-stack mt-4">
                <h4 className="text-lg font-semibold text-green-200 mb-2">Tech Stack</h4>
                <div className="flex flex-wrap justify-center gap-3 mb-4">
                  <span className="tech-badge">React</span>
                  <span className="tech-badge">Express</span>
                  <span className="tech-badge">OpenAI</span>
                  <span className="tech-badge">Google Maps API</span>
                  <span className="tech-badge">MongoDB</span>
                </div>
              </div>
              
              <div className="absolute bottom-4 w-full flex justify-between px-8">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-btn linkedin-btn">
                  <div className="bg-white bg-opacity-20 p-3 rounded-full hover-lift flex items-center space-x-2">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span className="text-white font-semibold">LinkedIn</span>
                  </div>
                </a>
                
                <a href="https://github.com/your-username/aurleaf" target="_blank" rel="noopener noreferrer" className="social-btn github-btn">
                  <div className="bg-white bg-opacity-20 p-3 rounded-full hover-lift flex items-center space-x-2">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="text-white font-semibold">View Code</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Card 3 - Project 2 (Example) */}
          <div 
            className="scroll-card card-3 w-full h-full absolute flex flex-col justify-center items-center text-center p-4 sm:p-8 rounded-lg shadow-xl transition-all duration-1000 translate-y-full"
            style={{ 
              background: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
          >
            <div className="card-content max-w-4xl">
              <div className="project-icon rotate-animation">
                <svg className="w-16 h-16 mx-auto mb-4 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-6 text-white text-glow">
                Project Two
              </h2>
              <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-blue-200">
                Innovative Solution
              </h3>
              
              <p className="text-base sm:text-lg md:text-xl max-w-xs sm:max-w-md md:max-w-2xl text-white mb-8">
                A detailed description of your second project would go here. This section 
                showcases the unique features and technologies used in this application.
              </p>
              
              <div className="tech-stack mt-4">
                <h4 className="text-lg font-semibold text-blue-200 mb-2">Tech Stack</h4>
                <div className="flex flex-wrap justify-center gap-3">
                  <span className="tech-badge">React</span>
                  <span className="tech-badge">Node.js</span>
                  <span className="tech-badge">Firebase</span>
                  <span className="tech-badge">Tailwind CSS</span>
                </div>
              </div>
              
              <div className="absolute bottom-4 w-full flex justify-between px-8">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-btn linkedin-btn">
                  <div className="bg-white bg-opacity-20 p-3 rounded-full hover-lift flex items-center space-x-2">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span className="text-white font-semibold">LinkedIn</span>
                  </div>
                </a>
                
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-btn github-btn">
                  <div className="bg-white bg-opacity-20 p-3 rounded-full hover-lift flex items-center space-x-2">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="text-white font-semibold">View Code</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Card 4 - Project 3 (Example) */}
          <div 
            className="scroll-card card-4 w-full h-full absolute flex flex-col justify-center items-center text-center p-4 sm:p-8 rounded-lg shadow-xl transition-all duration-1000 -translate-y-full"
            style={{ 
              background: 'linear-gradient(135deg, #000428 0%, #014d61 100%)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
          >
            <div className="card-content max-w-4xl">
              <div className="project-icon wave-animation">
                <svg className="w-16 h-16 mx-auto mb-4 text-purple-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-6 text-white text-glow">
                Project Three
              </h2>
              <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-purple-200">
                Creative Solution
              </h3>
              
              <p className="text-base sm:text-lg md:text-xl max-w-xs sm:max-w-md md:max-w-2xl text-white mb-8">
                A detailed description of your third project would go here. This section 
                highlights the challenges overcome and the impact created through this application.
              </p>
              
              <div className="tech-stack mt-4">
                <h4 className="text-lg font-semibold text-purple-200 mb-2">Tech Stack</h4>
                <div className="flex flex-wrap justify-center gap-3">
                  <span className="tech-badge">Next.js</span>
                  <span className="tech-badge">GraphQL</span>
                  <span className="tech-badge">AWS</span>
                  <span className="tech-badge">Stripe</span>
                </div>
              </div>
              
              <div className="absolute bottom-4 w-full flex justify-between px-8">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-btn linkedin-btn">
                  <div className="bg-white bg-opacity-20 p-3 rounded-full hover-lift flex items-center space-x-2">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span className="text-white font-semibold">LinkedIn</span>
                  </div>
                </a>
                
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-btn github-btn">
                  <div className="bg-white bg-opacity-20 p-3 rounded-full hover-lift flex items-center space-x-2">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="text-white font-semibold">View Code</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
          
          {/* Card 5 - Contact Card */}
          <div 
            className="scroll-card card-5 w-full h-full absolute flex flex-col justify-center items-center text-center p-4 sm:p-8 rounded-lg shadow-xl transition-all duration-1000 -translate-x-full"
            style={{ 
              background: 'linear-gradient(135deg, #3a0647 0%, #200122 100%)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
          >
            <div className="card-content max-w-4xl">
              <div className="project-icon heartbeat-animation">
                <svg className="w-16 h-16 mx-auto mb-4 text-pink-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-8.486 8.486l4.243 4.243 4.243-4.243a6 6 0 000-8.486z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-6 text-white text-glow">
                Let's Connect
              </h2>
              <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-pink-200">
                Interested in working together?
              </h3>
              
              <p className="text-base sm:text-lg md:text-xl max-w-xs sm:max-w-md md:max-w-2xl text-white mb-8">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <a 
                  href="mailto:contact@example.com" 
                  className="px-6 py-3 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center hover-lift"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Me
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-6 py-3 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center hover-lift"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
              
              <div className="text-center mt-6">
                <p className="text-white text-opacity-80">
                  Thank you for exploring my projects. Let's create something amazing together!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
