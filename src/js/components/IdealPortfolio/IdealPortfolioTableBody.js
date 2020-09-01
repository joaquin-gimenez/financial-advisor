import React from 'react';
import { categories } from '../../data';

const IdealPortfolioTableBody = (props) => {

  const generateLevelRows = (level) => {
    return categories.map(category => {
      return <td key={category.key}>{level[category.key]}</td>;
    })
  }

  return (
    <tbody>
        {
          props.riskLevels.map((level, index) => 
            <tr 
              key={level + index} 
              className={ props.activeLevel === index + 1 ? "active" : ""}>
                <td>{index + 1}</td>
                {generateLevelRows(level)}
            </tr>
          )
        }
    </tbody>
  );
}

export default IdealPortfolioTableBody;