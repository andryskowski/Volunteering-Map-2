/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import '../../scss/base/_navbar.scss';
import { Link } from 'react-router-dom';
// import UserPanel from '../UserPanel/UserPanel';

const CURRENT_USER_ID = window.localStorage.getItem('CURRENT_USER')
  ? JSON.parse(window.localStorage.getItem('CURRENT_USER'))._id
  : false;

function Navbar() {
  return (
    <>
      <div className="navbar">
        <ul className="navbar-list">
          <Link to="/"><li>Start</li></Link>
          <li>O stronie</li>
          <li>Kontakt</li>
          <Link to={CURRENT_USER_ID}><li>Profil</li></Link>
          <li>Wyloguj się</li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
