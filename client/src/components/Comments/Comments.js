/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getComments, getUser } from '../../actions/FetchData';
import '../../scss/base/_comments.scss';
import CommentForm from './CommentForm/CommentForm';

function Comments({ placeId }) {
  const [comments, setComments] = useState([]);
  const [commentsNumber, setNumberComments] = useState(0);

  const setRoleStyle = (role) => {
    if (role === 'moderator') return { color: 'blue' };
    if (role === 'admin') return { color: 'red' };
    if (role === 'user') return { color: 'green' };
    return { color: 'black' };
  };

  const getAuthor = async (authorId) => {
    const authorFromDb = await getUser(authorId);
    return authorFromDb;
  };

  useEffect(() => {
    getComments().then(async (commentsFromDb) => {
      for (let index = 0; index < commentsFromDb.length; index++) {
        const comment = commentsFromDb[index];

        comment.author = await getAuthor(comment.authorId);
      }

      console.log(commentsFromDb);
      setComments(commentsFromDb);

      // get number of comments fot this place
      comments.filter((comment) => comment.placeId === placeId)
        .map((comment, index) => setNumberComments(index + 1));
    });
  }, [comments, placeId]);

  return (
    <>
      <h1>
        Komentarze
        {' '}
        <span>
          (
          {commentsNumber}
          )
        </span>
        :
      </h1>
      <div className="comments">
        {comments.filter((comment) => comment.placeId === placeId).reverse().map((comment) => (
          <div key={comment._id} className="comment">
            <div className="profilephoto-container">
              <img src={comment.author.profilePhoto} width="100px" height="100px" alt="no profilePhoto" />
            </div>
            <p style={setRoleStyle(comment.author.role)}>
              <b>
                {comment.author.name}
              </b>
            </p>
            <p>
              subject:
              {' '}
              {comment.subject}
            </p>
            <p>
              date:
              {' '}
              {comment.date.substring(0, 10)}
              {' '}
              {comment.date.substring(11, 19)}
            </p>
            <p>
              message:
              {' '}
              {comment.message}
            </p>
            <p>
              o:
              {' '}
              {comment.placeId}
            </p>
          </div>
        ))}
      </div>
      <CommentForm placeId={placeId} />
    </>
  );
}

Comments.propTypes = {
  placeId: PropTypes.string.isRequired,
};

export default Comments;
