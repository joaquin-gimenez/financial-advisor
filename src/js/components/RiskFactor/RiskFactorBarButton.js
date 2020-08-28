import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const RiskFactorBarButton = (props) => {
  return (
    <div className="risk-factor--button cell small-12 medium-2">
      <Link to="/calculator">
        <button 
          className="button primary"
          disabled={!props.activeLevel}>
          Continue
        </button>
      </Link>
    </div>
  );
}

const mapStateToProps = state => ({
  activeLevel: state.riskLevels.activeRiskLevel
})

export default connect(mapStateToProps)(RiskFactorBarButton);