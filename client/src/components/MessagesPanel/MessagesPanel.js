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
  
function MessagesPanel(props) {
  const CURRENT_USER_CONTEXT = useContext(CurrentUserContext);
  const CURRENT_USER = CURRENT_USER_CONTEXT.userInfo;
  const [currentConversations, setCurrentConversations] = useState(null);
  const USERS = useContext(UsersContext);

  useEffect(() => {
    const fetchMyData = async () => {
      const response = await getConversations(CURRENT_USER._id);
      setCurrentConversations(response);
    };
    fetchMyData();
  }, [CURRENT_USER._id]);
  
  const setRoleStyle = (role) => {
    if (role === 'moderator') return { color: 'blue' };
    if (role === 'admin') return { color: 'red' };
    if (role === 'user') return { color: 'green' };
    return { color: 'black' };
  };

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
        {currentConversations?.map((conversation) => (
          <div className="conversation-box">
            <h6>
              id konwersacji:
              {' '}
              {conversation._id}
            </h6>
            {friendInfo(conversation)}
          </div>
        ))}
      </div>
    </>
  );
}
  
export default MessagesPanel;
