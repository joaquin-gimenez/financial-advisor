import React from 'react';
import { useSelector } from 'react-redux';
import RiskFactorListItem from './RiskFactorListItem';

const RiskFactorList = () => {
  const riskLevels = useSelector(state => state.riskLevels.riskLevels);
  const activeRiskLevel = useSelector(state => state.riskLevels.activeRiskLevel);

  return (
    <ul className="risk-factor--list grid-x no-bullet align-middle">
      {
        riskLevels.map((level, index) => {
          return <RiskFactorListItem 
                    riskLevel={index + 1} 
                    activeLevel={activeRiskLevel} 
                    key={index + 1} />
        })
      }
    </ul>
  );
}

export default RiskFactorList;