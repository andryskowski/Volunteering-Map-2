/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import L from 'leaflet';
import {
  MapContainer, TileLayer,
} from 'react-leaflet';
import MarkerComponent from './Marker/Marker';

class MapComponent extends Component {
  state = {
    lat: 51.77,
    lng: 19.46,
    zoom: 13,
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <MapContainer className="map" center={position} zoom={13} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerComponent />
      </MapContainer>
    );
  }
}

export default MapComponent;
