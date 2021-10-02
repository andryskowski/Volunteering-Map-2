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
  const [filteredDistrict, setFilteredDistrict] = useState('');

  function handleChange(event) {
    if (event.target.name === 'district') {
      setFilteredDistrict(event.target.value);
    }
  }

  function changeFiltres() {
    if (filteredDistrict !== '' && filteredDistrict !== 'Wszystkie') {
      return ((place) => place.district === filteredDistrict);
    }
    if (filteredDistrict === 'Wszystkie') {
      return ((place) => place);
    }
    return ((place) => place);
  }

  return (
    <>
      <div className="filter">
        <form>
          <label htmlFor="district">
            Dzielnica:
            <select id="district" name="district" onChange={handleChange}>
              <option value="Wszystkie">Wszystkie</option>
              <option value="Bałuty">Bałuty</option>
              <option value="Śródmieście">Śródmieście</option>
              <option value="Widzew">Widzew</option>
              <option value="Polesie">Polesie</option>
              <option value="Górna">Górna</option>
              <option value="inna">inna</option>
            </select>
          </label>
        </form>
      </div>
      <h1>Lista fundacji:</h1>
      {places.filter(changeFiltres()).map((place) => (
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
