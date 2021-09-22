import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import Test from './components/Map/Map';
import PrivateRoute from './components/Router/PrivateRoute';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <PrivateRoute path="/hello" component={Test} />
      </Switch>
    </Router>
  );
}

export default App;
