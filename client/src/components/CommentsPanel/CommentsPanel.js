/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
import React, {
  Children,
  useContext, useEffect, useState,  
} from 'react';
import { Link } from 'react-router-dom';
import { getComments, removeComment } from '../../actions/FetchData';
import { setRoleStyle } from '../../actions/CommonFunctions';
import Pagination from '../Pagination/Pagination';
import '../../scss/base/_comments-panel.scss';
  
function CommentsPanel() {
  const [comments, setComments] = useState([]);
  // pagination
  const [itemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const commentsWithPagination = comments.slice(indexOfFirstItem, indexOfLastItem);
  
  useEffect(() => {
    const fetchMyData = async () => {
      const response = await getComments();
      setComments(response);
    };
    fetchMyData();
  }, []);
  
  const handleRemoveComment = (event) => {
    const removedCommentId = event.target.value;
    const fetchMyData = async () => {
      await removeComment(removedCommentId);
    };
    fetchMyData();
    alert(`Usunieto uzytkownika o id ${removedCommentId}`);
    window.location.reload(true);
  };
  
  //   const handleChangeRole = (event) => {
  //     const changedRole = event.target.value;
  //     const changedUserId = event.target.id;
  //     console.log(event.target.id, changedRole);
  //     updateUserRole(changedUserId, changedRole);
  //   };
  
  return (
    <>
      <div className="page-container comments-panel">
        <h1>Panel komentarzy</h1>
        {commentsWithPagination.map((comment) => (
          <div className="comment-container">
            <h5>
              commentId:
              {' '}
              {comment._id}
            </h5>
            <h5>
              authorId:
              {' '}
              {comment.authorId}
            </h5>
            <h5>
              placeId:
              {' '}
              {comment.placeId}
            </h5>
            <h5>
              temat:
              {' '}
              <span className="message">
                {comment.subject}
              </span>
            </h5>
            <h5>
              wiadomość:
              {' '}
              <span className="message">
                {comment.message}
              </span>
            </h5>
            <h5>
              data:
              {' '}
              <span className="message">
                {comment.date.substring(0, 10)}
                {' '}
                {comment.date.substring(11, 19)}
              </span>
            </h5>
            <button className="remove-comment" type="submit" value={comment._id} onClick={handleRemoveComment}>Usuń komentarz</button>
          </div>
        ))}
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={comments.length}
          paginate={paginate}
        />
      </div>
    </>
  );
}
  
export default CommentsPanel;
