import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Award, X, Calendar, Code, Presentation } from 'lucide-react';

const Scrolling = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typewriterText, setTypewriterText] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);
  const itemRefs = useRef([]);

  const achievements = [
    {
      id: 1,
      date: 'March 2024',
      type: 'win',
      icon: Trophy,
      title: 'College Hackathon Victory',
      description: 'Won a hackathon at college where I solved real-world DSA problems and created websites.',
      color: 'amber'
    },
    {
      id: 2,
      date: 'April 2024',
      type: 'win',
      icon: Award,
      title: 'Inter-College Hackathon Champion',
      description: 'Won an inter-college hackathon at Uttarakhand University, building a software prototype for a mobile application.',
      color: 'amber'
    },
    {
      id: 3,
      date: 'Multiple Events',
      type: 'loss',
      icon: X,
      title: 'Learning Through Defeats',
      description: 'Continuously lost in several hackathons: one at Roorkee, one at Uttarakhand University, DIT University, Flipkart Grid Hackathon, and SIH Hackathon.',
      color: 'gray'
    },
    {
      id: 4,
      date: 'February 2025',
      type: 'partial',
      icon: Presentation,
      title: 'Selected but Disqualified',
      description: 'Presentation was selected at Graphic Era University, but was disqualified as only their college students were allowed.',
      color: 'amber'
    },
    {
      id: 5,
      date: 'March 2025',
      type: 'win',
      icon: Code,
      title: 'Government-Level Selection',
      description: 'Presentation selected for the prototype phase in a central government-level hackathon, Bhasha Bandhu.',
      color: 'amber'
    },
    {
      id: 6,
      date: 'April 2025',
      type: 'win',
      icon: Trophy,
      title: 'University Hackathon Winner',
      description: 'Won a hackathon at Uttarakhand University, developing a website.',
      color: 'amber'
    }
  ];

  // Typewriter effect for main title
  useEffect(() => {
    const text = 'Achievements';
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setTypewriterText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 150);

    return () => clearInterval(timer);
  }, []);

  // Enhanced scroll handler with better card detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrollY(scrollTop);
      
      if (!containerRef.current) return;

      const windowHeight = window.innerHeight;
      const containerTop = containerRef.current.offsetTop;
      
      // Find the card that's most centered in the viewport
      let closestIndex = 0;
      let closestDistance = Infinity;
      
      itemRefs.current.forEach((item, index) => {
        if (item) {
          const rect = item.getBoundingClientRect();
          const itemCenter = rect.top + rect.height / 2;
          const viewportCenter = windowHeight / 2;
          const distance = Math.abs(itemCenter - viewportCenter);
          
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        }
      });

      setCurrentIndex(closestIndex);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getCardStyle = (type, isActive) => {
    if (type === 'loss') {
      return {
        background: isActive 
          ? 'rgba(156, 163, 175, 0.25)' // gray-400/25
          : 'rgba(156, 163, 175, 0.15)', // gray-400/15
        border: '1px solid rgba(156, 163, 175, 0.3)',
        boxShadow: isActive 
          ? '0 0 40px rgba(156, 163, 175, 0.4), 0 0 80px rgba(156, 163, 175, 0.2)'
          : '0 10px 25px rgba(0, 0, 0, 0.1)'
      };
    }
    return {
      background: isActive 
        ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.3) 0%, rgba(245, 158, 11, 0.25) 50%, rgba(217, 119, 6, 0.3) 100%)'
        : 'linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(245, 158, 11, 0.15) 50%, rgba(217, 119, 6, 0.2) 100%)',
      border: '1px solid rgba(251, 191, 36, 0.4)',
      boxShadow: isActive 
        ? '0 0 50px rgba(251, 191, 36, 0.6), 0 0 100px rgba(245, 158, 11, 0.3), inset 0 0 20px rgba(251, 191, 36, 0.1)'
        : '0 10px 25px rgba(0, 0, 0, 0.1), 0 0 20px rgba(251, 191, 36, 0.2)'
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-200 to-amber-300 relative overflow-hidden">
      {/* Floating Orbs Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large gradient orbs */}
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, rgba(245, 158, 11, 0.3) 40%, transparent 70%)',
            top: '10%',
            left: '5%',
            transform: `translate(${scrollY * 0.05}px, ${Math.sin(scrollY * 0.001) * 30}px)`,
            animation: 'float 8s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full blur-2xl opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.5) 0%, rgba(217, 119, 6, 0.3) 50%, transparent 70%)',
            top: '30%',
            right: '10%',
            transform: `translate(${-scrollY * 0.03}px, ${Math.cos(scrollY * 0.0008) * 40}px)`,
            animation: 'float 10s ease-in-out infinite reverse'
          }}
        />
        <div 
          className="absolute w-64 h-64 rounded-full blur-xl opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.6) 0%, rgba(245, 158, 11, 0.2) 60%, transparent 80%)',
            bottom: '20%',
            left: '15%',
            transform: `translate(${scrollY * 0.04}px, ${Math.sin(scrollY * 0.0012) * 25}px)`,
            animation: 'float 12s ease-in-out infinite'
          }}
        />
        
        {/* Medium orbs */}
        <div 
          className="absolute w-48 h-48 rounded-full blur-xl opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(217, 119, 6, 0.4) 0%, rgba(194, 65, 12, 0.3) 50%, transparent 70%)',
            top: '60%',
            right: '30%',
            transform: `translate(${scrollY * 0.06}px, ${Math.cos(scrollY * 0.0015) * 20}px)`,
            animation: 'float 9s ease-in-out infinite'
          }}
        />
        
        {/* Small accent orbs */}
        <div 
          className="absolute w-32 h-32 rounded-full blur-lg opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.7) 0%, transparent 60%)',
            top: '20%',
            left: '70%',
            transform: `translate(${-scrollY * 0.08}px, ${Math.sin(scrollY * 0.002) * 15}px)`,
            animation: 'float 6s ease-in-out infinite reverse'
          }}
        />
        <div 
          className="absolute w-24 h-24 rounded-full blur-md opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.8) 0%, transparent 50%)',
            bottom: '40%',
            right: '20%',
            transform: `translate(${scrollY * 0.07}px, ${Math.cos(scrollY * 0.0018) * 10}px)`,
            animation: 'float 7s ease-in-out infinite'
          }}
        />
      </div>

      {/* Header Section */}
      <div className="h-96 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-amber-800 via-orange-700 to-amber-900 bg-clip-text text-transparent mb-4">
            {typewriterText}
            <span className="animate-pulse">|</span>
          </h1>
          <div className="w-24 sm:w-32 md:w-40 h-1 bg-gradient-to-r from-amber-600 to-orange-700 mx-auto rounded-full shadow-lg shadow-amber-400/50"></div>
          <p className="mt-3 text-lg sm:text-xl text-amber-900/80 max-w-2xl mx-auto px-4 font-medium">
            My journey through hackathons, victories, defeats, and continuous learning
          </p>
          <div className="mt-4 animate-bounce">
            <div className="w-1 h-8 bg-gradient-to-b from-amber-600 to-transparent mx-auto rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Timeline Container */}
      <div ref={containerRef} className="relative z-10">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;
          const isActive = index === currentIndex;
          
          return (
            <div
              key={achievement.id}
              ref={el => itemRefs.current[index] = el}
              className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-4"
            >
              <div className={`w-full max-w-3xl mx-auto transition-all duration-700 ease-out transform ${
                isActive 
                  ? 'scale-105 opacity-100 translate-y-0' 
                  : 'scale-95 opacity-60 translate-y-4'
              }`}>
                {/* Progress Indicator */}
                <div className="flex justify-center mb-6">
                  <div className="flex items-center space-x-3">
                    {achievements.map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full transition-all duration-500 ${
                          i <= currentIndex 
                            ? 'bg-amber-600 scale-125 shadow-lg shadow-amber-400/60' 
                            : 'bg-amber-700/40 scale-100'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Simplified Achievement Card */}
                <div 
                  className="relative rounded-2xl p-6 sm:p-8 backdrop-blur-sm transition-all duration-700 hover:scale-[1.02]"
                  style={getCardStyle(achievement.type, isActive)}
                >
                  
                  {/* Date Badge */}
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4 ${
                    achievement.type === 'loss' 
                      ? 'bg-gray-500/20 text-gray-700 border border-gray-400/30' 
                      : 'bg-amber-500/30 text-amber-800 border border-amber-400/50'
                  }`}>
                    <Calendar size={16} />
                    {achievement.date}
                  </div>

                  {/* Main Content */}
                  <div className="flex items-start gap-6 mb-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 p-4 rounded-xl transition-all duration-500 ${
                      achievement.type === 'loss' 
                        ? 'bg-gray-500/20 border border-gray-400/40' 
                        : 'bg-amber-500/30 border border-amber-400/50'
                    } ${isActive ? 'shadow-lg shadow-amber-400/40' : ''}`}>
                      <Icon 
                        size={28} 
                        className={`${
                          achievement.type === 'loss' ? 'text-gray-600' : 'text-amber-700'
                        } transition-all duration-300`} 
                      />
                    </div>

                    {/* Text Content */}
                    <div className="flex-1">
                      <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${
                        achievement.type === 'loss' ? 'text-gray-700' : 'text-amber-900'
                      }`}>
                        {achievement.title}
                      </h2>
                      <p className={`text-base sm:text-lg leading-relaxed ${
                        achievement.type === 'loss' ? 'text-gray-600' : 'text-amber-800/90'
                      }`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>

                  {/* Achievement Type Badge */}
                  <div className="flex justify-between items-center">
                    <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                      achievement.type === 'win' 
                        ? 'bg-amber-500/30 text-amber-800 border border-amber-400/50'
                        : achievement.type === 'loss'
                          ? 'bg-red-500/30 text-red-700 border border-red-400/50'
                          : 'bg-yellow-500/30 text-yellow-800 border border-yellow-400/50'
                    }`}>
                      {achievement.type === 'win' ? '🏆 Victory' : 
                       achievement.type === 'loss' ? '📚 Learning' : 
                       '⚡ Partial Success'}
                    </div>

                    {/* Counter */}
                    <div className="text-amber-700 font-mono text-sm font-bold">
                      {String(currentIndex + 1).padStart(2, '0')} / {String(achievements.length).padStart(2, '0')}
                    </div>
                  </div>
                </div>

                {/* Scroll Hint */}
                {currentIndex < achievements.length - 1 && (
                  <div className="text-center mt-6 text-amber-800/70 text-sm">
                    <div className="animate-bounce">
                      <div className="w-1 h-6 bg-gradient-to-b from-amber-600 to-transparent mx-auto rounded-full mb-2"></div>
                    </div>
                    Continue scrolling
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="h-80 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-amber-500/30 to-orange-400/30 rounded-full border border-amber-400/50 mb-3 backdrop-blur-sm shadow-lg shadow-amber-400/30">
            <Trophy className="text-amber-700" size={24} />
            <span className="text-amber-800 font-medium text-lg">Journey Continues...</span>
          </div>
          <p className="text-amber-800/80 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            Every hackathon taught me something new. Every defeat made me stronger. Every victory reminded me why I love coding.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(2deg); }
          66% { transform: translateY(10px) rotate(-1deg); }
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default Scrolling;