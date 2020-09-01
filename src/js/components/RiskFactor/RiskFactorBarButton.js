import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";


const RiskFactorBarButton = () => {
  const activeLevel = useSelector(state => state.riskLevels.activeRiskLevel);

  return (
    <div className="risk-factor--button cell small-12 medium-2">
      <Link to="/calculator">
        <button 
          className="button primary"
          disabled={!activeLevel}>
          Continue
        </button>
      </Link>
    </div>
  );
}

export default RiskFactorBarButton;