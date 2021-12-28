/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../../scss/base/_list-places.scss';
import Parser from 'html-react-parser';
import { PlacesContext } from '../../contexts/PlacesContext';
import Comments from '../Comments/Comments';

function PlacePage(props) {
  const { placeId } = props;
  const PLACES = useContext(PlacesContext);

  return (
    <>
      <div className="page-container">
        <h1>Strona miejsca pomocy</h1>
        {PLACES
          .filter((place) => placeId === place._id)
          .map((place) => (
            <div className="placepage-places">
              <div>
                <h4>
                  <img
                    className="place-img"
                    src={place.img}
                    alt="place-img"
                    width="300"
                    height="300"
                  />
                </h4>
              </div>
              <div className="place-name">
                <h4>
                  <Link to={place._id} place_id={place._id}>
                    {place.name}
                  </Link>
                </h4>
              </div>
              <div className="place-address">
                <h5>
                  Adres:
                  {place.city}
                  ,
                  {place.street}
                  ,
                  {place.houseNo}
                  ,
                  {place.postalCode}
                </h5>
              </div>
              <div className="place-category">
                <p>
                  <b>Kategoria:</b>
                  {place.category}
                </p>
              </div>
              <div className="place-district">
                <p>
                  <b>Dzielnica:</b>
                  {place.district}
                </p>
              </div>
              <div className="place-phone">
                <p>
                  <b>Telefon:</b>
                  {place.phone}
                </p>
              </div>
              <div className="place-email">
                <p>
                  <b>Email:</b>
                  {place.email}
                </p>
              </div>
              <div className="place-webpage">
                <p>
                  <b>Strona internetowa:</b>
                  <Link target="_blank" to={`//${place.webPage}`}>
                    {place.webPage}
                  </Link>
                </p>
              </div>
              <div className="place-addedby">
                <p>
                  <b>Dodano przez:</b>
                  {place.addedBy}
                </p>
              </div>
              <div className="place-date">
                <p>
                  <b>Data dodania:</b>
                  {place.date}
                </p>
              </div>
              <div className="place-description">
                <p>
                  <b>Opis:</b>
                  {Parser(place.description)}
                </p>
              </div>
            </div>
          ))}
        <Comments placeId={placeId} />
      </div>
    </>
  );
}

export default PlacePage;
