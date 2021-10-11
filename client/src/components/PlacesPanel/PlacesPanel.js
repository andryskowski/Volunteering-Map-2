/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, {
  Children,
  useContext, useEffect, useState,  
} from 'react';
import { Link } from 'react-router-dom';
import { getPlaces, updatePlaceStatus } from '../../actions/FetchData';
import '../../scss/base/_users-list.scss';
import { PlacesContext } from '../../contexts/PlacesContext';
  
function PlacesPanel() {
  const places = useContext(PlacesContext);

  const handleChangeStatus = (event) => {
    const changedStatus = event.target.value;
    const changedPlaceId = event.target.id;
    console.log(event.target.id, changedStatus);
    updatePlaceStatus(changedPlaceId, changedStatus);
  };

  return (
    <>
      <div className="page-container">
        <h1>Users list</h1>
        {places.map((place) => (
          <div className="place-list-item">
            <div>
              <Link to={place._id}><img className="place-img" src={place.img} alt="place-img" width="100" height="100" /></Link>
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
            <div className="place-status">
              <p>
                <b>
                  Status:
                  {place.statusPlace}
                </b>
              </p>
            </div>
            <p>Zmień status: </p>
            <select onChange={handleChangeStatus} id={place._id}>
              <option selected value=""> </option>
              <option value="pending">pending</option>
              <option value="added">added</option>
            </select>
          </div>
        ))}
      </div>
    </>
  );
}
  
export default PlacesPanel;
