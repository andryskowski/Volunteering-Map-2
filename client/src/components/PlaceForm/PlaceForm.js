import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../scss/base/_common.scss';
import '../../scss/base/_place-form.scss';
import ViewPlaceForm from './ViewPlaceForm/ViewPlaceForm';

function PlaceForm() {
  const [placeName, setPlaceame] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [webPage, setWebPage] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('inna');
  const [logo, setLogo] = useState('');
  const [district, setDistrict] = useState('inna');
  const [latLng, setLatLng] = useState({ lat: 0, lng: 0 });
  const [smallMapOfPlace, setSmallMapOfPlace] = useState('Nie znaleziono lub wprowadzono nieprawidłowy adres');
  const [statusPlace, setStatusPlace] = useState('draft');
  const infoAboutCurretPlace = {
    placeName, phone, email, webPage, city, street, postalCode, houseNo, description, shortDescription, category, logo, district, latLng, smallMapOfPlace, statusPlace,
  };
  const [showPopUp, setShowPopUp] = useState(false);

  async function getPlaceCoordinates() {
    const URL = `https://www.mapquestapi.com/geocoding/v1/address?key=dYvAAN5PGJqo3AiKXCtuUoJpy7LUhwNs&inFormat=kvp&outFormat=json&location=${city}+${street}+${houseNo}+${postalCode}&thumbMaps=true&maxResults=1`;
    const apiRES = await fetch(URL).then((res) => res.json());
    setSmallMapOfPlace(apiRES.results[0].locations[0].mapUrl);
    setLatLng(apiRES.results[0].locations[0].latLng);
  }

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
    else if (name === 'shortDescription') setShortDescription(event.target.value);
  }

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video', 'color',
  ];

  const modules = {
    toolbar: [
      'bold', 'italic', 'underline', 'strike', 'blockquote', 'link', 'image', 'video', 'background', 'header', [{
        color: ['#FF0000', '#001F3F', '#0074D9', '#7FDBFF',
          '#39CCCC', '#3D9970', '#2ECC40', '#01FF70',
          '#FFDC00', '#FF851B', '#FF4136', '#85144B',
          '#F012BE', '#B10DC9', '#111111', '#AAAAAA',
        ],
      }],
    ],
  };

  const validation = () => {
    if (placeName === '') { alert('Pole z nazwa miejca nie moze byc puste'); }
    else if (webPage === '') { alert('Pole strony internetowej nie moze byc puste'); }
    else if (email === '') { alert('Pole email nie moze byc puste'); }
    else if (phone === '') { alert('Pole telefon nie moze byc puste'); }
    else if (city === '') { alert('Pole miasto nie moze byc puste'); }
    else if (street === '') { alert('Pole ulica nie moze byc puste'); }
    else if (postalCode === '') { alert('Pole kod pocztowy nie moze byc puste'); }
    else if (houseNo === '') { alert('Pole numer domu nie moze byc puste'); }
    else if (district === '') { alert('Pole dzielnica nie moze byc puste'); }
    else if (logo === '') { alert('Pole zdjecia logo nie moze byc puste'); }
    else if (category === '') { alert('Pole kategorii nie moze byc puste'); }
    else if (shortDescription === '') { alert('Pole krotkiego opisu nie moze byc puste'); }
    else return true;
    return false;
  };

  // eslint-disable-next-line no-unused-vars
  function handleSubmit(event) {
    event.preventDefault();
    const isValidated = validation();
    if (isValidated === true) {
      getPlaceCoordinates();
      setStatusPlace('pending');
      setShowPopUp(true);
    }
  }

  return (
    <div className="page-container placeform-page">
      <h1 className="page-header">Dodaj miejsce</h1>
      <form className="form">
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
          <select id="district" name="district" onChange={handleChange}>
            <option value="Bałuty">Bałuty</option>
            <option value="Śródmieście">Śródmieście</option>
            <option value="Widzew">Widzew</option>
            <option value="Polesie">Polesie</option>
            <option value="Górna">Górna</option>
            <option selected value="inna">inna</option>
          </select>
        </label>
        <label htmlFor="logo">
          Link do zdjecia logo fundacji/miejsca pomocy:
          <input id="logo" type="logo" name="logo" onChange={handleChange} />
        </label>
        <label htmlFor="category">
          Kategoria:
          <select id="category" name="category" onChange={handleChange}>
            <option value="dzieci">dzieci</option>
            <option value="zwierzeta">zwierzeta</option>
            <option value="inwalidzi">inwalidzi</option>
            <option value="uzaleznienia">uzaleznienia</option>
            <option value="emeryci">emeryci</option>
            <option selected value="inne">inne</option>
          </select>
        </label>
        <label htmlFor="shortDescription">
          Krótki opis fundacji/miejsca pomocy:
          <input id="shortDescription" type="text" name="shortDescription" onChange={handleChange} />
        </label>
        <label htmlFor="description">
          Opis:
          <ReactQuill className="description-box" id="description" theme="snow" value={description} onChange={setDescription} modules={modules} formats={formats} />
        </label>
        <input
          id="send"
          type="submit"
          value="Wyślij"
          className="submit submit-addplace"
          onClick={(event) => { handleSubmit(event); }}
        />
      </form>
      <ViewPlaceForm info={infoAboutCurretPlace} showPopUp={showPopUp} setShowPopUp={setShowPopUp} />
    </div>
  );
}

export default PlaceForm;
