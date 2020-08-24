import React from 'react';
import RiskFactorList from './RiskFactorList';

function RiskFactorBar(props) {
  return (
    <div>
      <div className="risk-label-levels">
        <div>Low</div>
        <div>High</div>
      </div>
      <RiskFactorList />
    </div>
  );
}

export default RiskFactorBar;