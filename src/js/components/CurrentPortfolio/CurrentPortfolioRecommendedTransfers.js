import React from 'react';
import { unCamelCase, uppercaseFirstLetter, toTwoDecimal } from '../Helpers/Helpers';

const RecommendedTransfers = (props) => {

  function generateRecommendedTransfers() {
    let overRecommendedAmount = new Map(),
    underRecommendedAmount = new Map(),
    onRecommendedAmount = new Map(),
    steps = []; 

    Object.entries(props.currentPortfolio).map((category) => {
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
    return steps;
  }

  function printRecommendedTransfers(steps) {
    return (
      <td className="large-col current-portfolio--recommended" rowSpan="5">
        <div>
        {props.incorrectAmountFormat
          ? <p className="current-portfolio--recommended-error color-error">Please use only positive digits or zero when entering current amounts. Please enter all inputs correctly.</p>
          : steps.map((step, index) => {
              return <div className="current-portfolio--recommended-item" key={index}>
                  • Transfer ${step.amount} from { uppercaseFirstLetter(unCamelCase(step.from))} to {uppercaseFirstLetter(unCamelCase(step.to))}.
                </div>;
            })
        }
        </div>
      </td>
    );
  }

  return (
    printRecommendedTransfers(
      generateRecommendedTransfers()
    )
  )
}

export default RecommendedTransfers;