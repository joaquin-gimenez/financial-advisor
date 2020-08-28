import React from 'react';
import { convertToDisplayName, toTwoDecimal } from './Helpers/Helpers';

class RecommendedTransfers extends React.Component {

  constructor(props) {
    super(props);
  }

  generateRecommendedTransfers() {
    let overRecommendedAmount = new Map();
    let underRecommendedAmount = new Map();
    let onRecommendedAmount = new Map();
    let steps = []; 

    Object.entries(this.props.currentPortfolio).map((category) => {
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
      <td className="large-col current-portfolio--recommended" rowSpan="5">
        <div>
        {this.props.incorrectAmountFormat
          ? <p className="color-error">Please use only positive digits or zero when entering current amounts. Please enter all inputs correctly.</p>
          : steps.map((step, index) => {
              return <div className="current-portfolio--recommended-item" key={index}>• Transfer ${step.amount} from {convertToDisplayName(step.from)} to {convertToDisplayName(step.to)}.</div>;
            })
        }
        </div>
      </td>
    );
  }

  render() {
    return (
      this.generateRecommendedTransfers()
    )
  }
}

export default RecommendedTransfers;