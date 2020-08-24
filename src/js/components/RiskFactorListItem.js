import React from 'react';
import { connect } from 'react-redux';
import { setActiveRiskLevel } from '../redux/riskLevel/riskLevel.actions';

class RiskFactorListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  updateActiveLevel(riskLevel) {
    this.props.setActiveRiskLevel(riskLevel);
  }

  render() {
    return (
      <li className={ this.props.activeLevel === this.props.riskLevel ? "active" : ""}
        onClick={() => this.updateActiveLevel(this.props.riskLevel)}>
        { this.props.riskLevel}
      </li>
    );
  }
}

export default connect(null, { setActiveRiskLevel })(RiskFactorListItem);

