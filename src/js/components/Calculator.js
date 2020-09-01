import React from 'react';
import { useSelector } from "react-redux";
import RiskLevelOverview from './RiskFactor/RiskLevelOverview';
import CurrentPortfolio from './CurrentPortfolio/CurrentPortfolio';

const Calculator = (props) => {
  const activeRiskLevel = useSelector(state => state.riskLevels.activeRiskLevel);
  return (
    <div>
      <h2 className="text-center">Personalized Portfolio</h2>
      <h3>Risk Level {activeRiskLevel}</h3>
      <RiskLevelOverview />
      <CurrentPortfolio />
    </div>
  );
}

export default Calculator;