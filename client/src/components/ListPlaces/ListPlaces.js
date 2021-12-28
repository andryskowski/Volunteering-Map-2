/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../../scss/base/_list-places.scss';
import { PlacesContext } from '../../contexts/PlacesContext';
import Pagination from '../Pagination/Pagination';
import '../../scss/base/_pagination.scss';
import '../../scss/base/_filters.scss';

function ListPlaces() {
  const [filteredDistrict, setFilteredDistrict] = useState('');
  const [filteredCategory, setFilteredCategory] = useState('');
  const [filteredName, setFilteredName] = useState('');
  const PLACES = useContext(PlacesContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  function handleChange(event) {
    if (event.target.name === 'district') {
      setFilteredDistrict(event.target.value);
    }
    if (event.target.name === 'category') {
      setFilteredCategory(event.target.value);
    }
    if (event.target.name === 'search-name') {
      setFilteredName(event.target.value);
    }
  }

  function changeFiltres() {
    if (filteredCategory === '' && filteredDistrict === '' && filteredName === '') return ((place) => place);
    if (filteredCategory && filteredDistrict) return ((place) => place.district === filteredDistrict && place.category === filteredCategory);
    if (filteredDistrict) return ((place) => place.district === filteredDistrict);
    if (filteredCategory) return ((place) => place.category === filteredCategory);
    if (filteredName) return ((place) => place.name.toLowerCase().includes(filteredName.toLowerCase()));
    return ((place) => place);
  }

  const currentPlaces = PLACES.filter(changeFiltres()).map((place) => (
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
      <div className="short-description">
        <p>
          <b>Opis:</b>
          <p>{place.shortDescription}</p>
        </p>
      </div>
    </div>
  ));

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const placesWithPagination = currentPlaces.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="page-container">
      <h1 className="page-header">Lista miejsc</h1>
      <div className="filter">
        <form className="filters-form">
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
          <label>
            Wyszukaj po nazwie:
            <input type="text" name="search-name" onChange={handleChange} />
          </label>
          <label>
            <input type="submit" value="Wyślij" />
          </label>
        </form>
      </div>
      {placesWithPagination}
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={currentPlaces.length}
        paginate={paginate}
      />
    </div>
  );
}

export default ListPlaces;
