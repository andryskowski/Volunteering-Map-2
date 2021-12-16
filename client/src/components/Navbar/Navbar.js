/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import '../../scss/base/_navbar.scss';
import { Link } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function logOut() {
  window.localStorage.removeItem('CURRENT_USER');
  window.location = '/';
  alert('log out');
}

function Navbar() {
  const CURRENT_USER = useContext(CurrentUserContext);
  return (
    <>
      <div className="navbar">
        <ul className="navbar-list">
          <Link to="/"><li>Start</li></Link>
          <Link to="/listplaces"><li>Lista miejsc</li></Link>
          <Link to="/addplace"><li>Dodaj miejsce</li></Link>
          <Link to="/contact"><li>Kontakt</li></Link>
          <li>O projekcie</li>
          {CURRENT_USER.userInfo.role === 'admin' || CURRENT_USER.userInfo.role === 'admin'
            ? <Link to="/userspanel"><li>Panel użytkowników</li></Link> : false}
          {CURRENT_USER.userInfo.role === 'admin' || CURRENT_USER.userInfo.role === 'admin'
            ? <Link to="/placespanel"><li>Panel miejsc</li></Link> : false}
          <Link to={`/edit/${CURRENT_USER.userInfo._id}/`}><li>Profil</li></Link>
          <Link to="/messagespanel"><li>Wiadomości (0)</li></Link>
          <li onClick={logOut}>Wyloguj się</li>
          <div className="small-profilephoto-container">
            <Link to={CURRENT_USER.userInfo._id}>
              <img width="35px" height="35px" src={CURRENT_USER.userInfo.profilePhoto} alt="profile img" />
            </Link>
          </div>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
