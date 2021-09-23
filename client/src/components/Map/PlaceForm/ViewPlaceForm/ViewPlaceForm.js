/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import Parser from 'html-react-parser';

function ViewPlaceForm(props) {
  const CURRENT_USER_USERNAME = JSON.parse(window.localStorage.getItem('CURRENT_USER'))._id;
  async function sendPlaceToDB() {
    console.log('VIEWPLACEFORM FUNKCJA');
    await fetch('http://localhost:8000/places/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        name: props.info.placeName,
        img: props.info.logo,
        description: props.info.description,
        category: props.info.category,
        position: props.info.latLng,
        phone: props.info.phone,
        email: props.info.email,
        webPage: props.info.webPage,
        city: props.info.city,
        street: props.info.street,
        postalCode: props.info.postalCode,
        houseNo: props.info.houseNo,
        district: props.info.district,
        smallMapOfPlace: props.info.smallMapOfPlace,
        statusPlace: props.info.statusPlace,
        addedBy: CURRENT_USER_USERNAME,
      }),
    })
      .then((resp) => resp.json());
  }
  return (
    <>
      <h2>Podgląd: </h2>
      <h5>
        Nazwa fundacji:
        {props.info.placeName}
      </h5>
      <h5>
        Telefon:
        {props.info.phone}
      </h5>
      <h5>
        Strona internetowa:
        {props.info.webPage}
      </h5>
      <h5>
        Email:
        {props.info.email}
      </h5>
      <h5>
        Adres:
        {props.info.city}
        , 
        {props.info.street}
        , 
        {props.info.houseNo}
        , 
        {props.info.postalCode}
      </h5>
      <h5>
        Podgląg na mapie:
        <img src={props.info.smallMapOfPlace} alt="Podano nieprawidłowy adres" />
      </h5>
      <img src={props.info.logo} alt="logo img" />
      <h5>
        Kategoria:
        {props.info.category}
      </h5>
      <div>
        {Parser(props.info.description)}
      </div>
      <button onClick={sendPlaceToDB}>Wyślij</button>
      <p>
        <b>Uwaga! </b>
        Pamiętaj, że dodane przez Ciebie miejsce nie będzie od razu widoczne na mapie. Najpierw musi zostać zaakceptowane przez moderatora.
      </p>
    </>
  );
}

export default ViewPlaceForm;
