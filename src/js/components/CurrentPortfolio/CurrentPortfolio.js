import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CurrentPortfolioRow from './CurrentPortfolioRow';
import CurrentPortfolioRecommendedTransfers from './CurrentPortfolioRecommendedTransfers';
import { toTwoDecimal } from '../Helpers/Helpers';

const CurrentPortfolio = () => {

  const riskLevel = useSelector( state => {
    return state.riskLevels.riskLevels[
      state.riskLevels.activeRiskLevel - 1
    ]
  });

  const [enableRebalance, setEnableRebalance] = useState(false); 
  const [incorrectAmountFormat, setIncorrectAmountFormat] = useState(false); 
  const [currentPortfolio, setCurrentPortfolio] = useState({
    bonds: {
      amount: "",
      recommended: "",
      difference: ""
    },
    largeCap: {
      amount: "",
      recommended: "",
      difference: ""
    },
    midCap: {
      amount: "",
      recommended: "",
      difference: ""
    },
    foreign: {
      amount: "",
      recommended: "",
      difference: ""
    },
    smallCap: {
      amount: "",
      recommended: "",
      difference: ""
    }
  });
    
  function handleChange(category, value) {

    let currentPortfolioCopy = {...currentPortfolio};
    currentPortfolioCopy[category].amount = isNaN(value) || value === ""  
      ? value 
      : parseInt(value);
    
    setCurrentPortfolio({ ...currentPortfolioCopy });

    checkStatusButton();
  }

  function checkStatusButton() {
    let enableRebalance = Object.values(currentPortfolio).every((category) => {
      return category.amount !== "";
    });
    setEnableRebalance( enableRebalance );
  }

  function handleRebalance() {
    let currentPortfolioCopy = {...currentPortfolio};
    if (!shouldRebalance(currentPortfolioCopy)) {
      resetCalculations();
      return;
    }
    const totalCurrentValues = calculateTotalCurrentValues();

    for (const [category, data] of Object.entries(currentPortfolioCopy)) {
      data.recommended = calculateNewAmount(category, totalCurrentValues);
      data.difference = calculateDifference(data.amount, data.recommended);
    }
    setIncorrectAmountFormat( false );
    setCurrentPortfolio({ ...currentPortfolioCopy });
  }

  function shouldRebalance(currentPortfolio) {
    let arePositiveNumbers = Object.values(currentPortfolio).every(category => {
      return !isNaN(category.amount) && Math.sign(category.amount) >= 0;
    })
    if (!arePositiveNumbers) {
      setIncorrectAmountFormat( true );
    }
    return arePositiveNumbers;
  }

  function resetCalculations() {
    let currentPortfolioCopy = {...currentPortfolio};
    
    for (const [category, data] of Object.entries(currentPortfolioCopy)) {
      data.recommended = "";
      data.difference = "";
    }
    setCurrentPortfolio({ ...currentPortfolioCopy });
  }

  function calculateTotalCurrentValues() {
    let currentPortfolioCopy = Object.values(currentPortfolio);
    return Object.keys(currentPortfolioCopy)
      .map((category) => {
        return currentPortfolioCopy[category].amount;
      })
      .reduce((sum, value) => {
        return sum + value;
      }, 0);
  }

  function calculateNewAmount(type, totalCurrentValues) {
    let idealPercentageValue = riskLevel[type];
    let newAmount = (idealPercentageValue * totalCurrentValues) / 100
    return Math.round( newAmount * 100) / 100;
  }

  function calculateDifference(amount, recommendedAmount) {
    return toTwoDecimal(recommendedAmount - amount);  
  }

  return (
    <div className="current-portfolio">
      <div className="current-portfolio--header grid-x">
        <h3 className="cell small-12 medium-10 text-center medium-text-left">
          Please Enter Your Current Portfolio
        </h3>
        <div className="cell small-12 medium-2 text-center medium-text-left"> 
          <button 
            className="current-portfolio--button button primary" 
            onClick={handleRebalance} 
            disabled={!enableRebalance}>
              Rebalance
          </button>
        </div>
      </div>
      <div className="grid-x">
        <table className="current-portfolio--table cell small-12 unstriped">
          <thead>
            <tr>
              <th className="text-center" colSpan="2" >Current Amount</th>
              <th className="text-center">Difference</th>
              <th className="text-center">New Amount</th>
              <th className="text-center">Recommended Transfers</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <CurrentPortfolioRow 
                onChange={handleChange} 
                category="bonds" 
                difference={currentPortfolio.bonds.difference} 
                recommendedValue={currentPortfolio.bonds.recommended} 
                currentValue={currentPortfolio.bonds.amount}/>
              <CurrentPortfolioRecommendedTransfers 
                incorrectAmountFormat={incorrectAmountFormat} 
                currentPortfolio={currentPortfolio}/>
            </tr>
            <tr>
              <CurrentPortfolioRow 
                onChange={handleChange} 
                category="largeCap" 
                difference={currentPortfolio.largeCap.difference} 
                recommendedValue={currentPortfolio.largeCap.recommended} 
                currentValue={currentPortfolio.largeCap.amount} />
            </tr>
            <tr>
              <CurrentPortfolioRow 
                onChange={handleChange} 
                category="midCap" 
                difference={currentPortfolio.midCap.difference} 
                recommendedValue={currentPortfolio.midCap.recommended} 
                currentValue={currentPortfolio.midCap.amount} />
            </tr>
            <tr>
              <CurrentPortfolioRow 
                onChange={handleChange} 
                category="foreign" 
                difference={currentPortfolio.foreign.difference} 
                recommendedValue={currentPortfolio.foreign.recommended} 
                currentValue={currentPortfolio.foreign.amount} />
            </tr>
            <tr>
              <CurrentPortfolioRow 
                onChange={handleChange} 
                category="smallCap" 
                difference={currentPortfolio.smallCap.difference} 
                recommendedValue={currentPortfolio.smallCap.recommended} 
                currentValue={currentPortfolio.smallCap.amount} />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CurrentPortfolio;