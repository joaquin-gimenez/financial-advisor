import React from 'react';
import { useSelector } from "react-redux";
import { categories } from '../../data';

const RiskLevelOverview = () => {

  const activeRiskLevel = useSelector(state => state.riskLevels.activeRiskLevel);
  const riskLevel = useSelector(
    state => state.riskLevels.riskLevels[
      activeRiskLevel - 1
    ]
  );


  const generateCategoryHeader = () => {
    return categories.map(category => {
      return <th key={category.key}>
        {category.label}
      </th>;
    })
  }

  const generateCategoryList = () => {
    return categories.map(category => {
      return <td className="text-right" key={category.key}>
        {riskLevel[category.key] + "%"}
      </td>
    })
  }

  return (
    <table className="risk-level-overview">
      <thead>
        <tr>
          {generateCategoryHeader()}
        </tr>
      </thead>
      <tbody>
          {
            <tr>
              {generateCategoryList()}
            </tr>
          }
      </tbody>
    </table>
  );
}

export default RiskLevelOverview;