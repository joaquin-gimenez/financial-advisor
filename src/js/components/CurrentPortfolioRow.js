import React from 'react';
import { convertToDisplayName } from './Helpers/Helpers.js'

class CurrentPortfolioRow extends React.Component {

  constructor(props) {
    super(props);
  }

  handleChange(category, e) {
    this.props.onChange(category, e.target.value);
  }

  formatAmountDifference(difference) {
    return typeof difference === 'number' && Math.sign(difference) >= 0 ? "+" + difference: difference;
  }

  render() {
    return (
        <>
          <td className="small-col">
            <label htmlFor={this.props.category + "CurrentAmount"}>{convertToDisplayName(this.props.category)} $:</label>
          </td>
          <td className="mid-col">
            <input type="text" className="text-right" onChange={(e) => this.handleChange(this.props.category, e)} value={this.props.currentValue} id={this.props.category + "CurrentAmount"} />
          </td>
          <td className="mid-col">
            <input type="text" className={"text-right " + (Math.sign(this.props.difference) >= 0 ? "color-success" : "color-error") } value={this.formatAmountDifference(this.props.difference)} disabled />
          </td>
          <td className="mid-col">
            <input type="text" className="color-info text-right" value={this.props.recommendedValue} disabled />
          </td>
        </>
    )
  }
}

export default CurrentPortfolioRow;