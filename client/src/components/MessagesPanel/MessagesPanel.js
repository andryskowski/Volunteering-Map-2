/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, {
  useContext, useEffect, useState, useRef,
} from 'react';
import { Link } from 'react-router-dom';
import { UsersContext } from '../../contexts/UsersContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { getConversations, getLastMessage } from '../../actions/FetchData';
import '../../scss/base/_messages-panel.scss';
import '../../scss/base/_common.scss';
import Pagination from '../Pagination/Pagination';
  
function MessagesPanel(props) {
  const CURRENT_USER_CONTEXT = useContext(CurrentUserContext);
  const CURRENT_USER = CURRENT_USER_CONTEXT.userInfo;
  const [conversationsFromDB, setConversationsFromDB] = useState(null);
  const [unreadConversations, setUnreadConversations] = useState(null);
  const USERS = useContext(UsersContext);
  const conversationBox = useRef(null);

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
      localStorage.setItem('numberUnreadConversations', unreadConvs?.length);
      console.log(unreadConvs);
    };
    fetchMyData();
  }, [conversationsFromDB]);

  // get info about friend (second member of conversation)
  const friendInfo = (currentConversation) => {
    const friendId = currentConversation.members.filter((member) => member !== CURRENT_USER._id);
    const friend = USERS.find((user) => user._id === friendId.toString());
    return (
      <div className="linkToConversation">
        <Link exact to={{ pathname: '/messages', state: { conversation: currentConversation } }}>
          <h5>
            {friend ? <img className="chat-avatar" src={friend ? friend.profilePhoto : 'profile photo'} alt="no chat-avatar" /> : 'user photo'}
            {' '}
            {'Konwersacja z użytkownikiem: '}
            {' '} 
            {friend ? friend.name : 'user'}
            
          </h5>
        </Link>
      </div>
    );
  };

  return (
    <>
      <div className="page-container">
        <h1>Konwersacje z użytkownikami</h1>
        {conversationsDefinitive?.map((conversation) => (
          <div className="conversation-box" ref={conversationBox}>
            {friendInfo(conversation)}
            <div className="second-part">
              <h6>
                {unreadConversations?.some((conv) => conv._id === conversation._id)
              && unreadConversations.filter((conv) => conv._id === conversation._id).some((conv) => conv.lastMessage.sender !== CURRENT_USER._id)
                  ? <h5 className="fontWeightBold">Nowe wiadomości</h5> : <h5 className="text-no-newmessages">Brak nowych wiadomości</h5> }
                <h2>
                  ostatnia wiadomosc:
                  {' '}
                  <span className="last-message">{conversation.lastMessage.text}</span>
                </h2>
                {' '}
                {' '}
                Data:
                {' '}
                {' '}
                {conversation.updatedAt.substring(0, 10)}
                {' '}
                {conversation.updatedAt.substring(11, 19)}
              </h6>
            </div>
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
