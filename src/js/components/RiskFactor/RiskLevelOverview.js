import React from 'react';
import { connect } from 'react-redux';

function RiskLevelOverview(props) {

    return (
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
                <td className="text-right">{props.riskLevelData.bonds}%</td>
                <td className="text-right">{props.riskLevelData.largeCap}%</td>
                <td className="text-right">{props.riskLevelData.midCap}%</td>
                <td className="text-right">{props.riskLevelData.foreign}%</td>
                <td className="text-right">{props.riskLevelData.smallCap}%</td>
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