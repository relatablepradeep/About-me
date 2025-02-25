import React, { useEffect, useState } from 'react';

const Service = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const getItemSize = () => {
    if (windowWidth > 1280) {
      return { width: 350, height: 400, fontSize: 30}; 
    } else if (windowWidth > 1024) {
      return { width: 300, height: 350, fontSize: 28}; 
    } 
    // Custom larger sizes for specific screens
    else if (windowWidth >= 1024) {
      return { width: 400, height: 450, fontSize: 28}; 
    } else if (windowWidth >= 640) {
      return { width: 300, height: 350, fontSize: 24}; 
    } 
    
    else if (windowWidth > 820 && windowWidth <= 1024) {
      return { width: 250, height: 300, fontSize: 26}; 
    } else if (windowWidth > 768 && windowWidth <= 820) {
      return { width: 200, height: 250, fontSize: 24};
    } 
    
    else if (windowWidth > 430 && windowWidth <= 768) {
      return { width: 310, height: 360, fontSize: 22}; 
    } else if (windowWidth > 414 && windowWidth <= 430) {
      return { width: 300, height: 350, fontSize: 21}; 
    } else if (windowWidth > 390 && windowWidth <= 414) {
      return { width: 300, height: 350, fontSize: 20}; 
    } else if (windowWidth > 375 && windowWidth <= 390) {
      return { width: 250, height: 300, fontSize: 19}; 
    } else if (windowWidth > 320 && windowWidth <= 375) {
      return { width: 250, height: 300, fontSize: 18}; 
    } 
  
    else {
      return { width: 250, height: 300, fontSize: 16}; 
    }
  };
  
  const { width, height, fontSize } = getItemSize();
  const margin = width * 0.1; 
  
  // Calculate animation parameters
  const itemFullWidth = width + (margin * 2);
  const scrollDistance = -1 * itemFullWidth * 10; // Updated for more cards
  
  // Adjust speed based on screen size
  const animationDuration = Math.max(15, 20 + (windowWidth / 200));

  // Content for the cards - Added 6 more cards
  const cardContent = [
    { front: "FLIP CARD 1", back: "BACK 1" },
    { front: "FLIP CARD 2", back: "BACK 2" },
    { front: "FLIP CARD 3", back: "BACK 3" },
    { front: "FLIP CARD 4", back: "BACK 4" },
    { front: "FLIP CARD 5", back: "BACK 5" },
    { front: "FLIP CARD 6", back: "BACK 6" },
    { front: "FLIP CARD 7", back: "BACK 7" },
    { front: "FLIP CARD 8", back: "BACK 8" },
    { front: "FLIP CARD 9", back: "BACK 9" },
    { front: "FLIP CARD 10", back: "BACK 10" }
  ];
  
  return (
    <div style={{
      width: '100%',
      overflow: 'hidden',
      background: '#f8f8f8', // Lighter background to match whitish theme
      padding: '20px 0'
    }}>
      <div 
        style={{
          display: 'flex',
          width: 'fit-content'
        }}
        className="scroll-container"
      >
        {/* First set */}
        {cardContent.map((content, index) => (
          <div
            key={`set1-${index + 1}`}
            className="scroll-item"
            style={{
              width: `${width}px`,
              height: `${height}px`,
              margin: `0 ${margin}px`,
              fontSize: `${fontSize}px`,
              padding: 0
            }}
          >
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <h3 className="title">{content.front}</h3>
                  <p>Hover Me</p>
                </div>
                <div className="flip-card-back">
                  <h3 className="title">{content.back}</h3>
                  <p>Leave Me</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Second set */}
        {cardContent.map((content, index) => (
          <div
            key={`set2-${index + 1}`}
            className="scroll-item"
            style={{
              width: `${width}px`,
              height: `${height}px`,
              margin: `0 ${margin}px`,
              fontSize: `${fontSize}px`,
              padding: 0
            }}
          >
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <h3 className="title">{content.front}</h3>
                  <p>Hover Me</p>
                </div>
                <div className="flip-card-back">
                  <h3 className="title">{content.back}</h3>
                  <p>Leave Me</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Third set */}
        {cardContent.map((content, index) => (
          <div
            key={`set3-${index + 1}`}
            className="scroll-item"
            style={{
              width: `${width}px`,
              height: `${height}px`,
              margin: `0 ${margin}px`,
              fontSize: `${fontSize}px`,
              padding: 0
            }}
          >
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <h3 className="title">{content.front}</h3>
                  <p>Hover Me</p>
                </div>
                <div className="flip-card-back">
                  <h3 className="title">{content.back}</h3>
                  <p>Leave Me</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ 
        textAlign: 'center', 
        marginTop: '20px', 
        fontSize: '14px', 
        color: '#666' 
      }}>
      
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(${scrollDistance}px);
          }
        }

        .scroll-container {
          animation: scroll ${animationDuration}s linear infinite;
        }

        .scroll-item {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .scroll-container:hover {
          animation-play-state: paused;
        }
        
        /* Flip Card Styles */
        .flip-card {
          background-color: transparent;
          width: 100%;
          height: 100%;
          perspective: 1000px;
          font-family: sans-serif;
        }
        
        .title {
          font-size: 1.5em;
          font-weight: 900;
          text-align: center;
          margin: 0;
        }
        
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }
        
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        
        .flip-card-front, .flip-card-back {
          box-shadow: 0 8px 14px 0 rgba(0,0,0,0.1);
          position: absolute;
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border: 1px solid #e0e0e0;
          border-radius: 1rem;
        }
        
        .flip-card-front {
          background: white;
          color: #444;
        }
        
        .flip-card-back {
          background: #e6e6e6;
          color: #333;
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default Service;