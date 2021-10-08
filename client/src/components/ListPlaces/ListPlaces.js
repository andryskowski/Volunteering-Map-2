/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../../scss/base/list-places.scss';
import { PlacesContext } from '../../contexts/PlacesContext';

function ListPlaces() {
  const [filteredDistrict, setFilteredDistrict] = useState('');
  const [filteredCategory, setFilteredCategory] = useState('');
  const PLACES = useContext(PlacesContext);

  function handleChange(event) {
    if (event.target.name === 'district') {
      setFilteredDistrict(event.target.value);
    }
    if (event.target.name === 'category') {
      setFilteredCategory(event.target.value);
    }
  }

  function changeFiltres() {
    if (filteredCategory === '' && filteredDistrict === '') return ((place) => place);
    if (filteredCategory && filteredDistrict) return ((place) => place.district === filteredDistrict && place.category === filteredCategory);
    if (filteredDistrict) return ((place) => place.district === filteredDistrict);
    if (filteredCategory) return ((place) => place.category === filteredCategory);
    return ((place) => place);
  }

  return (
    <div className="page-container">
      <h1 className="page-header">Lista miejsc</h1>
      <div className="filter">
        <form>
          <label htmlFor="district">
            Dzielnica:
            <select id="district" name="district" onChange={handleChange}>
              <option value="">Wszystkie</option>
              <option value="Bałuty">Bałuty</option>
              <option value="Śródmieście">Śródmieście</option>
              <option value="Widzew">Widzew</option>
              <option value="Polesie">Polesie</option>
              <option value="Górna">Górna</option>
              <option value="inna">inna</option>
            </select>
          </label>
          <label htmlFor="category">
            Kategoria:
            <select id="category" name="category" onChange={handleChange}>
              <option value="">Wszystkie</option>
              <option value="dzieci">dzieci</option>
              <option value="zwierzęta">zwierzęta</option>
              <option value="inwalidzi">inwalidzi</option>
              <option value="uzależnienia">uzależnienia</option>
              <option value="emeryci">emeryci</option>
              <option value="inne">inne</option>
            </select>
          </label>
        </form>
      </div>
      {PLACES.filter(changeFiltres()).map((place) => (
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
        </div>
      ))}
    </div>
  );
}

export default ListPlaces;