import React, { useState } from 'react';

function UpdatePassword() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(window.localStorage.getItem('CURRENT_USER')),
  );
  const [newPassword, setNewPassword] = useState(currentUser.password);

  function handleChange(event) {
    setNewPassword(event.target.value);
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
        password: newPassword,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        return response.text().then((text) => {
          throw Error(text);
        });
      })
      .then((responseText) => {
        localStorage.setItem('CURRENT_USER', responseText);
        window.location.reload(true);
      })
      .catch((response) => {
        alert(response);
      });
  }

  return (
    <>
      <h3>Zmień hasło</h3>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="username-password">
          <b>Nowe hasło:</b>
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

export default UpdatePassword;
