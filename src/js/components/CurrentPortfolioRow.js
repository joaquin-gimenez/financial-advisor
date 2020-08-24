import React from 'react';

class CurrentPortfolioRow extends React.Component {

  constructor(props) {
    super(props);
  }

  handleChange(category, e) {
    this.props.onChange(category, e.target.value);
  }

  convertToDisplayName(name) {
    var displayName = name.split(/(?=[A-Z])/).join(" ");
    return displayName.charAt(0).toUpperCase() + displayName.slice(1);
  }

  render(){
    return (
        <div>
          <div>
            {this.convertToDisplayName(this.props.category)} $:
          </div>
          <div>
            <input type="text" onChange={(e) => this.handleChange(this.props.category, e)} value={this.props.currentValue} name={this.props.category + "CurrentAmount"} />
          </div>
          <div>
            <input type="text" value={this.props.difference} name={this.props.category + "Difference"} readOnly />
          </div>
          <div>
            <input type="text" value={this.props.recommendedValue} name={this.props.category + "NewAmount"} readOnly />
          </div>
        </div>
    )
  }
}

export default CurrentPortfolioRow;