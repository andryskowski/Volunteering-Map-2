/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
import React from 'react';
import Map from '../Map/Map';
import ListPlaces from '../ListPlaces/ListPlaces';
import PlaceForm from '../PlaceForm/PlaceForm';
import PrivateRoute from '../Router/PrivateRoute';
import UserPanel from '../UserPanel/UserPanel';

const CURRENT_USER_ID = window.localStorage.getItem('CURRENT_USER')
  ? JSON.parse(window.localStorage.getItem('CURRENT_USER'))._id
  : false;

function MainPage() {
  return (
    <>
      <h1>Main Page</h1>
      <div>
        <Map />
        <ListPlaces />
        <PlaceForm />
        <PrivateRoute exact path={`/${CURRENT_USER_ID}`} component={UserPanel} />
      </div>
    </>
  );
}

export default MainPage;
