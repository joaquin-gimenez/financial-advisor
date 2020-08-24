import React from 'react';
import { Link } from 'react-router-dom';

const RiskFactorBarButton = () => {
  return (
    <Link to="/calculator">
      <button id="continue">Continue</button>
    </Link>
  );
}

export default RiskFactorBarButton;