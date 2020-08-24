import React from 'react';
import { connect } from 'react-redux';

function IdealPortfolioGraph() {
  return (
    <div>graph here</div>
  );
}

const mapStateToProps = state => ({
  riskLevelsData: state.riskLevels.riskLevels,
  activeRiskLevel: state.riskLevels.activeRiskLevel
})

export default connect(mapStateToProps)(IdealPortfolioGraph);