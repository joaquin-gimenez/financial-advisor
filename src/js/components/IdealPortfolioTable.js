import React from 'react';
import { connect } from 'react-redux';
import IdealPortfolioTableHeader from './IdealPortfolioTableHeader';
import IdealPortfolioTableBody from './IdealPortfolioTableBody';

function IdealPortfolioTable(props) {
  return (
    <table className="ideal-portfolio-table">
      <IdealPortfolioTableHeader />
      <IdealPortfolioTableBody activeLevel={props.activeRiskLevel} riskLevels={props.riskLevelsData} />
    </table>
  );
}

const mapStateToProps = state => ({
  riskLevelsData: state.riskLevels.riskLevels,
  activeRiskLevel: state.riskLevels.activeRiskLevel
})

export default connect(mapStateToProps)(IdealPortfolioTable);