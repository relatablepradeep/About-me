import { useState, useEffect, useRef } from 'react';

// Import your images
import Aurleaf1 from '../../Photos/Aurleaf1.png'
// import aurleaf2 from '../../Photos/aurLeaf2.png';
import aurleaf3 from '../../Photos/aurleaf3.png';
import aurleaf4 from '../../Photos/aurleaf4.png';

// Custom hook for intersection observer
function useIntersectionObserver(options = {}) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!elementRef.current) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);
    
    observer.observe(elementRef.current);
    
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [elementRef, options]);

  return [elementRef, isVisible];
}

// Reusable scroll reveal component
function ScrollReveal({ children, delay = 0, className = "" }) {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${className} ${
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-16"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function AurleafFullPage() {
  // Image slider state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Sample images - replace with your own images
  const images = [
    { url: Aurleaf1, alt: "Aurleaf Image 1" },
    // { url: aurleaf2, alt: "Aurleaf Image 2" },
    { url: aurleaf3, alt: "Aurleaf Image 3" },
    { url: aurleaf4, alt: "Aurleaf Image 4" },
  ];

  // Auto-advance the slider every 5 seconds (but pause when hovered)
  useEffect(() => {
    if (isHovered) return;
    
    const timer = setInterval(() => {
      goToNext();
    }, 5000);
    
    return () => clearInterval(timer);
  }, [currentIndex, isHovered]);

  // Rotate animated text every 10 seconds
  useEffect(() => {
    const textTimer = setInterval(() => {
      setTextIndex(prevIndex => (prevIndex + 1) % projectTexts.length);
    }, 10000);
    
    return () => clearInterval(textTimer);
  }, []);

  const goToNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const goToPrevious = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    
    setIsAnimating(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Handle slider click event
  const handleSliderClick = () => {
    goToNext();
  };

  // Handle touch events for mobile swiping
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      goToNext();
    }
    
    if (touchStart - touchEnd < -50) {
      // Swipe right to previous
      goToPrevious();
    }
  };

  // Mouse enter/leave for slider hover state
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Rotating texts for slider
  const projectTexts = [
    "Bringing ancient Ayurvedic wisdom to life through modern technology",
    "Empowering users with personalized health plans and expert guidance",
    "Connect with qualified Ayurvedic doctors and practitioners near you",
    "Discover natural remedies and solutions for better health and wellness"
  ];

  // For tech stack items with icons/emojis
  const renderTechItem = (emoji, title, description) => (
    <div className="flex items-start space-x-3 mb-2">
      <div className="text-xl md:text-2xl mt-1">{emoji}</div>
      <div>
        <span className="font-bold text-amber-700">{title}:</span> {description}
      </div>
    </div>
  );

  // For features list with icons
  const renderFeature = (emoji, title, description) => (
    <div className="mb-6">
      <h3 className="flex items-center text-lg font-medium text-amber-800 mb-2">
        <span className="mr-2 text-xl">{emoji}</span> {title}
      </h3>
      <p className="text-gray-700 pl-7">{description}</p>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 bg-gradient-to-br from-amber-50 to-white">
      {/* Image Slider Section with enhanced visual cues */}
      <ScrollReveal>
        <div 
          className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg shadow-xl mb-8 transition-all duration-500 ease-in-out hover:shadow-2xl cursor-pointer group"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={handleSliderClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Gradient Overlay with enhanced effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-100/30 to-amber-50/30 z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-50"></div>
          
          {/* Navigation arrows */}
          <div className="absolute inset-y-0 left-0 z-20 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }} 
              className="bg-white/70 hover:bg-white/90 transition-colors p-2 rounded-r-lg shadow-md"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          
          <div className="absolute inset-y-0 right-0 z-20 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }} 
              className="bg-white/70 hover:bg-white/90 transition-colors p-2 rounded-l-lg shadow-md"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Interactive hint badge */}
          <div className="absolute top-4 right-4 z-20 bg-amber-600 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
            Click to navigate
          </div>
          
          {/* Slider Images with enhanced transitions */}
          <div className="w-full h-full relative">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out transform ${
                  index === currentIndex 
                    ? "opacity-100 translate-x-0 scale-100" 
                    : index < currentIndex 
                      ? "opacity-0 -translate-x-full scale-95" 
                      : "opacity-0 translate-x-full scale-95"
                }`}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          {/* Enhanced Dots Navigation with clickable functionality */}
          <div className="absolute bottom-4 w-full flex justify-center gap-2 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-white scale-125 shadow-md" 
                    : "bg-white bg-opacity-50 hover:bg-opacity-75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Animated Text Section with improved transitions */}
      <ScrollReveal delay={200}>
        <div className="w-full mb-10 h-16 overflow-hidden relative bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-1">
          {projectTexts.map((text, index) => (
            <p 
              key={index} 
              className={`absolute w-full text-center text-lg md:text-xl italic text-amber-700 transition-all duration-1000 ease-in-out transform ${
                index === textIndex 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-8"
              }`}
            >
              {text}
            </p>
          ))}
          
          {/* Visual indicator showing animation is active */}
          <div className="absolute bottom-1 left-0 w-full flex justify-center">
            <div className="relative h-1 w-32 bg-amber-200 rounded-full overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-amber-500 animate-pulse" style={{ width: `${(textIndex + 1) * 25}%` }}></div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Header with improved styling */}
      <ScrollReveal delay={300}>
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4 relative inline-block">
            Aurleaf – Full Tech Stack
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-amber-500 rounded-full"></span>
          </h1>
        </div>
      </ScrollReveal>

      {/* Frontend Section with improved visual hierarchy */}
      <ScrollReveal delay={400}>
        <div className="mb-12 bg-white rounded-lg shadow-md p-6 border border-amber-100 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-bold text-amber-700 mb-4 flex items-center">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 mr-3 text-white text-sm">F</span>
            Frontend
          </h2>
          
          <ul className="space-y-4 pl-4">
            <ScrollReveal delay={500}>
              <li>
                {renderTechItem("💻", "Framework", "`React.js` Handles the client-side logic, dynamic routing, and seamless UI rendering.")}
              </li>
            </ScrollReveal>
            
            <ScrollReveal delay={600}>
              <li>
                {renderTechItem("🎨", "Styling", "`Tailwind CSS` Utility-first CSS framework for fast, responsive design with Ayurvedic-themed amber and white color palettes.")}
              </li>
            </ScrollReveal>
            
            <ScrollReveal delay={700}>
              <li>
                {renderTechItem("🔮", "3D Design & UI Elements", "`Spline` For visually engaging 3D elements and smooth user interface animations.")}
              </li>
            </ScrollReveal>
          </ul>
        </div>
      </ScrollReveal>

      {/* Backend Section with improved visual hierarchy */}
      <ScrollReveal delay={800}>
        <div className="mb-12 bg-white rounded-lg shadow-md p-6 border border-amber-100 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-bold text-amber-700 mb-4 flex items-center">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 mr-3 text-white text-sm">B</span>
            Backend
          </h2>
          
          <ul className="space-y-4 pl-4">
            <ScrollReveal delay={900}>
              <li>
                {renderTechItem("⚙️", "Server Framework", "`Node.js` with `Express.js` Builds the RESTful API architecture that handles data fetching, user requests, chat integration, and disease plan logic.")}
              </li>
            </ScrollReveal>
            
            <ScrollReveal delay={1000}>
              <li>
                <div className="flex items-start space-x-3">
                  <div className="text-xl md:text-2xl mt-1">🗄️</div>
                  <div>
                    <span className="font-bold text-amber-700">Database:</span> `MongoDB` Used to store structured data:
                    <ul className="pl-6 mt-2 space-y-2 list-disc">
                      <li>Disease information</li>
                      <li>Doctor directories</li>
                      <li>User profiles and health conditions</li>
                      <li>Saved AI-generated diet & fitness plans</li>
                      <li>Product and device data (scraped from Amazon)</li>
                    </ul>
                  </div>
                </div>
              </li>
            </ScrollReveal>
          </ul>
        </div>
      </ScrollReveal>

      {/* APIs & Integrations with improved visual hierarchy */}
      <ScrollReveal delay={1100}>
        <div className="mb-12 bg-white rounded-lg shadow-md p-6 border border-amber-100 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-bold text-amber-700 mb-4 flex items-center">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 mr-3 text-white text-sm">A</span>
            APIs & Integrations
          </h2>
          
          <ul className="space-y-6 pl-4">
            <ScrollReveal delay={1200}>
              <li>
                {renderTechItem("🗺️", "Doctor Location", "`OpenCage Geocoder API` Used to convert city or address names into geolocation data to find and show nearby doctors on a map.")}
              </li>
            </ScrollReveal>
            
            <ScrollReveal delay={1300}>
              <li>
                <div className="flex items-start space-x-3">
                  <div className="text-xl md:text-2xl mt-1">🗣️</div>
                  <div>
                    <span className="font-bold text-amber-700">Bhashini ULCA API</span>
                    <ul className="pl-6 mt-2 space-y-2">
                      <li><span className="font-medium">ASR (Automatic Speech Recognition):</span> Converts spoken audio into text</li>
                      <li><span className="font-medium">NMT (Neural Machine Translation):</span> Translates regional languages into English or vice versa</li>
                      <li><span className="font-medium">TTS (Text to Speech):</span> Converts generated text (e.g., recommendations) back into natural-sounding speech</li>
                    </ul>
                  </div>
                </div>
              </li>
            </ScrollReveal>
            
            <ScrollReveal delay={1400}>
              <li>
                <div className="flex items-start space-x-3">
                  <div className="text-xl md:text-2xl mt-1">🧠</div>
                  <div>
                    <span className="font-bold text-amber-700">AI-Driven Health Plan Module:</span> Internal logic for generating personalized diet and exercise plans based on:
                    <ul className="pl-6 mt-2 space-y-2 list-disc">
                      <li>Disease (e.g., diabetes)</li>
                      <li>Weight, age, budget</li>
                      <li>Food preferences</li>
                      <li>Activity levels</li>
                    </ul>
                  </div>
                </div>
              </li>
            </ScrollReveal>
            
            <ScrollReveal delay={1500}>
              <li>
                <div className="flex items-start space-x-3">
                  <div className="text-xl md:text-2xl mt-1">📄</div>
                  <div>
                    <span className="font-bold text-amber-700">Web Scraping with Selenium</span> Extracts:
                    <ul className="pl-6 mt-2 space-y-2 list-disc">
                      <li>Disease data from `1mg.com`</li>
                      <li>Doctor data from `askapollo.com`</li>
                      <li>Product data from `amazon.in`</li>
                    </ul>
                    <p className="mt-2">Scraped content is cleaned, structured into JSON, and stored in MongoDB.</p>
                  </div>
                </div>
              </li>
            </ScrollReveal>
          </ul>
        </div>
      </ScrollReveal>

      {/* Authentication with improved visual hierarchy */}
      <ScrollReveal delay={1600}>
        <div className="mb-12 bg-white rounded-lg shadow-md p-6 border border-amber-100 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-bold text-amber-700 mb-4 flex items-center">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 mr-3 text-white text-sm">🔒</span>
            Authentication
          </h2>
          
          <ScrollReveal delay={1700}>
            <div className="flex items-start space-x-3">
              <div className="text-xl md:text-2xl mt-1">🔑</div>
              <div>
                <span className="font-bold text-amber-700">Provider:</span> `Clerk.dev` Used for:
                <ul className="pl-6 mt-2 space-y-2 list-disc">
                  <li>OAuth login (Google, GitHub, etc.)</li>
                  <li>Role-based access (Admin/User)</li>
                  <li>User session management</li>
                  <li>Protecting routes like `/admin` or personalized `/plan`</li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </ScrollReveal>

      {/* Platform Overview Section with improved card design */}
      <ScrollReveal delay={1800}>
        <div className="bg-gradient-to-br from-amber-100 to-white rounded-lg shadow-lg p-6 border border-amber-200 relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-200 rounded-full opacity-30 transform translate-x-12 -translate-y-12"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-300 rounded-full opacity-20 transform -translate-x-8 translate-y-8"></div>
          
          <ScrollReveal delay={1900}>
            <h2 className="text-2xl font-bold text-amber-800 mb-4 text-center relative z-10">
              Aurleaf – Platform Overview
            </h2>
            <p className="text-gray-700 mb-6 text-center">
              <strong className="text-amber-700">Aurleaf</strong> is a modern Ayurvedic healthcare web application that merges ancient wellness science with AI-powered health tech. 
              It empowers users with reliable tools and insights for proactive disease management, especially conditions like diabetes.
            </p>
          </ScrollReveal>
          
          <h3 className="text-xl font-semibold mb-4 text-amber-700 flex items-center">
            <span className="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </span>
            Key Features:
          </h3>
          
          <div className="space-y-2">
            <ScrollReveal delay={2000}>
              {renderFeature("🩺", "Doctor Directory (Geolocation-based)", 
                "Uses OpenCage API to help users discover nearby doctors across India with address, phone, specialty, and ratings.")}
            </ScrollReveal>
            
            <ScrollReveal delay={2100}>
              {renderFeature("🤖", "AI Chatbot", 
                <ul className="pl-6 mt-2 space-y-2 list-disc">
                  <li>Understands health queries (in Hindi or English)</li>
                  <li>Recommends remedies, devices, or doctors</li>
                  <li>Speaks back via Bhashini's TTS</li>
                  <li>Translates messages using Bhashini NMT</li>
                </ul>)}
            </ScrollReveal>
            
            <ScrollReveal delay={2200}>
              {renderFeature("📚", "Disease Encyclopedia", 
                <ul className="pl-6 mt-2 space-y-2 list-disc">
                  <li>Overview, symptoms, causes, key facts</li>
                  <li>Ayurvedic remedies and prevention tips</li>
                  <li>Diagnosis and home care guidelines <span className="text-gray-500 italic">(Data scraped and structured from 1mg)</span></li>
                </ul>)}
            </ScrollReveal>
            
            <ScrollReveal delay={2300}>
              {renderFeature("🍽️", "Personalized Diet & Exercise Plans", 
                <ul className="pl-6 mt-2 space-y-2 list-disc">
                  <li>Based on health conditions (e.g., PCOS, Obesity)</li>
                  <li>Input: disease, weight, fitness goal, budget, food preference</li>
                  <li>Output: AI-generated weekly schedule with meals and physical activities</li>
                  <li>Option to save, download, or update the plan</li>
                </ul>)}
            </ScrollReveal>
            
            <ScrollReveal delay={2400}>
              {renderFeature("🛍️", "Ayurvedic Marketplace", 
                <ul className="pl-6 mt-2 space-y-2 list-disc">
                  <li>Shows relevant health devices (e.g., sugar checkers)</li>
                  <li>Pulls product info from Amazon: title, price, rating, features, etc.</li>
                  <li>Users can explore and make informed purchases</li>
                </ul>)}
            </ScrollReveal>
            
            <ScrollReveal delay={2500}>
              {renderFeature("🧘‍♂️", "Ayurvedic Recommendations", 
                <ul className="pl-6 mt-2 space-y-2 list-disc">
                  <li>Common herbs and uses (e.g., Turmeric (Haldi) for inflammation)</li>
                  <li>Yoga and breathing exercises for specific conditions</li>
                </ul>)}
            </ScrollReveal>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}