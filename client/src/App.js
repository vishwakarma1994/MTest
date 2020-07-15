import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Login from './components/Login';
import Register from './components/Register';
import DashBoard from './components/DashBoard';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={DashBoard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
