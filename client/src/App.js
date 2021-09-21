import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RegisterForm from './components/Register/RegisterForm';
import Test from './components/Test/Test';
import PrivateRoute from './components/Router/PrivateRoute';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={RegisterForm} />
        <PrivateRoute path="/hello" component={Test} />
      </Switch>
    </Router>
  );
}

export default App;
