/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/no-unused-state */
import React, { useContext } from 'react';
import L from 'leaflet';
import { Popup, Marker } from 'react-leaflet';
import { Link } from 'react-router-dom';
import leafShadow from '../../../assets/gps.svg';
import { PlacesContext } from '../../../contexts/PlacesContext';

const MyIcon = L.icon({
  iconUrl: leafShadow,
  iconSize: [40, 60],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
});

function MarkerComponent(props) {
  const PLACES = useContext(PlacesContext);

  return (
    <>
      {PLACES.map((place) => (
        <Marker position={place.position} icon={MyIcon}>
          <Popup>
            <img src={place.img} width="190px" height="190px" alt="Logo" />
            <br />
            <Link to={place._id}><b>{place.name}</b></Link>
            <br />
            <p>
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
            </p>
          </Popup>
        </Marker>
      ))}
      ;
    </>
  );
}

export default MarkerComponent;
