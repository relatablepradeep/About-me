import React, { useRef, useState, useEffect } from "react";

const techStack = [
  { 
    name: "React", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", 
    color: "from-blue-400 to-cyan-500" 
  },
  { 
    name: "GSAP", 
    icon: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/gsap-logo.svg", 
    color: "from-green-400 to-emerald-500" 
  },
  { 
    name: "Spline", 
    icon: "https://spline.design/_next/image?url=%2Flogo.png&w=32&q=75", 
    color: "from-purple-400 to-pink-500" 
  },
  { 
    name: "Express", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", 
    color: "from-yellow-400 to-orange-500" 
  },
  { 
    name: "OAuth", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oauth/oauth-original.svg", 
    color: "from-red-400 to-pink-500" 
  },
  { 
    name: "Clerk", 
    icon: "https://images.clerk.com/static/logo-light-accent.svg", 
    color: "from-indigo-400 to-purple-500" 
  },
  { 
    name: "Cloudinary", 
    icon: "https://res.cloudinary.com/cloudinary-marketing/image/upload/f_auto,q_auto/v1649718594/Web_Assets/Logomark/Cloudinary-logomark-blue-white_background.svg", 
    color: "from-sky-400 to-blue-500" 
  },
  { 
    name: "WebSocket", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg", 
    color: "from-teal-400 to-green-500" 
  },
  { 
    name: "JavaScript", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", 
    color: "from-amber-400 to-yellow-500" 
  }
];

const Service = () => {
  const carouselRef = useRef(null);
  const [angle, setAngle] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const startXRef = useRef(0);
  const isDragging = useRef(false);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotation logic with hover pause
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging.current && !isHovered) {
        const newAngle = angle + 0.5;
        setAngle(newAngle);
        rotateCarousel(newAngle);
        
        // Calculate which item should be active (front-facing)
        const activeIdx = Math.round(-newAngle / (360 / techStack.length)) % techStack.length;
        setActiveIndex(activeIdx < 0 ? activeIdx + techStack.length : activeIdx);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [angle, isHovered]);

  const rotateCarousel = (newAngle) => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `rotateY(${newAngle}deg)`;
      carouselRef.current.style.transition = 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
    }
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startXRef.current = e.clientX;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const delta = e.clientX - startXRef.current;
    const updatedAngle = angle + delta * 0.5;
    setAngle(updatedAngle);
    rotateCarousel(updatedAngle);
    startXRef.current = e.clientX;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-amber-100 to-orange-200 overflow-hidden font-sans relative">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-amber-300/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Title */}
      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-10">
        <h1 className="text-5xl font-black bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 bg-clip-text text-transparent text-center animate-pulse">
          Tech Arsenal
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mt-2 rounded-full animate-pulse"></div>
      </div>

      {/* Active tech name display */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-amber-300/30">
          <h2 className="text-2xl font-bold text-amber-800 text-center animate-bounce">
            {techStack[activeIndex]?.name}
          </h2>
        </div>
      </div>

      {/* Carousel */}
      <div 
        className="w-96 h-96 relative cursor-grab select-none"
        style={{ 
          perspective: '1200px',
          transformStyle: 'preserve-3d'
        }}
      >
        <div
          className="w-full h-full relative"
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          style={{ 
            transformStyle: 'preserve-3d',
            transform: 'rotateY(0deg)'
          }}
        >
          {techStack.map((tech, index) => {
            const rotation = index * (360 / techStack.length);
            const isActive = index === activeIndex;
            
            return (
              <div
                key={index}
                className={`absolute w-48 h-32 rounded-3xl shadow-2xl flex flex-col items-center justify-center transition-all duration-500 ease-out transform hover:scale-110 ${
                  isActive 
                    ? 'opacity-100 shadow-amber-500/50 ring-4 ring-amber-400/60 animate-pulse scale-105' 
                    : 'opacity-75 hover:opacity-95'
                }`}
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotateY(${rotation}deg) translateZ(450px) ${isActive ? 'scale(1.1)' : ''}`,
                  background: `linear-gradient(135deg, rgb(251 191 36), rgb(245 158 11))`,
                  boxShadow: isActive 
                    ? '0 25px 50px -12px rgba(245, 158, 11, 0.5), 0 0 0 1px rgba(251, 191, 36, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    : '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Icon */}
                <div className={`mb-2 transform transition-transform duration-300 ${isActive ? 'animate-bounce' : 'hover:scale-125'} flex items-center justify-center`}>
                  <img 
                    src={tech.icon} 
                    alt={tech.name} 
                    className="w-16 h-16 object-contain filter drop-shadow-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div 
                    className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center text-2xl font-bold text-amber-900 hidden"
                    style={{ display: 'none' }}
                  >
                    {tech.name.charAt(0)}
                  </div>
                </div>
                
                {/* Tech name */}
                <div className="text-sm font-bold text-amber-900 text-center opacity-80 hover:opacity-100 transition-opacity">
                  {tech.name}
                </div>

                {/* Highlight glow effect */}
                {isActive && (
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-400/20 to-orange-400/20 animate-pulse pointer-events-none"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default Service;