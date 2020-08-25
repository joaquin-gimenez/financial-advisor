  import React from 'react';
  
  function IdealPortfolioTableHeader(props) {
    return (
      <thead>
        <tr>
          <th key="risk">Risk</th>
          <th key="bonds">Bonds %</th>
          <th key="largeCap">Large Cap %</th>
          <th key="midCap">Mid Cap %</th>
          <th key="foreign">Foreign %</th>
          <th key="smallCap">smallCap %</th>
        </tr>
      </thead>
    );
  }
  
  export default IdealPortfolioTableHeader;