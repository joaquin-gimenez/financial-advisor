import React, { useState } from 'react';
import IdealPortfolioTable from './IdealPortfolioTable';
import IdealPortfolioGraph from './IdealPortfolioGraph';
import IdealPortfolioButton from './IdealPortfolioButton';

const IdealPortfolioOverview = () => {

  const [displayAsGraph, setDisplayAsGraph] = useState(false);

  const handleTableModeChange = () => {
    setDisplayAsGraph(!displayAsGraph);
  }

  return (
    <div className="ideal-overview grid-x">
      <div className="cell small-12 medium-10 text-center">
        {displayAsGraph
          ? <IdealPortfolioGraph />
          : <IdealPortfolioTable />
        }
      </div>
      <div className="cell small-12 medium-2 text-center">
        <IdealPortfolioButton 
          graphMode={displayAsGraph} 
          onClick={handleTableModeChange}/>
      </div>
    </div>
  );
}

export default IdealPortfolioOverview;