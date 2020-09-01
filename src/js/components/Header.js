import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <div className="row header">
    <Link to="/">
      <img src="/src/assets/home.ico" />
    </Link>
    <h1 className="text-center">Financial Advisor</h1>
  </div>
)

export default Header;