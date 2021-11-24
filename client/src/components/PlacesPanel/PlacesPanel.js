/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, {
  Children,
  useContext, useRef, useState,
} from 'react';
import { Link } from 'react-router-dom';
import { removePlace, updatePlaceStatus } from '../../actions/FetchData';
import '../../scss/base/_users-list.scss';
import { PlacesContext } from '../../contexts/PlacesContext';
import EditPlaceForm from './EditPlaceForm/EditPlaceForm';
import '../../scss/base/_places-panel.scss';

function PlacesPanel() {
  const places = useContext(PlacesContext);
  const popupEl = useRef(null);
  const [placeToEdit, setPlaceToEdit] = useState(0);

  const handleChangeStatus = (event) => {
    const changedStatus = event.target.value;
    const changedPlaceId = event.target.id;
    updatePlaceStatus(changedPlaceId, changedStatus);
  };

  const removeSelectedPlace = (event) => {
    const removedPlaceId = event.target.value;
    const fetchMyData = async () => {
      await removePlace(removedPlaceId);
    };
    fetchMyData();
    window.location.reload(true);
  };

  const editPlace = (e, placeId) => {
    setPlaceToEdit(places.filter((place) => place._id === placeId));
    popupEl.current.style.display = 'block';
    console.log(placeId, placeToEdit);
  };

  return (
    <>
      <div className="page-container">
        <h1>Places list</h1>
        {places.map((place) => (
          <div className="place-list-item" key={place._id}>
            <button className="remove-user-button" value={place._id} type="submit" onClick={removeSelectedPlace}>X</button>
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
            <input className="edit-place-button" value="Edytuj" onClick={() => editPlace(this, place._id)} type="submit" />
          </div>
        ))}
        <div className="popup" ref={popupEl}>
          <div className="button-popup-container">
            <button type="submit" className="button-popup" onClick={() => { popupEl.current.style.display = 'none'; }}>X</button>
          </div>
          <EditPlaceForm placeToEdit={placeToEdit} />
        </div>
      </div>
    </>
  );
}
  
export default PlacesPanel;
