import React from 'react';
import { connect } from 'react-redux';
import CurrentPortfolio from './CurrentPortfolio';

function RiskLevelOverview(props) {

    return (
      <div>
        <h2>Risk Level {props.activeRiskLevel}</h2>
        <table>
          <thead>
            <tr>
              <th key="bonds">Bonds</th>
              <th key="largeCap">Large Cap</th>
              <th key="midCap">Mid Cap</th>
              <th key="foreign">Foreign</th>
              <th key="smallCap">smallCap</th>
            </tr>
          </thead>
          <tbody>
              {
                <tr>
                  <td>{props.riskLevelData.bonds}</td>
                  <td>{props.riskLevelData.largeCap}</td>
                  <td>{props.riskLevelData.midCap}</td>
                  <td>{props.riskLevelData.foreign}</td>
                  <td>{props.riskLevelData.smallCap}</td>
                </tr>
              }
          </tbody>
        </table>
        <CurrentPortfolio />
      </div>
    );
}

const mapStateToProps = state => ({
  riskLevelData: state.riskLevels.riskLevels[state.riskLevels.activeRiskLevel - 1],
  activeRiskLevel: state.riskLevels.activeRiskLevel
});

export default connect(mapStateToProps)(RiskLevelOverview);