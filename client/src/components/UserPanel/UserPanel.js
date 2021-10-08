/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import UpdateUser from './UpdateUser';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function UserPanel() {
  const CURRENT_USER = useContext(CurrentUserContext);

  const setRoleStyle = (role) => {
    if (role === 'moderator') return { color: 'blue' };
    if (role === 'admin') return { color: 'red' };
    if (role === 'user') return { color: 'green' };
    return { color: 'black' };
  };

  return (
    <>
      <div className="page-container">
        <h2>Panel użytkownika</h2>
        <div>
          <img src={CURRENT_USER.userInfo.profilePhoto} width="150" height="150" alt="Error no profile phot" />
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
        <UpdateUser />
      </div>
    </>
  );
}

export default UserPanel;
