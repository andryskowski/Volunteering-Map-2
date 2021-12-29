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
            <div className="header-container"><h1>Volunteering Map</h1></div>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            <div className="img-container">
              <img className="img-kids" src={kids} alt="kids" />
            </div>
          </div>

          <div ref={refContextContainer2} className="landing-page-container-context-2">
            <LoginForm />
            <hr className="hr-1" />
            <RegisterForm />
          </div>

          <div className="goback-container">
            <a onClick={() => { changeView(); }}>{heading}</a>
          </div>
        </div>
        
      </div>

    </>
  );
}

export default ViewPlaceForm;
