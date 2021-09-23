/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import Map from './components/Map/Map';
import PrivateRoute from './components/Router/PrivateRoute';
import UserPanel from './components/UserPanel/UserPanel';

const CURRENT_USER_ID = window.localStorage.getItem('CURRENT_USER')
  ? JSON.parse(window.localStorage.getItem('CURRENT_USER'))._id
  : false;
console.log(CURRENT_USER_ID);

function App() {
  return (
    <Router>
      <Switch>
        {CURRENT_USER_ID ? <PrivateRoute exact path="/" component={Map} /> : <Route exact path="/" component={LoginForm} /> }
        <PrivateRoute exact path={`/${CURRENT_USER_ID}`} component={UserPanel} />
      </Switch>
    </Router>
  );
}

export default App;
