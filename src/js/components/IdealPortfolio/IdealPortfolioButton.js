import React from 'react';

const IdealPortfolioButton = (props) => {
  return (
    <button 
      className="ideal-overview--button text-center" 
      onClick={props.onClick}>
        {props.graphMode
          ? <img src="/src/assets/chartlogo.jpg" />
          : <img src="/src/assets/donutlogo.png" />
        }
    </button>
  );
}

export default IdealPortfolioButton;