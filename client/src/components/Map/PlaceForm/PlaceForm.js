/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

function PlaceForm() {
  const [city, setCity] = useState('Łódź');
  const [street, setStreet] = useState('Wierzbowa');
  const [postalCode, setPostalCode] = useState('91-410');
  const [houseNo, setHouseNo] = useState('20');
  async function getPlaceCoordinates() {
    const URL = `https://www.mapquestapi.com/geocoding/v1/address?key=dYvAAN5PGJqo3AiKXCtuUoJpy7LUhwNs&inFormat=kvp&outFormat=json&location=${city}+${street}+${houseNo}+${postalCode}&thumbMaps=true&maxResults=1`;
    const apiRES = await fetch(URL).then((res) => res.json());
    console.log(apiRES);
  }

  useEffect(() => {
    getPlaceCoordinates();
  });

  function handleChange(event) {

  }

  // eslint-disable-next-line no-unused-vars
  function handleSubmit(event) {

  }

  return (
    <form onSubmit={handleSubmit} className="form">
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
        <input id="house-no" type="house-no" name="house-no" onChange={handleChange} />
      </label>
      <label htmlFor="postal-code">
        Kod pocztowy:
        <input id="postal-code" type="postal-code" name="postal-code" onChange={handleChange} />
      </label>
      <input
        id="send"
        type="submit"
        value="Wyślij"
        className="submit"
        onClick={handleSubmit}
      />
    </form>
  );
}

export default PlaceForm;
