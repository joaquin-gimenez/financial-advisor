import React from 'react';
import { convertToDisplayName } from '../Helpers/Helpers.js'

const CurrentPortfolioRow = (props) => {

  const handleChange = (category, e) => {
    props.onChange(category, e.target.value);
  }

  const formatAmountDifference = (difference) => {
    return typeof difference === 'number' && Math.sign(difference) >= 0 
      ? "+" + difference
      : difference;
  }

  return (
      <>
        <td className="small-col">
          <label htmlFor={props.category + "CurrentAmount"}>
            {convertToDisplayName(props.category)} $:
          </label>
        </td>
        <td className="mid-col">
          <input type="text" 
            id={props.category + "CurrentAmount"}
            className="highlight-animation text-right" 
            onChange={(e) => handleChange(props.category, e)} 
            value={props.currentValue} 
            autoComplete="off" />
        </td>
        <td className="mid-col">
          <input type="text" 
            className={"text-right " + (Math.sign(props.difference) >= 0 ? "color-success" : "color-error") } 
            value={formatAmountDifference(props.difference)} 
            disabled />
        </td>
        <td className="mid-col">
          <input type="text" 
            className="color-info text-right" 
            value={props.recommendedValue} 
            disabled />
        </td>
      </>
  )
}

export default CurrentPortfolioRow;