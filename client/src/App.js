/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import i18next from 'i18next';
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
import UsersPanel from './components/UsersPanel/UsersPanel';
import PlacesPanel from './components/PlacesPanel/PlacesPanel';
import UserProfile from './components/UserProfile/UserProfile';
import { UsersContext } from './contexts/UsersContext';
import Messages from './components/Messages/Messages';
import MessagesPanel from './components/MessagesPanel/MessagesPanel';
import CommentsPanel from './components/CommentsPanel/CommentsPanel';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

const CURRENT_USER = JSON.parse(window.localStorage.getItem('CURRENT_USER'));
const CURRENT_USER_ID = CURRENT_USER ? CURRENT_USER._id : false;

function App() {
  const PLACES = useContext(PlacesContext);
  const USERS = useContext(UsersContext);

  const changeLang = () => {
    if (i18next.resolvedLanguage === 'en')
    {
      i18next.changeLanguage('pl');
    }
    else if (i18next.resolvedLanguage === 'pl')
    {
      i18next.changeLanguage('en');
    }
    // i18next.changeLanguage('pl');
    console.log(i18next);
  };

  return (
    <>
      <Router>
        {CURRENT_USER_ID ? <PrivateRoute path="/" component={Navbar} /> : false}
        <div className="container-button-changelang">
          <button onClick={() => { changeLang(); }} className="button-changelang">PL</button>
        </div>
        
        <ScrollToTop>
          <Switch>
            {CURRENT_USER_ID ? (
              <PrivateRoute exact path="/" component={MainPage} />
            ) : (
              <Route exact path="/" component={LandingPage} />
            )}
            <PrivateRoute exact path="/messages" component={Messages} />
            <PrivateRoute exact path="/messagespanel" component={MessagesPanel} />
            <PrivateRoute exact path="/commentspanel" component={CommentsPanel} />
            <PrivateRoute exact path={`/edit/${CURRENT_USER_ID}`} component={UserPanel} />
            <PrivateRoute exact path="/userProfile" component={UserProfile} />
            {PLACES ? PLACES.map((place) => (
              <PrivateRoute
                exact
                path={`/${place._id}`}
                component={() => <PlacePage placeId={place._id} />}
              />
            )) : false}
            {USERS ? USERS.map((user) => (
              <PrivateRoute
                exact
                path={`/${user._id}`}
                component={() => <UserProfile userId={user._id} />}
              />
            )) : false}
            {CURRENT_USER_ID ? <PrivateRoute path="/contact" component={Contact} /> : false}
            {CURRENT_USER_ID ? <PrivateRoute path="/listplaces" component={ListPlaces} /> : false}
            {CURRENT_USER_ID ? <PrivateRoute path="/addplace" component={PlaceForm} /> : false}
            {(CURRENT_USER_ID && CURRENT_USER.role === 'moderator') || (CURRENT_USER_ID && CURRENT_USER.role === 'admin')
              ? <PrivateRoute path="/userspanel" component={UsersPanel} /> : false}
            {(CURRENT_USER_ID && CURRENT_USER.role === 'moderator') || (CURRENT_USER_ID && CURRENT_USER.role === 'admin')
              ? <PrivateRoute path="/placespanel" component={PlacesPanel} /> : false}
          </Switch>
        </ScrollToTop>
      </Router>
    </>
  );
}

export default App;
