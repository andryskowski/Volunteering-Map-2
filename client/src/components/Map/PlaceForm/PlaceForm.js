/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './sass/place-form.scss';
import ViewPlaceForm from './ViewPlaceForm/ViewPlaceForm';

function PlaceForm() {
  const [placeName, setPlaceame] = useState('name');
  const [phone, setPhone] = useState('phone');
  const [email, setEmail] = useState('email');
  const [webPage, setWebPage] = useState('webpage');
  const [city, setCity] = useState('city');
  const [street, setStreet] = useState('street');
  const [postalCode, setPostalCode] = useState('91-410');
  const [houseNo, setHouseNo] = useState('20');
  const [description, setDescription] = useState('Lorem ipsum');
  const [category, setCategory] = useState('inne');
  const [logo, setLogo] = useState(0);
  const [district, setDistrict] = useState('district');
  const infoAboutCurretPlace = {
    placeName, phone, email, webPage, city, street, postalCode, houseNo, description, category, logo,
  };
  async function getPlaceCoordinates() {
    const URL = `https://www.mapquestapi.com/geocoding/v1/address?key=dYvAAN5PGJqo3AiKXCtuUoJpy7LUhwNs&inFormat=kvp&outFormat=json&location=${city}+${street}+${houseNo}+${postalCode}&thumbMaps=true&maxResults=1`;
    const apiRES = await fetch(URL).then((res) => res.json());
    console.log(apiRES);
  }

  useEffect(() => {

  });

  function handleChange(event) {
    const { name } = event.target;
    if (name === 'city') setCity(event.target.value);
    else if (name === 'street') setStreet(event.target.value);
    else if (name === 'houseNo') setHouseNo(event.target.value);
    else if (name === 'postalCode') setPostalCode(event.target.value);
    else if (name === 'placeName') setPlaceame(event.target.value);
    else if (name === 'webPage') setWebPage(event.target.value);
    else if (name === 'email') setEmail(event.target.value);
    else if (name === 'phone') setPhone(event.target.value);
    else if (name === 'logo') setLogo(event.target.value);
    else if (name === 'category') setCategory(event.target.value);
    else if (name === 'district') setDistrict(event.target.value);
  }

  // eslint-disable-next-line no-unused-vars
  function handleSubmit(event) {
    event.preventDefault();
    getPlaceCoordinates();
  }

  const modules = {
    toolbar: [
      'link', 'image', 'video', 'bold', 'italic',
    ],
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="place-name">
          Nazwa fundacji (lub miejsca pomocy):
          <input id="place-name" type="place-name" name="placeName" onChange={handleChange} />
        </label>
        <label htmlFor="web-page">
          Strona internetowa:
          <input id="web-page" type="web-page" name="webPage" onChange={handleChange} />
        </label>
        <label htmlFor="email">
          E-mail:
          <input id="email" type="email" name="email" onChange={handleChange} />
        </label>
        <label htmlFor="phone">
          Telefon:
          <input id="phone" type="phone" name="phone" onChange={handleChange} />
        </label>
        <label htmlFor="city">
          Miasto:
          <input id="city" type="city" name="city" onChange={handleChange} />
        </label>
        <label htmlFor="street">
          Ulica:
          <input id="street" type="street" name="street" onChange={handleChange} />
        </label>
        <label htmlFor="house-no">
          Numer domu:
          <input id="house-no" type="house-no" name="houseNo" onChange={handleChange} />
        </label>
        <label htmlFor="postal-code">
          Kod pocztowy:
          <input id="postal-code" type="postal-code" name="postalCode" onChange={handleChange} />
        </label>
        <label htmlFor="district">
          Dzielnica:
          <select id="district" onChange={handleChange}>
            <option value="baluty">Bałuty</option>
            <option value="srodmiescie">Śródmieście</option>
            <option value="widzew">Widzew</option>
            <option value="polesie">Polesie</option>
            <option value="gorna">Górna</option>
            <option value="inna">inna</option>
          </select>
        </label>
        <label htmlFor="logo">
          Link do zdjecia logo fundacji/miejsca pomocy:
          <input id="logo" type="logo" name="logo" onChange={handleChange} />
        </label>
        <label htmlFor="category">
          Kategoria:
          <select id="category" onChange={handleChange}>
            <option value="children">dzieci</option>
            <option value="animals">zwierzeta</option>
            <option value="invalids">invalids</option>
            <option selected value="addictions">uzaleznienia</option>
            <option value="emeryci">emeryci</option>
            <option value="inne">inne</option>
          </select>
        </label>
        <label htmlFor="description">
          Opis:
          <ReactQuill className="description-box" id="description" theme="snow" value={description} onChange={setDescription} modules={modules} />
        </label>
        <input
          id="send"
          type="submit"
          value="Wyślij"
          className="submit"
          onClick={handleSubmit}
        />
      </form>
      <ViewPlaceForm info={infoAboutCurretPlace} />
    </>
  );
}

export default PlaceForm;
