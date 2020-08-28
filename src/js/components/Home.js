import React from 'react';
import RiskFactorHeader from './RiskFactor/RiskFactorHeader';
import IdealPortfolioOverview from './IdealPortfolio/IdealPortfolioOverview';

const Home = () => {
  return (
    <div>
      <RiskFactorHeader />
      <IdealPortfolioOverview /> 
    </div>
  )
}

export default Home;