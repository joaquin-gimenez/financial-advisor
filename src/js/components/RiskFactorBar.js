import React from 'react';
import RiskFactorList from './RiskFactorList';

function RiskFactorBar(props) {
  return (
    <div className="cell small-12 medium-10">
      <div className="grid-x risk-factor--levels">
        <div className="text-left columns small-6">Low</div>
        <div className="text-right columns small-6">High</div>
      </div>
      <RiskFactorList />
    </div>
  );
}

export default RiskFactorBar;