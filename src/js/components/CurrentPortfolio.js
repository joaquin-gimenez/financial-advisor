import React from 'react';
import { connect } from 'react-redux';
import CurrentPortfolioRow from './CurrentPortfolioRow';

class CurrentPortfolio extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      totalCurrentValues: 0,
      currentPortfolio: {
        bonds: {
          amount: 2,
          recommended: "",
          difference: ""
        },
        largeCap: {
          amount: 3,
          recommended: "",
          difference: ""
        },
        midCap: {
          amount: 1,
          recommended: "",
          difference: ""
        },
        foreign: {
          amount: 5,
          recommended: "",
          difference: ""
        },
        smallCap: {
          amount: 10,
          recommended: "",
          difference: ""
        }
      }
    }

    this.handleChange =  this.handleChange.bind(this);
    this.handleRebalance =  this.handleRebalance.bind(this);
  }

  handleChange (category, value) {
    let currentPortfolio = {...this.state.currentPortfolio};
    currentPortfolio[category].amount = value;
    
    this.setState({
      ...currentPortfolio
    });
  }

  handleRebalance () {
    let currentPortfolio = {...this.state.currentPortfolio};
    const totalCurrentValues = this.calculateTotalCurrentValues();

    for (const [category, data] of Object.entries(currentPortfolio)) {
      data.recommended = this.calculateNewAmount(category, totalCurrentValues);
      data.difference = this.calculateDifference(data.amount, data.recommended);
    }

    this.setState({
      CurrentPortfolio: {
        ...this.state.currentPortfolio,
        currentPortfolio
      }
    })
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
    let difference = parseFloat((recommendedAmount - amount).toFixed(2));  
    return Math.sign(difference) >= 0 ? "+" + difference: difference;
  }

  generateRecommendedTransfers() {
    return <div className="columns small-12 medium-3">
      <div>• Transfer $X from X to X.</div>
      <div>• Transfer $X from X to X.</div>
    </div>;
  }

  render() {
    return (
      <div className="current-portfolio">
        <div className="grid-x">
          <h2 className="columns small-12 medium-10">Please Enter Your Current Portfolio</h2>
          <div className="columns small-12 medium-2"> 
            <button className="button primary" onClick={this.handleRebalance}>Rebalance</button>
          </div>
        </div>
        <div className="grid-x">
          <div className="columns small-12 medium-9">
            <CurrentPortfolioRow onChange={this.handleChange} category="bonds" difference={this.state.currentPortfolio.bonds.difference} recommendedValue={this.state.currentPortfolio.bonds.recommended} currentValue={this.state.currentPortfolio.bonds.amount}/>
            <CurrentPortfolioRow onChange={this.handleChange} category="largeCap" difference={this.state.currentPortfolio.largeCap.difference} recommendedValue={this.state.currentPortfolio.largeCap.recommended} currentValue={this.state.currentPortfolio.largeCap.amount} />
            <CurrentPortfolioRow onChange={this.handleChange} category="midCap" difference={this.state.currentPortfolio.midCap.difference} recommendedValue={this.state.currentPortfolio.midCap.recommended} currentValue={this.state.currentPortfolio.midCap.amount} />
            <CurrentPortfolioRow onChange={this.handleChange} category="foreign" difference={this.state.currentPortfolio.foreign.difference} recommendedValue={this.state.currentPortfolio.foreign.recommended} currentValue={this.state.currentPortfolio.foreign.amount} />
            <CurrentPortfolioRow onChange={this.handleChange} category="smallCap" difference={this.state.currentPortfolio.smallCap.difference} recommendedValue={this.state.currentPortfolio.smallCap.recommended} currentValue={this.state.currentPortfolio.smallCap.amount} />
          </div>
          {this.generateRecommendedTransfers()}
        
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  riskLevelData: state.riskLevels.riskLevels[state.riskLevels.activeRiskLevel - 1],
  activeRiskLevel: state.riskLevels.activeRiskLevel
});

export default connect(mapStateToProps)(CurrentPortfolio);