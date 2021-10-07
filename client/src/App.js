/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import PrivateRoute from './components/Router/PrivateRoute';
import PlacePage from './components/PlacePage/PlacePage';
import MainPage from './components/MainPage/MainPage';
import Navbar from './components/Navbar/Navbar';
import UserPanel from './components/UserPanel/UserPanel';
import Contact from './components/Contact/Contact';
import ListPlaces from './components/ListPlaces/ListPlaces';
import PlaceForm from './components/PlaceForm/PlaceForm';
import { PlacesContext } from './contexts/PlacesContext';
import UsersList from './components/UsersList/UsersList';

const CURRENT_USER = JSON.parse(window.localStorage.getItem('CURRENT_USER'));
const CURRENT_USER_ID = CURRENT_USER ? CURRENT_USER._id : false;

function App() {
  const PLACES = useContext(PlacesContext);
  return (
    <>
      <Router>
        {CURRENT_USER_ID ? <PrivateRoute path="/" component={Navbar} /> : false}
        <Switch>
          {CURRENT_USER_ID ? (
            <PrivateRoute exact path="/" component={MainPage} />
          ) : (
            <Route exact path="/" component={LandingPage} />
          )}
          <PrivateRoute exact path={`/${CURRENT_USER_ID}`} component={UserPanel} />
          {PLACES ? PLACES.map((place) => (
            <PrivateRoute
              exact
              path={`/${place._id}`}
              component={() => <PlacePage placeId={place._id} />}
            />
          )) : false}
          {CURRENT_USER_ID ? <PrivateRoute path="/contact" component={Contact} /> : false}
          {CURRENT_USER_ID ? <PrivateRoute path="/listplaces" component={ListPlaces} /> : false}
          {CURRENT_USER_ID ? <PrivateRoute path="/addplace" component={PlaceForm} /> : false}
          {CURRENT_USER_ID ? <PrivateRoute path="/userslist" component={UsersList} /> : false}
        </Switch>
      </Router>
    </>
  );
}

export default App;
