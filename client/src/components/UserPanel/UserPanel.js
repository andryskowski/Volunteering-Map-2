/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

function UserPanel() {
  const [currentUser, setCurrentUser] = useState(JSON.parse(window.localStorage.getItem('CURRENT_USER')));
  return (
    <>
      <h2>Panel użytkownika</h2>
      <p>
        <b>Nazwa użytkownika: </b>
        {currentUser.name}
      </p>
      <p>
        <b>Dołączył dnia </b>
        {currentUser.date.substring(0, 10)}
        <b>, o gdzinie </b>
        {currentUser.date.substring(11, 16)}
      </p>
      <p>
        <b>Email użytkownika: </b>
        {currentUser.email}
      </p>
    </>
  );
}

export default UserPanel;
