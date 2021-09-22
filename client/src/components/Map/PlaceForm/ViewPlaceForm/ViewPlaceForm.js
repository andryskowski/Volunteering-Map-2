/* eslint-disable no-trailing-spaces */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import Parser from 'html-react-parser';

function ViewPlaceForm(props) {
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
      <img src={props.info.logo} alt="logo img" />
      <h5>
        Kategoria:
        {props.info.category}
      </h5>
      <div>
        {Parser(props.info.description)}
      </div>
    </>
  );
}

export default ViewPlaceForm;
