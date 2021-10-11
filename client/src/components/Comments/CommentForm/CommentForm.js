/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext } from 'react';
import '../../../scss/base/_comment-form.scss';
import PropTypes from 'prop-types';
import { postComment } from '../../../actions/FetchData';
import CurrentUserContext from '../../../contexts/CurrentUserContext';

function CommentForm({ placeId }) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const currentUser = useContext(CurrentUserContext);

  function handleChange(event) {
    if (event.target.name === 'subject') setSubject(event.target.value);
    if (event.target.name === 'message') setMessage(event.target.value);
  }

  function handleSubmit() {
    const authorId = currentUser.userInfo._id;
    const fetchMyData = async () => {
      const response = await postComment(authorId, subject, message, placeId);
      console.log(response);
      // setUsers(response);
    };
    fetchMyData();
  }

  return (
    <>
      <div className="comment-form">
        <h1>Dodaj swój komentarz:</h1>
        <label htmlFor="subject">
          Temat:
          <input id="subject" type="text" name="subject" onChange={handleChange} />
        </label>
        <label htmlFor="message">
          Treść komentarza:
          <textarea className="message" id="message" type="text" name="message" onChange={handleChange} />
        </label>
        <input type="submit" value="Wyślij" onClick={handleSubmit} />
      </div>
    </>
  );
}

CommentForm.propTypes = {
  placeId: PropTypes.string.isRequired,
};

export default CommentForm;
