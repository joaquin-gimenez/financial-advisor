import React from 'react';
import { connect } from 'react-redux';
import CurrentPortfolioRow from './CurrentPortfolioRow';
import { toTwoDecimal } from './Helpers/Helpers';

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
    let difference = toTwoDecimal(recommendedAmount - amount);  
    // return Math.sign(difference) >= 0 ? "+" + difference: difference;
    return difference;
  }

  generateRecommendedTransfers() {
    let overRecommendedAmount = new Map();
    let underRecommendedAmount = new Map();
    let onRecommendedAmount = new Map();
    let steps = []; 

    Object.entries(this.state.currentPortfolio).map((category) => {
      if (category[1].difference > 0) {
        underRecommendedAmount.set(category[0], category[1].difference);
      } else if (category[1].difference < 0) {
        overRecommendedAmount.set(category[0], category[1].difference);
      } else {
        onRecommendedAmount.set(category[0], category[1].difference);
      }
    });

    while(overRecommendedAmount.size) {
      for (let [keyOver] of overRecommendedAmount) {
        for (let [keyUnder] of underRecommendedAmount) {
          if (!overRecommendedAmount.has(keyOver) || !underRecommendedAmount.has(keyUnder)) {
            continue;
          }
          let amountToTransfer;
          if (Math.abs(overRecommendedAmount.get(keyOver)) >= underRecommendedAmount.get(keyUnder)) {
            amountToTransfer = toTwoDecimal(underRecommendedAmount.get(keyUnder));
            overRecommendedAmount.set(keyOver, toTwoDecimal( overRecommendedAmount.get(keyOver) + amountToTransfer ));
            underRecommendedAmount.set(keyUnder, 0);
          } else {
            amountToTransfer = toTwoDecimal( Math.abs(overRecommendedAmount.get(keyOver)) );
            underRecommendedAmount.set(keyUnder, toTwoDecimal( underRecommendedAmount.get(keyUnder) - amountToTransfer ));
            overRecommendedAmount.set(keyOver, 0);
          }
          steps.push({
            amount: Math.abs(amountToTransfer),
            from: keyOver,
            to: keyUnder  
          });

          if(underRecommendedAmount.get(keyUnder) === 0) {
            underRecommendedAmount.delete(keyUnder);
            onRecommendedAmount.set(keyUnder, 0);
          }
          if(overRecommendedAmount.get(keyOver) === 0) {
            overRecommendedAmount.delete(keyOver);
            onRecommendedAmount.set(keyOver, 0);
          }
        }
      }
    }
    return this.printRecommendedTransfers(steps);
  }

  printRecommendedTransfers(steps) {
    return (
      <div className="current-portfolio--recommended-steps columns small-12 medium-3">
        <ul>
          {
            steps.map((step, index) => {
              return <li key={index}>Transfer ${step.amoun} from ${step.from} to ${step.to}.</li>;
            })
          }
        </ul>
      </div>
    );
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