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
      {
        name: 'Fundacja Dom w Lodzi',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnNvCkdmcJ3OCsR2I_BSrAkv1oqJ8tZQ3WXQ&usqp=CAU',
        address: 'Wierzbowa 13, 91-426 Łódź',
        description: '',
        category: 'children',
        position: [51.77, 19.46],
      },
      {
        name: 'Fundacja Gajusz',
        img: 'https://gajusz.org.pl/timthumb.php?src=admin/wgrane_pliki/big_file-logogajuszflamingfullcolorrgb-434.jpg&h=640&w=800&zc=1&f=0',
        address: 'Gen. Jarosława Dąbrowskiego 87, 93-271 Łódź',
        description: '',
        category: 'children',
        position: [51.78, 19.47],
      },
      {
        name: 'Fundacja Gajusz',
        img: 'https://gajusz.org.pl/timthumb.php?src=admin/wgrane_pliki/big_file-logogajuszflamingfullcolorrgb-434.jpg&h=640&w=800&zc=1&f=0',
        address: 'Gen. Jarosława Dąbrowskiego 87, 93-271 Łódź',
        description: '',
        category: 'children',
        position: [51.785, 19.475],
      },
      {
        name: 'Fundacja Gajusz',
        img: 'https://gajusz.org.pl/timthumb.php?src=admin/wgrane_pliki/big_file-logogajuszflamingfullcolorrgb-434.jpg&h=640&w=800&zc=1&f=0',
        address: 'Gen. Jarosława Dąbrowskiego 87, 93-271 Łódź',
        description: '',
        category: 'children',
        position: [51.79, 19.47],
      },
    ],
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
