/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import ReactQuill from 'react-quill';
import { updateUser } from '../../actions/FetchData';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function UserPanel() {
  const CURRENT_USER = useContext(CurrentUserContext);
  const [newProfilePhoto, setNewProfilePhoto] = useState(CURRENT_USER.userInfo.profilePhoto);
  const [newUsername, setNewUsername] = useState(CURRENT_USER.userInfo.name);
  const [newEmail, setNewEmail] = useState(CURRENT_USER.userInfo.email);
  const [description, setDescription] = useState('');
  
  function handleChange(event) {
    if (event.target.name === 'profilePhoto') {
      setNewProfilePhoto(event.target.value);
    } else if (event.target.name === 'username') {
      setNewUsername(event.target.value);
    } else if (event.target.name === 'email') {
      setNewEmail(event.target.value);
    }
    console.log(newProfilePhoto, newUsername, newEmail);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    updateUser(newProfilePhoto, newUsername, newEmail, CURRENT_USER.userInfo._id, description);
  }

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video', 'color',
  ];

  const modules = {
    toolbar: [
      'bold', 'italic', 'underline', 'strike', 'blockquote', 'link', 'image', 'video', 'header', [{
        color: ['#FF0000', '#001F3F', '#0074D9', '#7FDBFF',
          '#39CCCC', '#3D9970', '#2ECC40', '#01FF70',
          '#FFDC00', '#FF851B', '#FF4136', '#85144B',
          '#F012BE', '#B10DC9', '#111111', '#AAAAAA',
        ],
      }],
    ],
  };

  return (
    <>
      <h3>Edytuj profil</h3>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="profilephoto-update">
          <b>Link do nowego zdjęcia profilowego:</b>
          <input
            id="profilephoto-update"
            defaultValue={CURRENT_USER.userInfo.profilePhoto}
            type="text"
            name="profilePhoto"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="username-update">
          <b>Nowa nazwa użytkownika:</b>
          <input
            id="username-update"
            defaultValue={CURRENT_USER.userInfo.name}
            type="text"
            name="username"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="username-email">
          <b>Nowy email:</b>
          <input
            id="username-email"
            defaultValue={CURRENT_USER.userInfo.email}
            type="text"
            name="email"
            onChange={handleChange}
          />
        </label>
        <div htmlFor="description">
          Opis:
          <ReactQuill className="description-box" id="description" theme="snow" value={description} onChange={setDescription} modules={modules} formats={formats} />
        </div>
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
