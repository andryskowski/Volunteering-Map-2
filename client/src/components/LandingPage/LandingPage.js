/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import '../../scss/base/_landing-page.scss';
import kids from '../../assets/kids.jpg';
import vmlogo from '../../assets/vm-logo.png';
import lodzlogo from '../../assets/lodz.svg';

function ViewPlaceForm(props) {
  const refContextContainer1 = useRef(false);
  const refContextContainer2 = useRef(false);
  const [heading, setHeading] = useState('Zaloguj/Zarejestruj się');

  const changeView = () => {
    refContextContainer1.current.classList.toggle('display-none');
    refContextContainer2.current.classList.toggle('display-flex');
    if (refContextContainer1.current.classList.contains('display-none')) {
      setHeading('Powrót');
    }
    if (!refContextContainer2.current.classList.contains('display-flex')) {
      setHeading('Zaloguj/Zarejestruj się');
    }
  };

  return (
    <>
      <div className="landing-page">
        <div className="landing-page-container">
          <div ref={refContextContainer1} className="landing-page-container-context-1">
            <div className="header-container">
              <h1>Volunteering Map</h1>
            </div>
            <p>
              Szukasz miejsca, w którym mógłbyś spędzić wspaniałe chwile, poznać nowych ludzi, a
              przy okazji nieść pomoc innym? Dobrze trafiłeś! &apos;Volunteering Map&apos; ułatwi Ci
              znalezienie tego czego szukasz. Ta całkowicie darmowa aplikacja pozwala na znalezienie
              fundacji, schroniska, domu seniora czy jakiegokolwiek innego miejsca, w którym
              poszukiwani są wolontariusze. Sprawdź jakie placówki znajdują się w Twojej
              okolicy. Być może założenie konta na naszym portalu zmieni Twoje życie... Kto wie,
              może spotkasz tu przyjaciół na lata, którzy będą Twoją pomocną dłonią w trudniejszych
              chwilach?
            </p>
            <div className="see-for-yourself-header-container">
              <h4 className="see-for-yourself-header">Przekonaj się sam!</h4>
            </div>
            <div className="images-container">
              <div className="lodz-logo-container">
                <img className="lodz-logo img-landingpage" src={lodzlogo} alt="lodz-logo" />
              </div>
              <div className="img-kids-container">
                <img className="img-kids img-landingpage" src={kids} alt="kids" />
              </div>
              <div className="vm-logo-container">
                <img className="vm-logo img-landingpage" src={vmlogo} alt="vm-logo" />
              </div>
            </div>
          </div>

          <div ref={refContextContainer2} className="landing-page-container-context-2">
            <LoginForm />
            <hr className="hr-1" />
            <RegisterForm />
          </div>

          <div className="goback-container">
            <a
              onClick={() => {
                changeView();
              }}
            >
              {heading}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewPlaceForm;
