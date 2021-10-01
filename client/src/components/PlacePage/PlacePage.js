/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Children } from 'react';
import { Link } from 'react-router-dom';
import '../../scss/base/list-places.scss';
import Parser from 'html-react-parser';

function ListPlaces(props) {
  const [places, setPlaces] = useState(JSON.parse(window.localStorage.getItem('PLACES')));
  const { placeId } = props;

  useEffect(() => {

  }, []);
  return (
    <>
      <h1>PlacePage</h1>
      {console.log(props)}
      {places.filter((place) => placeId === place._id).map((place) => (
        <div className="place-list-item">
          <div className="place-img">
            <h4><img src={place.img} alt="place-img" width="100" height="100" /></h4>
          </div>
          <div className="place-name">
            <h4><Link to={place._id} place_id={places._id}>{place.name}</Link></h4>
          </div>
          <div className="place-address">
            <h5>
              Adres:
              {place.city}
              ,
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
          <div className="place-phone">
            <p>
              Telefon:
              {place.phone}
            </p>
          </div>
          <div className="place-email">
            <p>
              Email:
              {place.email}
            </p>
          </div>
          <div className="place-webpage">
            <Link target="_blank" to={`//${place.webPage}`}>{place.webPage}</Link>
          </div>
          <div className="place-addedby">
            <p>
              Dodano przez:
              {place.addedBy}
            </p>
          </div>
          <div className="place-date">
            <p>
              Data dodania:
              {place.date}
            </p>
          </div>
          <div className="place-description">
            <p>
              Opis:
              {Parser(place.description)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

export default ListPlaces;
