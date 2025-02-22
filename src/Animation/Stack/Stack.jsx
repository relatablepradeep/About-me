import React from 'react';
import styled from 'styled-components';

const Stack = () => {
  return (
    <StyledWrapper>
      <div className="cards">
        <div className="card one">
          <div className="cardDetails">
            <div className="cardDetailsHaeder">Card Header</div>
            <div className="cardDetailsButton">Click me</div>
          </div>
        </div>
        <div className="card two">
          <div className="cardDetails">
            <div className="cardDetailsHaeder">Card Header</div>
            <div className="cardDetailsButton">Click me</div>
          </div>
        </div>
        <div className="card three">
          <div className="cardDetails">
            <div className="cardDetailsHaeder">Card Header</div>
            <div className="cardDetailsButton">Click me</div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .cards {
    position: relative;
  }

  .card {
    z-index: 1;
    position: absolute;
    width: 254px;
    height: 190px;
    border-radius: 10px;
    transition: all .5s ease-out;
    overflow: hidden;
    transform: translateX(0px) translateY(0px) perspective(905px) rotateX(0deg) rotateY(0deg) rotateZ(-8deg);
  }

  .card.one {
    top: -120px;
    left: -150px;
    background: linear-gradient(180deg, #FF0055 0%, #000066 100%);
  }

  .card.two {
    top: -95px;
    left: -125px;
    background: linear-gradient(180deg, #fa00ff 0%, #01f998 99%);
  }

  .card.three {
    top: -70px;
    left: -100px;
    background: linear-gradient(180deg, #c0f901 0%, #fa00ff 100%);
  }

  .card:hover {
    z-index: 4;
    transform: perspective(1000px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) !important;
    transition: all .5s ease-out;
  }

  .cardDetails {
    width: 55%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    background: rgba(0,0,0,0.8);
    transition: .5s;
    transform-origin: left;
    transform: perspective(2000px) rotateY(-90deg);
  }

  .card:hover .cardDetails {
    transform: perspective(2000px) rotateY(0deg);
  }

  .cardDetailsHaeder {
    font-weight: 600;
    color: #edb899;
  }

  .cardDetailsButton {
    padding: 3px 6px;
    border-radius: 25px;
    background-color: #edb899;
    color: #000;
    font-weight: 600;
  }`;

export default Stack;
