import React from 'react';
import RiskFactorBar from './RiskFactorBar';
import RiskFactorBarButton from './RiskFactorBarButton';

const RiskFactorHeader = () => {
    return (
      <section>
        <h2 className="text-center">Please Select A Risk Level For Your Investment Portfolio</h2>
        <div className="risk-factor--select grid-x">
          <RiskFactorBar />
          <RiskFactorBarButton />
        </div>
      </section>
    );
}

export default RiskFactorHeader;