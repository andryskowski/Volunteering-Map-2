import React, { useEffect } from 'react';

function PlaceForm() {
  async function getPlaceCoordinates() {
    const URL = 'https://www.mapquestapi.com/geocoding/v1/address?key=dYvAAN5PGJqo3AiKXCtuUoJpy7LUhwNs&inFormat=kvp&outFormat=json&location=Łódź+Wierzbowa+6c+91-410&thumbMaps=true&maxResults=1';
    const apiRES = await fetch(URL).then((res) => res.json());
    console.log(apiRES);
  }

  useEffect(() => {
    getPlaceCoordinates();
  });

  return (
    <h1>
      Cześć
    </h1>
  );
}

export default PlaceForm;
