import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function PrivateRoute({ component: Component, ...rest }) {
  const currentUser = window.localStorage.getItem('CURRENT_USER');
  // currentUser = JSON.parse(window.localStorage.getItem('Username'));
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      // eslint-disable-next-line react/jsx-props-no-spreading
      render={(props) => (currentUser ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
}
