/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
import React, { useContext } from 'react';
import Map from '../Map/Map';
import '../../scss/base/_main-page.scss';
import CurrentUserContext from '../../contexts/CurrentUserContext';
// import PrivateRoute from '../Router/PrivateRoute';
// import PlacePage from '../PlacePage/PlacePage';
import { PlacesContext } from '../../contexts/PlacesContext';
// import Contact from '../Contact/Contact';

function MainPage() {
  const USER = useContext(CurrentUserContext);
  const PLACES = useContext(PlacesContext);
  return (
    <>
      <div className="main-page">
        <h1 className="hello-header">
          Witaj
          {' '}
          {USER.userInfo.name}
        </h1>
        <div>
          <Map />
        </div>
      </div>
      {console.log(PLACES)}
    </>
  );
}

export default MainPage;
