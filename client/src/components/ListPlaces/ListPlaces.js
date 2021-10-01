/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PlacePage from '../PlacePage/PlacePage';
import '../../scss/base/list-places.scss';

function ListPlaces() {
  const [places, setPlaces] = useState(JSON.parse(window.localStorage.getItem('PLACES')));

  useEffect(() => {

  });

  return (
    <>
      <h1>Lista fundacji:</h1>
      {places.map((place) => (
        <div className="place-list-item">
          <div className="place-img">
            <h4><img src={place.img} alt="place-img" width="100" height="100" /></h4>
          </div>
          <div className="place-name">
            <h4><Link to={place._id}>{place.name}</Link></h4>
          </div>
          <div className="place-address">
            <h5>
              {place.city}
              ,
              {' '}
              {place.street}
              ,
              {' '}
              {place.houseNo}
              ,
              {' '}
              {place.postalCode}
            </h5>
          </div>
          <div className="place-category">
            <p>
              Kategoria:
              {place.category}
            </p>
          </div>
          <div className="place-district">
            <p>
              Dzielnica:
              {place.district}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

export default ListPlaces;
