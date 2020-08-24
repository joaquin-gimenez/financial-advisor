import React from 'react';

function IdealPortfolioTableBody(props) {

  return (
    <tbody>
        {
          props.riskLevels.map((level, index) => 
            <tr key={level + index}>
              <td>{index + 1}</td>
              <td>{level.bonds}</td>
              <td>{level.largeCap}</td>
              <td>{level.midCap}</td>
              <td>{level.foreign}</td>
              <td>{level.smallCap}</td>
            </tr>
          )
        }
    </tbody>
  );
}

export default IdealPortfolioTableBody;