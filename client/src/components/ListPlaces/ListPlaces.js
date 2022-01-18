/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useContext, useEffect } from 'react';
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
  const [sortedPlaces, setSortedPlaces] = useState(PLACES);
  
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
    if (event.target.name === 'sort') {
      if (event.target.value === 'oldest') {
        const sortedPlacesByOldest = PLACES?.sort((a, b) => new Date(a.date) - new Date(b.date));
        setSortedPlaces(sortedPlacesByOldest);
        console.log(sortedPlaces);
      } else if (event.target.value === 'newest') {
        const sortedPlacesByNewest = PLACES?.sort((a, b) => new Date(b.date) - new Date(a.date));
        setSortedPlaces(sortedPlacesByNewest);
        console.log(sortedPlaces);
      } else if (event.target.value === '-') {
        setSortedPlaces(PLACES);
        console.log(sortedPlaces);
      }
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

  const currentPlaces = sortedPlaces?.filter(changeFiltres()).map((place) => (
    <div className="place-list-item" key={place._id}>
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
      <div className="place-date">
        <p>
          <b>Ostatnia aktualizacja:</b>
          {' '}
          {place.date.substring(0, 10)}
          {' '}
          {place.date.substring(11, 19)}
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
              <option value="zwierzeta">zwierzęta</option>
              <option value="inwalidzi">inwalidzi</option>
              <option value="uzaleznienia">uzależnienia</option>
              <option value="emeryci">emeryci</option>
              <option value="inne">inne</option>
            </select>
          </label>
          <label htmlFor="sort">
            Sortuj:
            <select id="sort" name="sort" onChange={handleChange}>
              <option value="-">--</option>
              <option value="newest">najnowsze</option>
              <option value="oldest">najstarsze</option>
            </select>
          </label>
          <label>
            Wyszukaj po nazwie:
            <input type="text" name="search-name" onChange={handleChange} />
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
