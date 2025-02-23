import React from 'react';
import styled from 'styled-components';

const Stack = () => {
  return (
    <StyledWrapper>
      <div className="stack-cards">
        <div className="stack-card one">
          <div className="stack-cardDetails">
            <div className="stack-cardDetailsHeader">Card Header</div>
            <div className="stack-cardDetailsButton">Click me</div>
          </div>
        </div>
        <div className="stack-card two">
          <div className="stack-cardDetails">
            <div className="stack-cardDetailsHeader">Card Header</div>
            <div className="stack-cardDetailsButton">Click me</div>
          </div>
        </div>
        <div className="stack-card three">
          <div className="stack-cardDetails">
            <div className="stack-cardDetailsHeader">Card Header</div>
            <div className="stack-cardDetailsButton">Click me</div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  
  .stack-cards {
    position: relative;
    width: 300px;
    height: 300px;

    /* Increase size for tablets */
    @media (min-width: 768px) {
      width: 400px;
      height: 400px;
    }

    /* Increase size for desktops */
    @media (min-width: 1024px) {
      width: 500px;
      height: 500px;
    }
  }

  .stack-card {
    z-index: 1;
    position: absolute;
    width: 85%;
    height: 60%;
    border-radius: 10px;
    transition: all 0.5s ease-out;
    overflow: hidden;
    transform: perspective(905px) rotateX(0deg) rotateY(0deg) rotateZ(-8deg);
  }

  .stack-card.one {
    top: 0;
    left: 0;
    background: linear-gradient(180deg, #FF0055 0%, #000066 100%);
  }

  .stack-card.two {
    top: 25px;
    left: 25px;
    background: linear-gradient(180deg, #fa00ff 0%, #01f998 99%);
  }

  .stack-card.three {
    top: 50px;
    left: 50px;
    background: linear-gradient(180deg, #c0f901 0%, #fa00ff 100%);
  }

  .stack-card:hover {
    z-index: 4;
    transform: perspective(1000px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    transition: all 0.5s ease-out;
  }

  .stack-cardDetails {
    width: 55%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    background: rgba(0,0,0,0.8);
    transition: 0.5s;
    transform-origin: left;
    transform: perspective(2000px) rotateY(-90deg);
  }

  .stack-card:hover .stack-cardDetails {
    transform: perspective(2000px) rotateY(0deg);
  }

  .stack-cardDetailsHeader {
    font-weight: 600;
    color: #edb899;
  }

  .stack-cardDetailsButton {
    padding: 3px 6px;
    border-radius: 25px;
    background-color: #edb899;
    color: #000;
    font-weight: 600;
  }
`;

export default Stack;
