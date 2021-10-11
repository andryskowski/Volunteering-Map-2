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

  const getAuthor = async (authorId) => {
    const authorFromDb = await getUser(authorId);
    return authorFromDb;
  };

  useEffect(() => {
    let mounted = true;
    getComments().then((commentsFromDb) => {
      if (mounted) {
        commentsFromDb = commentsFromDb.map(async (comment) => {
          comment.author = await getAuthor(comment.authorId);
          return comment;
        });
        setComments(commentsFromDb);
        console.log(comments);
      }
    });
    return () => {
      mounted = false;
      console.log(comments);
    };
  }, []);

  return (
    <>
      <h1>Komentarze</h1>
      <div className="comments">
        {comments.filter((comment) => comment.placeId === placeId).reverse().map((comment) => (
          <div className="comment">
            <p>
              author:
              {' '}
              {comment.author.profilePhoto}
            </p>
            <p>
              subject:
              {' '}
              {comment.subject}
            </p>
            <p>
              date:
              {' '}
              {comment.date}
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
