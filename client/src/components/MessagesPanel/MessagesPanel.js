/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
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
import { getConversations, getLastMessage } from '../../actions/FetchData';
import '../../scss/base/_messages-panel.scss';
import Pagination from '../Pagination/Pagination';
  
function MessagesPanel(props) {
  const CURRENT_USER_CONTEXT = useContext(CurrentUserContext);
  const CURRENT_USER = CURRENT_USER_CONTEXT.userInfo;
  const [conversationsFromDB, setConversationsFromDB] = useState(null);
  const [unreadConversations, setUnreadConversations] = useState(null);
  const USERS = useContext(UsersContext);

  // sort by createdAt date
  const conversationsSortedByDate = conversationsFromDB?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const conversationsDefinitive = conversationsSortedByDate?.slice(indexOfFirstItem, indexOfLastItem);

  // Get last messages
  useEffect(() => {
    getConversations(CURRENT_USER._id).then(async (conversations) => {
      for (let index = 0; index < conversations.length; index++) {
        const conversation = conversations[index];
        conversation.lastMessage = await getLastMessage(conversation._id);
      }

      setConversationsFromDB(conversations);
    });
  }, [CURRENT_USER._id]);

  // Get unread conversations
  useEffect(() => {
    const fetchMyData = async () => {
      const unreadConvs = await conversationsFromDB?.filter((conv) => conv.lastMessage.receiverHasRead === false);
      setUnreadConversations(unreadConvs);
      console.log(unreadConvs);
    };
    fetchMyData();
  }, [conversationsFromDB]);

  // get info about friend (second member of conversation)
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
              {/* {console.log(unreadConversations?.filter((conv) => conv._id === conversation._id).some((conv) => conv.lastMessage.sender !== CURRENT_USER._id))} */}
              {console.log(unreadConversations?.filter((conv) => conv._id === conversation._id))}
              {unreadConversations?.some((conv) => conv._id === conversation._id)
              && unreadConversations.filter((conv) => conv._id === conversation._id).some((conv) => conv.lastMessage.sender !== CURRENT_USER._id)
                ? 'nie' : 'tak'}
              ostatnia wiadomosc:
              {conversation.lastMessage.text}
              {' '}
              id konwersacji:
              {' '}
              {conversation._id}
              {' '}
              updatedAt:
              {' '}
              {conversation.updatedAt}
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
