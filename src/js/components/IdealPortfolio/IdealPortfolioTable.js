import React from 'react';
import { useSelector } from 'react-redux';
import IdealPortfolioTableHeader from './IdealPortfolioTableHeader';
import IdealPortfolioTableBody from './IdealPortfolioTableBody';

const IdealPortfolioTable = () => {
  const riskLevelsData = useSelector(state => state.riskLevels.riskLevels);
  const activeRiskLevel = useSelector(state => state.riskLevels.activeRiskLevel); 

  return (
    <table className="ideal-portfolio-table">
      <IdealPortfolioTableHeader />
      <IdealPortfolioTableBody 
        activeLevel={activeRiskLevel} 
        riskLevels={riskLevelsData} />
    </table>
  );
}



export default IdealPortfolioTable;