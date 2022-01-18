import React, {
  useContext, useEffect, useRef,
} from 'react';
import '../../scss/base/_common.scss';
import '../../scss/base/_navbar.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function logOut() {
  window.localStorage.removeItem('CURRENT_USER');
  window.location = '/';
  alert('log out');
}

function Navbar() {
  const CURRENT_USER = useContext(CurrentUserContext);
  const xButton = useRef(null);
  const navbarList = useRef(null);
  const { t } = useTranslation();

  const toggleNavbarList = () => {
    navbarList.current.classList.toggle('display-flex');
    xButton.current.classList.toggle('background-x-navbar');
  };

  return (
    <>
      <div className="navbar">
        <div className="button-x-navbar-conainer">
          <svg className="button-x-navbar" alt="button-navbar error" src="../../assets/burger_icon.svg" ref={xButton} onClick={toggleNavbarList} />
        </div>
        <ul ref={navbarList} className="navbar-list">
          <Link to="/"><li>Start</li></Link>
          <Link to="/listplaces"><li>Lista miejsc</li></Link>
          <Link to="/addplace"><li>Dodaj miejsce</li></Link>
          <Link to="/contact"><li>Kontakt</li></Link>
          <li>{t('Navbar.1')}</li>
          {CURRENT_USER.userInfo.role === 'admin' || CURRENT_USER.userInfo.role === 'admin'
            ? <Link to="/userspanel"><li>Panel użytkowników</li></Link> : false}
          {CURRENT_USER.userInfo.role === 'admin' || CURRENT_USER.userInfo.role === 'admin'
            ? <Link to="/placespanel"><li>Panel miejsc</li></Link> : false}
          {CURRENT_USER.userInfo.role === 'admin' || CURRENT_USER.userInfo.role === 'admin'
            ? <Link to="/commentspanel"><li>Panel komentarzy</li></Link> : false}
          <Link to="/messagespanel"><li>Wiadomości</li></Link>
          <Link to={`/edit/${CURRENT_USER.userInfo._id}/`}><li>Profil</li></Link>
          <li onClick={logOut}>Wyloguj się</li>
          <div className="small-profilephoto-container">
            <div>
              <img width="35px" height="35px" src={CURRENT_USER.userInfo.profilePhoto} alt="profile img" />
            </div>
          </div>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
