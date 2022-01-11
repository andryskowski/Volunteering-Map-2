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

  const validation = () => {
    if (subject === '') { alert('Pole tematu nie moze byc puste.'); }
    else if (message === '') { alert('Pole wiadomosci nie moze byc puste.'); }
    else { return true; }
    return false;
  };

  function handleSubmit() {
    const authorId = currentUser.userInfo._id;
    const isValidated = validation();
    if (isValidated === true) {
      const fetchMyData = async () => {
        const response = await postComment(authorId, subject, message, placeId);
      };
      fetchMyData();
    }
  }

  return (
    <>
      <div className="comment-form">
        <h1>Dodaj swój komentarz:</h1>
        <label htmlFor="subject-comment">
          Temat:
          <input className="subject-comment" id="subject-comment" type="text" name="subject" onChange={handleChange} />
        </label>
        <label htmlFor="textarea-comment">
          Treść komentarza:
          <textarea className="textarea-comment" id="textarea-comment" type="text" name="message" onChange={handleChange} />
        </label>
        <input className="comment-submit" type="submit" value="Wyślij" onClick={handleSubmit} />
      </div>
    </>
  );
}

CommentForm.propTypes = {
  placeId: PropTypes.string.isRequired,
};

export default CommentForm;
