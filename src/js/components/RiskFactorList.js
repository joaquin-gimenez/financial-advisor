import React from 'react';
import { connect } from 'react-redux';
import RiskFactorListItem from './RiskFactorListItem';

const RiskFactorList = (riskLevels) => {
  
    return (
      <ul>
        {
          riskLevels.riskLevelsData.map((level, index) => {
            return <RiskFactorListItem  riskLevel={index + 1} activeLevel={riskLevels.activeRiskLevel} key={index + 1} />
          })
        }
      </ul>
    );
}

const mapStateToProps = state => ({
  riskLevelsData: state.riskLevels.riskLevels,
  activeRiskLevel: state.riskLevels.activeRiskLevel
})

export default connect(mapStateToProps)(RiskFactorList);