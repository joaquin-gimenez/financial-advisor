import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Calculator from './Calculator';

const App = () => (
  <Router>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </nav>
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
  </Router>
)

export default App;