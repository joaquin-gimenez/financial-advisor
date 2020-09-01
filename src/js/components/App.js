import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Calculator from './Calculator';
import '../../index.scss';

const App = () => (
  <Router>
    <Header />
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