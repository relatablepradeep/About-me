import React, { useState, useEffect } from 'react';

const Text = () => {
  const [displayedText, setDisplayedText] = useState({
    greeting: '',
    aboutTitle: '',
    aboutContent: '',
    workTitle: '',
    workContent: ''
  });
  

  const [currentSection, setCurrentSection] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [buttonText, setButtonText] = useState('');
  const [isButtonTyping, setIsButtonTyping] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const buttonTexts = [
    "Frontend Developer",
    "Backend Developer", 
    "Fullstack Developer",
    "Vibe Coder"
  ];

  const texts = {
    greeting: "Hi! I Am",
    aboutTitle: "About Me",
    aboutContent: "Hey, I'm Pradeep, and I come from the world of code ,Programming isn't just a skill for me—it meets my needs and keeps me motivated  I've participated in over 8 hackathons. I lost 5 of them, and honestly, I hate losing—especially when I see the smiles on others' faces as I fall short. But that only fuels me to come back stronger every time",

  };

  const typeWriter = (text, field, speed = 50) => {
    return new Promise((resolve) => {
      setIsTyping(true);
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(prev => ({
            ...prev,
            [field]: text.substring(0, i + 1)
          }));
          i++;
        } else {
          clearInterval(timer);
          setIsTyping(false);
          resolve();
        }
      }, speed);
    });
  };

  const typeButtonText = (text, speed = 80) => {
    return new Promise((resolve) => {
      setIsButtonTyping(true);
      let i = 0;
      setButtonText('');
      const timer = setInterval(() => {
        if (i < text.length) {
          setButtonText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
          setIsButtonTyping(false);
          resolve();
        }
      }, speed);
    });
  };

  const eraseButtonText = (speed = 40) => {
    return new Promise((resolve) => {
      setIsButtonTyping(true);
      const currentText = buttonText;
      let i = currentText.length;
      const timer = setInterval(() => {
        if (i > 0) {
          setButtonText(currentText.substring(0, i - 1));
          i--;
        } else {
          clearInterval(timer);
          setIsButtonTyping(false);
          resolve();
        }
      }, speed);
    });
  };

  const cycleButtonText = async () => {
    let currentIndex = 0;
    
    while (true) {
      // Type the current text
      await typeButtonText(buttonTexts[currentIndex]);
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      
    
      if (currentIndex < buttonTexts.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 200));
        await typeButtonText(buttonText + "sorry");
        await new Promise(resolve => setTimeout(resolve, 800));
      } else {
        await new Promise(resolve => setTimeout(resolve, 800));
      }
      
     
      await eraseButtonText();
      await new Promise(resolve => setTimeout(resolve, 300));
      
      
      currentIndex = (currentIndex + 1) % buttonTexts.length;
    }
  };

  useEffect(() => {
    const startAnimation = async () => {
      // Wait 1 second before starting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Type greeting
      await typeWriter(texts.greeting, 'greeting', 80);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Show button and start cycling text
      setShowButton(true);
      cycleButtonText(); // This runs infinitely
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Type about title
      await typeWriter(texts.aboutTitle, 'aboutTitle', 60);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Type about content
      await typeWriter(texts.aboutContent, 'aboutContent', 30);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Type work title
      await typeWriter(texts.workTitle, 'workTitle', 60);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Type work content
      await typeWriter(texts.workContent, 'workContent', 30);
    };

    startAnimation();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <section className="pt-8 sm:pt-12 lg:pt-16">
          <div className="flex flex-col items-start space-y-8 sm:space-y-12 lg:space-y-16">
            
            {/* Hero Section with Greeting and Button */}
            <div className="w-full">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap sm:flex-nowrap">
                <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight tracking-tight whitespace-nowrap">
                  {displayedText.greeting}
                </h1>
                {showButton && (
                  <button className="flex-shrink-0 rounded-lg px-2 xs:px-3 sm:px-4 md:px-5 py-1 xs:py-1.5 sm:py-2 md:py-3 bg-blue-600 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-white border-2 font-semibold hover:bg-blue-700 transition-colors animate-fadeIn min-w-0 text-center">
                    <span className="block truncate">
                      {buttonText}
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* About Section */}
            <div className="w-full">
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6 tracking-wide">
                {displayedText.aboutTitle}
              </h2>
              <div className="w-full">
                <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed text-gray-700">
                  {displayedText.aboutContent}
                </p>
              </div>
            </div>

            {/* Work Section */}
            <div className="w-full">
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6 tracking-wide">
                {displayedText.workTitle}
              </h2>
              <div className="w-full">
                <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed text-gray-700">
                  {displayedText.workContent}
                </p>
              </div>
            </div>

          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        /* Extra small screens */
        @media (max-width: 475px) {
          .xs\\:text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
          .xs\\:text-base { font-size: 1rem; line-height: 1.5rem; }
          .xs\\:text-2xl { font-size: 1.5rem; line-height: 2rem; }
          .xs\\:px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
          .xs\\:py-1\\.5 { padding-top: 0.375rem; padding-bottom: 0.375rem; }
        }
      `}</style>
    </div>
  );
};

export default Text;