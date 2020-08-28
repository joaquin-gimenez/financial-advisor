import React from 'react';
import { connect } from 'react-redux';
import CurrentPortfolioRow from './CurrentPortfolioRow';
import CurrentPortfolioRecommendedTransfers from './CurrentPortfolioRecommendedTransfers';
import { toTwoDecimal } from '../Helpers/Helpers';

class CurrentPortfolio extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      enableRebalance: false, 
      totalCurrentValues: 0,
      incorrectAmountFormat: false,
      currentPortfolio: {
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
      }
    }

    this.handleChange =  this.handleChange.bind(this);
    this.handleRebalance =  this.handleRebalance.bind(this);
    this.checkStatusButton = this.checkStatusButton.bind(this);
  }

  handleChange (category, value) {
    let currentPortfolio = {...this.state.currentPortfolio};
    currentPortfolio[category].amount = isNaN(value) || value === "" ? value : parseInt(value);
    
    this.setState({
      ...currentPortfolio
    });

    this.checkStatusButton();
  }

  checkStatusButton() {
    let enableRebalance = Object.values(this.state.currentPortfolio).every((category) => {
      return category.amount;
    });
    this.setState({
      enableRebalance 
    });
  }

  handleRebalance () {
    let currentPortfolio = {...this.state.currentPortfolio};
    if (!this.shouldRebalance(currentPortfolio)) {
      return;
    }
    const totalCurrentValues = this.calculateTotalCurrentValues();

    for (const [category, data] of Object.entries(currentPortfolio)) {
      data.recommended = this.calculateNewAmount(category, totalCurrentValues);
      data.difference = this.calculateDifference(data.amount, data.recommended);
    }

    this.setState({
      ...currentPortfolio,
      incorrectAmountFormat: false
    })
  }

  shouldRebalance(currentPortfolio) {
    let allNumbers = Object.values(currentPortfolio).every(category => {
      return !isNaN(category.amount);
    })
    if (!allNumbers) {
      this.setState({
        incorrectAmountFormat: true
      });
    }
    return allNumbers;
  }

  calculateTotalCurrentValues() {
    let currentPortfolio = Object.values(this.state.currentPortfolio);
    return Object.keys(currentPortfolio)
      .map((category) => {
        return currentPortfolio[category].amount;
      })
      .reduce((sum, value) => {
        return sum + value;
      }, 0);
  }

  calculateNewAmount(type, totalCurrentValues) {
    let idealPercentageValue = this.props.riskLevelData[type];
    let newAmount = (idealPercentageValue * totalCurrentValues) / 100
    return Math.round( newAmount * 100) / 100;
  }

  calculateDifference(amount, recommendedAmount) {
    return toTwoDecimal(recommendedAmount - amount);  
  }

  render() {
    return (
      <div className="current-portfolio">
        <div className="current-portfolio--header grid-x">
          <h3 className="columns small-12 medium-10 text-center medium-text-left">
            Please Enter Your Current Portfolio
          </h3>
          <div className="columns small-12 medium-2 text-center medium-text-left"> 
            <button 
              className="button primary" 
              onClick={this.handleRebalance} 
              disabled={!this.state.enableRebalance}>
                Rebalance
            </button>
          </div>
        </div>
        <div className="grid-x">
          <table className="current-portfolio--table columns small-12 unstriped">
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
                  onChange={this.handleChange} 
                  category="bonds" 
                  difference={this.state.currentPortfolio.bonds.difference} 
                  recommendedValue={this.state.currentPortfolio.bonds.recommended} 
                  currentValue={this.state.currentPortfolio.bonds.amount}/>
                <CurrentPortfolioRecommendedTransfers 
                  incorrectAmountFormat={this.state.incorrectAmountFormat} 
                  currentPortfolio={this.state.currentPortfolio}/>
              </tr>
              <tr>
                <CurrentPortfolioRow 
                  onChange={this.handleChange} 
                  category="largeCap" 
                  difference={this.state.currentPortfolio.largeCap.difference} 
                  recommendedValue={this.state.currentPortfolio.largeCap.recommended} 
                  currentValue={this.state.currentPortfolio.largeCap.amount} />
              </tr>
              <tr>
                <CurrentPortfolioRow 
                  onChange={this.handleChange} 
                  category="midCap" 
                  difference={this.state.currentPortfolio.midCap.difference} 
                  recommendedValue={this.state.currentPortfolio.midCap.recommended} 
                  currentValue={this.state.currentPortfolio.midCap.amount} />
              </tr>
              <tr>
                <CurrentPortfolioRow 
                  onChange={this.handleChange} 
                  category="foreign" 
                  difference={this.state.currentPortfolio.foreign.difference} 
                  recommendedValue={this.state.currentPortfolio.foreign.recommended} 
                  currentValue={this.state.currentPortfolio.foreign.amount} />
              </tr>
              <tr>
                <CurrentPortfolioRow 
                  onChange={this.handleChange} 
                  category="smallCap" 
                  difference={this.state.currentPortfolio.smallCap.difference} 
                  recommendedValue={this.state.currentPortfolio.smallCap.recommended} 
                  currentValue={this.state.currentPortfolio.smallCap.amount} />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  riskLevelData: state.riskLevels.riskLevels[state.riskLevels.activeRiskLevel - 1]
});

export default connect(mapStateToProps)(CurrentPortfolio);