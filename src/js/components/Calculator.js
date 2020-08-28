import React from 'react';
import { connect } from 'react-redux';
import RiskLevelOverview from './RiskFactor/RiskLevelOverview';
import CurrentPortfolio from './CurrentPortfolio/CurrentPortfolio';

function calculator(props) {

    return (
      <div>
        <h2 className="text-center">Personalized Portfolio</h2>
        <h3>Risk Level {props.activeRiskLevel}</h3>
        <RiskLevelOverview />
        <CurrentPortfolio />
      </div>
    );
}

const mapStateToProps = state => ({
  activeRiskLevel: state.riskLevels.activeRiskLevel
});

export default connect(mapStateToProps)(calculator);