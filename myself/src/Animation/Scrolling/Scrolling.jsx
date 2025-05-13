import React, { useEffect, useRef, useState } from 'react';

const Scrolling = () => {
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

    // Scroll effect logic
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const cards = Array.from(container.querySelectorAll('.scroll-card'));
      const containerTop = container.getBoundingClientRect().top;
      const containerHeight = container.getBoundingClientRect().height;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress
      let scrollProgress;
      if (containerTop > windowHeight) {
        scrollProgress = 0;
      } else if (containerTop + containerHeight < 0) {
        scrollProgress = 1;
      } else {
        scrollProgress = Math.min(
          1,
          Math.max(0, (windowHeight - containerTop) / (windowHeight + containerHeight))
        );
      }

      const numCards = cards.length;
      const cardStep = 1 / numCards;

      cards.forEach((card, index) => {
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
      className="relative w-full max-w-7xl xl:max-w-9xl mx-auto scroll-container bg-white"
      style={{
        minHeight: `calc(200vh)`, // Maintain compact scrolling area
      }}
    >
      <div className="relative w-full min-h-screen">
        {/* Card Container */}
        <div
          className="sticky top-0 w-full flex items-center justify-center overflow-hidden"
          style={{
            height: `calc(100vh - ${navHeight}px - ${footerHeight}px)`,
            top: `${navHeight}px`,
          }}
        >
          {/* Card 1 - Portfolio Introduction */}
          <div
            className="scroll-card card-1 w-full max-w-4xl lg:max-w-6xl xl:max-w-7xl h-3/4 sm:h-4/5 absolute flex flex-col justify-center items-center text-center p-4 sm:p-8 rounded-lg shadow-xl transition-all duration-1000"
            style={{
              background: 'linear-gradient(135deg, rgba(243, 244, 246, 0.9) 0%, rgba(209, 213, 219, 0.8) 100%)', // Light gray to off-white
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
            }}
          >
            <div className="card-content">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-6 text-yellow-600 text-glow">
                Full-Stack Developer
              </h2>
              <p className="text-base sm:text-lg md:text-xl max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl text-gray-700">
                Transforming ideas into powerful web applications with modern technologies. I specialize in creating seamless, responsive experiences that solve real problems.
              </p>
              <div className="mt-8 scroll-indicator">
                <span className="text-gray-700 text-sm">Scroll to explore</span>
                <svg
                  className="w-6 h-6 mx-auto mt-2 text-yellow-600 animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Card 2 - Technical Skills */}
          <div
            className="scroll-card card-2 w-full max-w-4xl lg:max-w-6xl xl:max-w-7xl h-3/4 sm:h-4/5 absolute flex flex-col justify-center items-center text-center p-4 sm:p-8 rounded-lg shadow-xl transition-all duration-1000 translate-x-full"
            style={{
              background: 'linear-gradient(135deg, rgba(229, 231, 235, 0.9) 0%, rgba(209, 213, 219, 0.8) 100%)', // Lighter gray
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
            }}
          >
            <div className="card-content">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-yellow-600 text-glow">
                Technical Toolkit
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {['React', 'Node.js', 'Express', 'Socket.io', 'OAuth', 'Discord.js'].map((tech, idx) => (
                  <div
                    key={idx}
                    className="bg-white bg-opacity-20 p-4 rounded-lg hover-lift skill-card"
                  >
                    <div className="tech-icon text-yellow-600">⚙️</div>
                    <span className="text-gray-700 font-bold">{tech}</span>
                  </div>
                ))}
              </div>
              <p className="text-base sm:text-lg md:text-xl max-w-xs sm:max-w-md md:max-w-lg text-gray-700">
                Building complete solutions with clean, maintainable code architecture.
              </p>
            </div>
          </div>

          {/* Card 3 - Approach */}
          <div
            className="scroll-card card-3 w-full max-w-4xl lg:max-w-6xl xl:max-w-9xl h-3/4 sm:h-4/5 absolute flex flex-col justify-center items-center text-center p-4 sm:p-8 rounded-lg shadow-xl transition-all duration-1000 translate-y-full"
            style={{
              background: 'linear-gradient(135deg, rgba(243, 244, 246, 0.9) 0%, rgba(229, 231, 235, 0.8) 100%)', // Off-white to light gray
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
            }}
          >
            <div className="card-content overflow-y-auto max-h-full ">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-yellow-600 text-glow">
                My Approach
              </h2>
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                {[
                  { icon: '🚀', title: 'Problem Solver', desc: 'Finding elegant solutions to complex challenges' },
                  { icon: '🎨', title: 'Creative Thinker', desc: 'Bringing innovative ideas to every project' },
                  { icon: '🔄', title: 'Agile Workflow', desc: 'Adapting quickly to changing requirements' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white bg-opacity-20 p-5 rounded-lg hover-lift approach-card"
                  >
                    <div className="approach-icon text-yellow-600">{item.icon}</div>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">{item.title}</h3>
                    <p className="text-gray-700 text-opacity-90">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-base sm:text-lg md:text-xl max-w-xs sm:max-w-md md:max-w-lg text-gray-700">
                {/* Every project begins with understanding your needs  */}
              </p>
            </div>
          </div>

          {/* Card 4 - Call to Action */}
          <div
            className="scroll-card card-4 w-full max-w-4xl lg:max-w-6xl xl:max-w-7xl h-3/4 sm:h-4/5 absolute flex flex-col justify-center items-center text-center p-4 sm:p-8 rounded-lg shadow-xl transition-all duration-1000 -translate-y-full"
            style={{
              background: 'linear-gradient(135deg, rgba(229, 231, 235, 0.9) 0%, rgba(209, 213, 219, 0.8) 100%)', // Light gray
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
            }}
          >
            <div className="card-content">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-yellow-600 text-glow">
                Let's Build Together
              </h2>
              <p className="text-base sm:text-lg md:text-xl max-w-xs sm:max-w-md md:max-w-lg text-gray-700 mb-8">
                Ready to bring your vision to life? Let's create something amazing together.
              </p>
              <button className="cta-button bg-yellow-600 text-gray-900 font-bold py-3 px-8 rounded-full transition-all duration-300 hover:bg-yellow-500 hover:shadow-lg">
                Contact Me
              </button>
              <div className="flex justify-center mt-8 gap-6">
                {[
                  { platform: 'GitHub', icon: <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /> },
                  { platform: 'LinkedIn', icon: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /> },
                  { platform: 'Twitter', icon: <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /> },
                ].map((social, idx) => (
                  <a key={idx} href="#" className="social-icon">
                    <div className="bg-white bg-opacity-20 p-3 rounded-full hover-lift">
                      <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                        {social.icon}
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Spacers for scrolling effect */}
        <div className="h-[50vh]"></div>
        <div className="h-[50vh]"></div>
        <div className="h-[50vh]"></div>
      </div>

      <style jsx>{`
        /* Card positioning animations */
        .card-active {
          transform: translate(0, 0) !important;
          z-index: 40;
          opacity: 1;
        }

        .card-before {
          z-index: 30;
          opacity: 0;
        }

        .card-after {
          z-index: 30;
          opacity: 0;
        }

        /* Direction-specific transitions */
        .card-1.card-before {
          transform: translate(-100%, 0) !important;
        }

        .card-2.card-before {
          transform: translate(0, -100%) !important;
        }

        .card-3.card-before {
          transform: translate(-100%, 0) !important;
        }

        .card-4.card-before {
          transform: translate(0, -100%) !important;
        }

        .card-1.card-after {
          transform: translate(100%, 0) !important;
        }

        .card-2.card-after {
          transform: translate(0, 100%) !important;
        }

        .card-3.card-after {
          transform: translate(100%, 0) !important;
        }

        .card-4.card-after {
          transform: translate(0, 100%) !important;
        }

        .scroll-card {
          transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease;
        }

        /* Content animations */
        .card-active .card-content {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        /* Interactive elements */
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        /* Text glow effect */
        .text-glow {
          text-shadow: 0 0 10px rgba(234, 179, 8, 0.5);
        }

        /* Tech and approach icons */
        .tech-icon,
        .approach-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .approach-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        /* Skill and approach card hover effects */
        .skill-card,
        .approach-card {
          transition: all 0.3s ease;
        }

        .skill-card:hover,
        .approach-card:hover {
          background-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-5px);
        }

        /* CTA button animation */
        .cta-button {
          position: relative;
          overflow: hidden;
        }

        .cta-button:before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: 0.5s;
        }

        .cta-button:hover:before {
          left: 100%;
        }

        /* Social icons */
        .social-icon {
          transition: transform 0.3s ease;
        }

        .social-icon:hover {
          transform: scale(1.1);
        }

        /* Content fade-in animation */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Bounce animation for scroll indicator */
        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-20px);
          }
          60% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Scrolling;