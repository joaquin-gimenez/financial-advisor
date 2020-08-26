import React from 'react';
import { convertToDisplayName } from './Helpers/Helpers.js'

class CurrentPortfolioRow extends React.Component {

  constructor(props) {
    super(props);
  }

  handleChange(category, e) {
    this.props.onChange(category, e.target.value);
  }

  render() {
    return (
        <div className="grid-x current-portfolio--row">
          <div className="columns small-3">
            <label htmlFor={this.props.category + "CurrentAmount"}>{convertToDisplayName(this.props.category)} $:</label>
          </div>
          <div className="columns small-3">
            <input type="text" className="text-right" onChange={(e) => this.handleChange(this.props.category, e)} value={this.props.currentValue} id={this.props.category + "CurrentAmount"} />
          </div>
          <div className="columns small-3">
            <input type="text" className="text-right" value={this.props.difference} disabled />
          </div>
          <div className="columns small-3">
            <input type="text" className="text-right" value={this.props.recommendedValue} disabled />
          </div>
        </div>
    )
  }
}

export default CurrentPortfolioRow;