import React from 'react';
import { connect } from 'react-redux';
import IdealPortfolioTableHeader from './IdealPortfolioTableHeader';
import IdealPortfolioTableBody from './IdealPortfolioTableBody';

function IdealPortfolioTable(props) {
  return (
    <table>
      <IdealPortfolioTableHeader />
      <IdealPortfolioTableBody riskLevels={props.riskLevelsData} />
    </table>
  );
}

const mapStateToProps = state => ({
  riskLevelsData: state.riskLevels.riskLevels,
  activeRiskLevel: state.riskLevels.activeRiskLevel
})

export default connect(mapStateToProps)(IdealPortfolioTable);