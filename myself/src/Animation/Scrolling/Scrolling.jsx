import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Award, X, Calendar, Code, Presentation } from 'lucide-react';

const Scrolling = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [typewriterText, setTypewriterText] = useState('');
  const itemRefs = useRef([]);
  const titleRef = useRef(null);

  // Initialize with first item visible
  useEffect(() => {
    setVisibleItems(new Set([0]));
  }, []);
  
     const achievements = [{
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
    const text = 'Journey';
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

  // Intersection Observer for scroll animations - sequential reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            // Only show this item if all previous items are already visible
            setVisibleItems(prev => {
              const newSet = new Set(prev);
              // Check if all previous items are visible
              let canShow = true;
              for (let i = 0; i < index; i++) {
                if (!newSet.has(i)) {
                  canShow = false;
                  break;
                }
              }
              if (canShow || index === 0) {
                newSet.add(index);
              }
              return newSet;
            });
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '-100px 0px -100px 0px'
      }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const getIconColor = (type, color) => {
    if (type === 'loss') return 'text-gray-400';
    return color === 'amber' ? 'text-amber-400' : 'text-white';
  };

  const getBackgroundGlow = (type, color, isVisible) => {
    if (!isVisible) return '';
    if (type === 'loss') return 'shadow-lg shadow-gray-500/20';
    return color === 'amber' ? 'shadow-lg shadow-amber-500/30' : 'shadow-lg shadow-white/20';
  };

  const getBorderColor = (type, color) => {
    if (type === 'loss') return 'border-gray-600';
    return color === 'amber' ? 'border-amber-500' : 'border-white';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Main Title with Typewriter Effect */}
        <div className="text-center mb-16">
          <h1 
            ref={titleRef}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-amber-200 to-amber-400 bg-clip-text text-transparent"
          >
            {typewriterText}
            <span className="animate-pulse">|</span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central Line - only show up to the last visible item */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-0.5 top-0 w-0.5 bg-gradient-to-b from-amber-400 via-white to-amber-400"
               style={{
                 height: visibleItems.size > 0 
                   ? `${Math.max(...Array.from(visibleItems)) * 20 + 10}rem`
                   : '10rem'
               }}></div>

          {/* Achievement Items */}
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            const isVisible = visibleItems.has(index);
            const isEven = index % 2 === 0;

            return (
              <div
                key={achievement.id}
                ref={el => itemRefs.current[index] = el}
                data-index={index}
                className={`relative mb-16 transform transition-all duration-1000 ${
                  isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-20 opacity-0 pointer-events-none'
                } ${!isVisible ? 'invisible' : 'visible'}`}
              >
                {/* Timeline Node */}
                <div className={`absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 rounded-full border-4 ${getBorderColor(achievement.type, achievement.color)} bg-gray-900 transition-all duration-500 ${
                  isVisible ? 'scale-110' : 'scale-100'
                }`}>
                  <div className={`absolute inset-1 rounded-full ${
                    achievement.type === 'loss' ? 'bg-gray-600' : 'bg-amber-400'
                  } ${isVisible ? 'animate-pulse' : ''}`}></div>
                </div>

                {/* Content Card */}
                <div className={`ml-16 md:ml-0 ${isEven ? 'md:mr-1/2 md:pr-12' : 'md:ml-1/2 md:pl-12'}`}>
                  <div className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border ${getBorderColor(achievement.type, achievement.color)} transition-all duration-700 ${getBackgroundGlow(achievement.type, achievement.color, isVisible)} ${
                    isVisible ? 'scale-100' : 'scale-95'
                  }`}>
                    {/* Date Badge */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                      achievement.type === 'loss' 
                        ? 'bg-gray-700 text-gray-300' 
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      <Calendar size={14} />
                      {achievement.date}
                    </div>

                    {/* Icon and Title */}
                    <div className="flex items-start gap-4 mb-3">
                      <div className={`p-3 rounded-lg ${
                        achievement.type === 'loss' 
                          ? 'bg-gray-700/50' 
                          : 'bg-amber-500/20 border border-amber-500/30'
                      }`}>
                        <Icon size={24} className={getIconColor(achievement.type, achievement.color)} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-xl font-bold ${
                          achievement.type === 'loss' ? 'text-gray-300' : 'text-white'
                        } ${isVisible ? 'animate-fade-in-up' : ''}`}>
                          {achievement.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className={`text-gray-300 leading-relaxed ${
                      isVisible ? 'animate-fade-in-up animation-delay-300' : ''
                    }`}>
                      {achievement.description}
                    </p>

                    {/* Achievement Type Indicator */}
                    <div className="mt-4 flex justify-end">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        achievement.type === 'win' 
                          ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                          : achievement.type === 'loss'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                            : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                      }`}>
                        {achievement.type === 'win' ? '🏆 Victory' : 
                         achievement.type === 'loss' ? '📚 Learning' : 
                         '⚡ Partial Success'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Decoration */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-full border border-amber-500/30">
            <Trophy className="text-amber-400" size={20} />
            <span className="text-amber-300 font-medium">Journey Continues...</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
};

export default Scrolling;