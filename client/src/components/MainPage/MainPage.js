/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
import React, { useContext } from 'react';
import Map from '../Map/Map';
import '../../scss/base/_main-page.scss';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Legend from '../Legend/Legend';

function MainPage() {
  const USER = useContext(CurrentUserContext);

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
          <Legend />
        </div>
      </div>
    </>
  );
}

export default MainPage;
