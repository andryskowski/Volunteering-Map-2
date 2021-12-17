/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, {
  useContext, useEffect, useState,
} from 'react';
import { Link } from 'react-router-dom';
import { UsersContext } from '../../contexts/UsersContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { getConversations } from '../../actions/FetchData';
import '../../scss/base/_messages-panel.scss';
import Pagination from '../Pagination/Pagination';
  
function MessagesPanel(props) {
  const CURRENT_USER_CONTEXT = useContext(CurrentUserContext);
  const CURRENT_USER = CURRENT_USER_CONTEXT.userInfo;
  const [conversationsFromDB, setconversationsFromDB] = useState(null);
  const USERS = useContext(UsersContext);

  // sort by createdAt date
  const conversationsSortedByDate = conversationsFromDB?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const conversationsDefinitive = conversationsSortedByDate?.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchMyData = async () => {
      const response = await getConversations(CURRENT_USER._id);
      setconversationsFromDB(response);
    };
    fetchMyData();
  }, [CURRENT_USER._id]);

  const friendInfo = (currentConversation) => {
    const friendId = currentConversation.members.filter((member) => member !== CURRENT_USER._id);
    const friend = USERS.find((user) => user._id === friendId.toString());
    return (
      <Link exact to={{ pathname: '/messages', state: { conversation: currentConversation } }}>
        <h5>
          {friendId.toString()}
          ,
          {' '}
          {friend ? friend.name : 'user'}
          {' '}
          {friend ? <img className="chat-avatar" src={friend ? friend.profilePhoto : 'profile photo'} alt="no chat-avatar" /> : 'user photo'}
        </h5>
      </Link>
    );
  };

  return (
    <>
      <div className="page-container">
        <h1>Konwersacje</h1>
        {conversationsDefinitive?.map((conversation) => (
          <div className="conversation-box">
            <h6>
              id konwersacji:
              {' '}
              {conversation._id}
              {' '}
              createdAt:
              {' '}
              {conversation.createdAt}
            </h6>
            {friendInfo(conversation)}
          </div>
        ))}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={conversationsFromDB?.length}
        paginate={paginate}
      />
    </>
  );
}
  
export default MessagesPanel;
