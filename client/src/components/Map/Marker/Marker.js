/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import L from 'leaflet';
import {
  Popup,
  Marker,
} from 'react-leaflet';
import leafShadow from '../../../assets/gps.svg';

const MyIcon = L.icon({
  iconUrl: leafShadow,
  iconSize: [40, 60],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
});

class MarkerComponent extends Component {
  state = {
    data: [
    ],
  }

  async componentDidMount() {
    const RESPONSE_FROM_DB = await fetch('http://localhost:8000/places')
      .then((response) => response.json())
      .then((response) => {
        this.setState({ data: response });
      })
      .catch((error) => {
        console.error(`${error.name}: ${error.message}`);
        alert('Error retrieving data!');
      });
  }

  render() {
    const PLACE = this.state.data.map((place) => (
      <>
        <Marker position={place.position} icon={MyIcon}>
          <Popup>
            <img src={place.img} width="190px" height="190px" alt="Logo" />
            <br />
            <b>{place.name}</b>
            <br />
            {place.address}
          </Popup>
        </Marker>
      </>
    ));
    const position = [51.77, 19.46];
    return (
      PLACE
    );
  }
}

export default MarkerComponent;
