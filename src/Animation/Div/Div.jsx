import React from "react";
import '../Div/Div.css'


const Div = () => {
  return (
   
   

    <div className="flip-card">
    <div className="flip-card-inner">
        <div class="flip-card-front">
            <p class="title">FLIP CARD</p>
            <p>Hover Me</p>
        </div>
        <div className="flip-card-back">
            <p className="title">BACK</p>
            <p>Leave Me</p>
        </div>
    </div>
</div>



  );
};

export default Div;
