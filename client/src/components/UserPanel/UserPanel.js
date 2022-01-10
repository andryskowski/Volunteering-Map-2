/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import Parser from 'html-react-parser';
import UpdateUser from './UpdateUser';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { setRoleStyle } from '../../actions/CommonFunctions';
import '../../scss/base/_user-panel.scss';

function UserPanel() {
  const CURRENT_USER = useContext(CurrentUserContext);

  return (
    <>
      <div className="page-container">
        <h2>Panel użytkownika</h2>
        <div className="user-info">
          <div>
            <img src={CURRENT_USER.userInfo.profilePhoto} className="user-profilephoto" width="150" height="150" alt="Error no profile phot" />
          </div>
          <p>
            <b>Rola: </b>
            <span style={setRoleStyle(CURRENT_USER.userInfo.role)}>{CURRENT_USER.userInfo.role}</span>
          </p>
          <p>
            <b>Nazwa użytkownika: </b>
            {CURRENT_USER.userInfo.name}
          </p>
          <p>
            <b>Dołączył dnia </b>
            {CURRENT_USER.userInfo.date.substring(0, 10)}
            <b>, o gdzinie </b>
            {CURRENT_USER.userInfo.date.substring(11, 16)}
          </p>
          <p>
            <b>Email użytkownika: </b>
            {CURRENT_USER.userInfo.email}
          </p>
          <p>
            <b>Opis użytkownika: </b>
            {CURRENT_USER.userInfo.description ? Parser(CURRENT_USER.userInfo.description) : 'brak opisu'}
          </p>
        </div>
        <UpdateUser />
      </div>
    </>
  );
}

export default UserPanel;
