/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

function UserPanel() {
  const [currentUser, setCurrentUser] = useState(JSON.parse(window.localStorage.getItem('CURRENT_USER')));
  const [newProfilePhoto, setNewProfilePhoto] = useState(currentUser.profilePhoto);
  const [newUsername, setNewUsername] = useState(currentUser.name);
  const [newEmail, setNewEmail] = useState(currentUser.email);
  const [newPassword, setNewPassword] = useState(currentUser.password);
  console.log(currentUser._id);

  function handleChange(event) {
    console.log(event.target.value);
    if (event.target.name === 'profilePhoto') {
      setNewProfilePhoto(event.target.value); 
    } else if (event.target.name === 'username') {
      setNewUsername(event.target.value); 
    } else if (event.target.name === 'email') {
      setNewEmail(event.target.value); 
    } else if (event.target.name === 'password') {
      setNewPassword(event.target.value); 
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await fetch(`http://localhost:8000/users/patch/${currentUser._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        profilePhoto: newProfilePhoto,
        name: newUsername,
        email: newEmail,
        password: newPassword,
      }),
    }).then((response) => {
      if (response.ok) {
        return response.text();
      }
      return response.text().then((text) => { throw Error(text); });
    })
      .then((responseText) => {
        localStorage.setItem('CURRENT_USER', responseText);
        window.location.reload(true);
      })
      .catch((response) => {
        alert(response);
      });
  }

  useEffect(() => {

  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="profilephoto-update">
          Link do nowego zdjęcia profilowego:
          <input id="profilephoto-update" defaultValue={currentUser.profilePhoto} type="text" name="profilePhoto" onChange={handleChange} />
        </label>
        <label htmlFor="username-update">
          Nowa nazwa użytkownika:
          <input id="username-update" defaultValue={currentUser.name} type="text" name="username" onChange={handleChange} />
        </label>
        <label htmlFor="username-email">
          Nowy email:
          <input id="username-email" defaultValue={currentUser.email} type="text" name="email" onChange={handleChange} />
        </label>
        <label htmlFor="username-password">
          Nowe hasło:
          <input id="username-password" type="password" name="password" onChange={handleChange} />
        </label>
        <input
          key="profilephoto-input"
          id="send"
          type="submit"
          value="Wyślij"
          className="submit"
          onClick={handleSubmit}
        />
      </form>
    </>
  );
}

export default UserPanel;
