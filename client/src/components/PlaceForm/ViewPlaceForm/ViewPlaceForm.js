import React, { useContext, useRef, useEffect } from 'react';
import Parser from 'html-react-parser';
import { postPlaces } from '../../../actions/FetchData';
import CurrentUserContext from '../../../contexts/CurrentUserContext';
import '../../../scss/base/_view-place-form.scss';

function ViewPlaceForm(props) {
  const popup = useRef(null); 
  const popupBackground = useRef(null); 
  const CURRENT_USER = useContext(CurrentUserContext);

  async function sendPlaceToDB(event) {
    event.preventDefault();
    const NEW_PLACE = props.info;
    postPlaces(NEW_PLACE, CURRENT_USER.userInfo._id);
  }

  useEffect(() => {
    if (props.showPopUp === true) {
      popup.current.style.display = 'block';
      popupBackground.current.style.display = 'block';
    }
  });

  const onButtonClick = () => {
    popup.current.style.display = 'none';
    popupBackground.current.style.display = 'none';
    props.setShowPopUp('false');
  };
  
  return (
    <>
      <div className="popup-background" ref={popupBackground} />
      <div className="popup" ref={popup}>
        <div className="button-container"><button onClick={onButtonClick}>X</button></div>
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
        <img src={props.info.logo} alt="Błędny link do zdjęcia logo miesca pomocy." />
        <h5>
          Kategoria:
          {props.info.category}
        </h5>
        <div>
          Opis:
          {Parser(props.info.description)}
        </div>
        <input type="submit" onClick={sendPlaceToDB} value="Wyślij" />
        <p>
          <b>Uwaga! </b>
          Pamiętaj, że dodane przez Ciebie miejsce nie będzie od razu widoczne na mapie. Najpierw musi zostać zaakceptowane przez moderatora. W przypadku błędnego wyświetlania miejsca pomocy na mapie, bez obaw, każda lokalizacja zostaje potwierdzona przez moderatora.
        </p>
      </div>
    </>
  );
}

export default ViewPlaceForm;
