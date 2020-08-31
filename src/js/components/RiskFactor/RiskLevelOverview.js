import React from 'react';
import { connect } from 'react-redux';
import { categories } from '../../data';

function RiskLevelOverview(props) {

  function generateCategoryHeader() {
    return categories.map(category => {
      return <th key={category.key}>{category.label}</th>;
    })
  }
  function generateCategoryList() {
    return categories.map(category => {
      return <td className="text-right" key={category.key}>{props.riskLevelData[category.key] + "%"}</td>
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

const mapStateToProps = state => ({
  riskLevelData: state.riskLevels.riskLevels[state.riskLevels.activeRiskLevel - 1],
  activeRiskLevel: state.riskLevels.activeRiskLevel
});

export default connect(mapStateToProps)(RiskLevelOverview);