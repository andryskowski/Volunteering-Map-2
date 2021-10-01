/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Map from './components/Map/Map';
import PrivateRoute from './components/Router/PrivateRoute';
// import UserPanel from './components/UserPanel/UserPanel';
import PlacePage from './components/PlacePage/PlacePage';
import MainPage from './components/MainPage/MainPage';
import Navbar from './components/Navbar/Navbar';
import UserPanel from './components/UserPanel/UserPanel';

const CURRENT_USER_ID = window.localStorage.getItem('CURRENT_USER')
  ? JSON.parse(window.localStorage.getItem('CURRENT_USER'))._id
  : false;
const PLACES = JSON.parse(window.localStorage.getItem('PLACES'));

function App() {
  return (
    <>
      <Router>
        <PrivateRoute path="/" component={Navbar} />
        <Switch>
          {CURRENT_USER_ID ? <PrivateRoute exact path="/" component={MainPage} /> : <Route exact path="/" component={LandingPage} /> }
          <PrivateRoute exact path={`/${CURRENT_USER_ID}`} component={UserPanel} />
          {PLACES.map((place) => <PrivateRoute exact path={`/${place._id}`} component={() => (<PlacePage placeId={place._id} />)} />)}
        </Switch>
      </Router>
    </>
  );
}

export default App;
