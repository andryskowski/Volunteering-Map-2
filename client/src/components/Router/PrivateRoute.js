import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';

// eslint-disable-next-line react/prop-types
export default function PrivateRoute({ component: Component, ...rest }) {
  const CURRENT_USER = useContext(CurrentUserContext);
  // currentUser = JSON.parse(window.localStorage.getItem('Username'));
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      // eslint-disable-next-line react/jsx-props-no-spreading
      render={(props) => (CURRENT_USER ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
}
