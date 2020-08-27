import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Calculator from './Calculator';
import '../../index.scss';

const App = () => (
  <Router>
    <div className="row header">
      <Link to="/">
        <img src="/src/assets/home.ico" />
      </Link>
          
      <h1 className="text-center">Financial Advisor</h1>
    </div>
    <div className="grid-container">
      <Switch>
        <Route 
          path="/calculator"
          render={() => <Calculator />}
          
        />
        <Route 
          exact={true} 
          path="/"
          render={() => <Home />}
        />
      </Switch>
      
    </div>
  </Router>
)

export default App;