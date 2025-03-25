import React, { useEffect, useState } from 'react';

const Right = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', updateWindowSize);
    return () => {
      window.removeEventListener('resize', updateWindowSize);
    };
  }, []);

  const calculateItemSize = () => {
    if (windowWidth > 1280) return { width: 350, height: 400, fontSize: 30 };
    if (windowWidth > 1024) return { width: 300, height: 350, fontSize: 28 };
    if (windowWidth >= 640) return { width: 300, height: 350, fontSize: 24 };
    if (windowWidth > 430) return { width: 310, height: 360, fontSize: 22 };
    if (windowWidth > 320) return { width: 250, height: 300, fontSize: 18 };
    return { width: 250, height: 300, fontSize: 16 };
  };

  const { width, height, fontSize } = calculateItemSize();
  const cardSpacing = width * 0.1;
  const totalCardWidth = width + cardSpacing * 2;
  const scrollOffset = totalCardWidth * 10; // Moving right
  const animationSpeed = Math.max(15, 20 + windowWidth / 200);

  const cardContent = Array.from({ length: 10 }, (_, i) => ({
    front: `FLIP CARD ${i + 1}`,
    back: `BACK ${i + 1}`
  }));

  return (
    <div style={{ width: '100%', overflow: 'hidden', background: '#f8f8f8', padding: '20px 0' }}>
      <div style={{ display: 'flex', width: 'fit-content' }} className="scroll-container">
        {[...cardContent, ...cardContent, ...cardContent].map((content, index) => (
          <div
            key={index}
            className="scroll-item"
            style={{ width, height, margin: `0 ${cardSpacing}px`, fontSize, padding: 0 }}
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

      <style jsx>{`
       @keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(${scrollOffset}px);
  }
}
        .scroll-container {
          animation: scroll ${animationSpeed}s linear infinite;
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

export default Right;
