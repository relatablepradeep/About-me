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
    aboutContent: "Hey, I’m Pradeep, and I come from the world of code ,Programming isn’t just a skill for me—it meets my needs and keeps me motivated  I’ve participated in over 8 hackathons. I lost 5 of them, and honestly, I hate losing—especially when I see the smiles on others’ faces as I fall short. But that only fuels me to come back stronger every time",

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
      await new Promise(resolve => setTimeout(resolve, 2000)); // Display for 2 seconds
      
      // Add "sorry" after typing (except for the last one in cycle)
      if (currentIndex < buttonTexts.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 200));
        await typeButtonText(buttonText + ", sorry");
        await new Promise(resolve => setTimeout(resolve, 800));
      } else {
        await new Promise(resolve => setTimeout(resolve, 800));
      }
      
      // Erase the text
      await eraseButtonText();
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Move to next text (loop back to 0 after last one)
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
    <div className="w-full lg:w-1/2 p-2 sm:p-4 flex flex-col justify-center min-h-screen bg-gray-50">
      <section className="relative pt-4 sm:pt-8 lg:pt-16">
        <div className="flex flex-col items-start px-2 sm:px-4 md:px-12 relative sm:bottom-48 lg:bottom-16 lg:px-16 xl:px-20">
          <div className="relative w-full flex items-center gap-2 sm:gap-4 flex-wrap min-h-[80px] sm:min-h-[100px] lg:min-h-[120px]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight tracking-tight">
              {displayedText.greeting}
              {isTyping && currentSection === 0 && (
                <span className="animate-pulse">|</span>
              )}
            </h1>
            {showButton && (
              <button className="rounded-lg px-3 sm:px-4 md:px-5 py-1 sm:py-2 md:py-3 bg-blue-600 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white border-2 font-semibold hover:bg-blue-700 transition-colors animate-fadeIn min-w-[200px] sm:min-w-[250px] md:min-w-[300px] lg:min-w-[350px]">
                {buttonText}
                {isButtonTyping && (
                  <span className="animate-pulse">|</span>
                )}
              </button>
            )}
          </div>

          <div className="mt-8 sm:mt-10 lg:mt-16 w-full">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 lg:mb-6 tracking-wide min-h-[40px] sm:min-h-[50px] lg:min-h-[60px]">
              {displayedText.aboutTitle}
              {isTyping && displayedText.greeting && !displayedText.aboutContent && (
                <span className="animate-pulse">|</span>
              )}
            </h1>
            <div className="min-h-[120px] sm:min-h-[140px] lg:min-h-[160px]">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed text-gray-700">
                {displayedText.aboutContent}
                {isTyping && displayedText.aboutTitle && !displayedText.workTitle && (
                  <span className="animate-pulse">|</span>
                )}
              </p>
            </div>
          </div>

          <div className="mt-8 sm:mt-10 lg:mt-16 w-full">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 lg:mb-6 tracking-wide min-h-[40px] sm:min-h-[50px] lg:min-h-[60px]">
              {displayedText.workTitle}
              {isTyping && displayedText.aboutContent && !displayedText.workContent && (
                <span className="animate-pulse">|</span>
              )}
            </h1>
            <div className="min-h-[120px] sm:min-h-[140px] lg:min-h-[160px]">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed text-gray-700">
                {displayedText.workContent}
                {isTyping && displayedText.workTitle && (
                  <span className="animate-pulse">|</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Text;