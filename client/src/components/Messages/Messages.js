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
import { io } from 'socket.io-client';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { UsersContext } from '../../contexts/UsersContext';
import '../../scss/base/_messages.scss';
import { getMessages, postMessage, updateConversation } from '../../actions/FetchData';

function Messages(props) {
  const socket = useRef();
  const CURRENT_USER_CONTEXT = useContext(CurrentUserContext);
  const CURRENT_USER = CURRENT_USER_CONTEXT.userInfo;
  const USERS = useContext(UsersContext);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentMessageText, setCurrentMessageText] = useState('napisz wiadomość');
  const [conversationMessages, setConversationMessages] = useState([]);
  const [friendId, setFriendId] = useState(null);
  const [friend, setFriend] = useState(null);
  const el = useRef(null);

  useEffect(() => {
    socket.current = io('ws://localhost:8900');
    // get messages of this conversation from db
    const fetchMyData = async () => {
      const response = await getMessages(props.location.state.conversation._id);
      const messagesFromDb = response.map((message) => ({ text: message.text, date: message.createdAt, senderId: message.sender }));
      setConversationMessages(messagesFromDb);
    };
    fetchMyData();
    // socket io
    socket.current.on('getMessage', (data) => {
      const newMessage = { text: data.text, date: data.date, senderId: data.senderId };
      setConversationMessages((prevState) => ([
        ...prevState, newMessage,
      ]));
    });
  }, [props.location.state.conversation._id]); 

  useEffect(() => {
    setFriendId(props.location.state.conversation.members?.find((memberId) => memberId !== CURRENT_USER._id));
    setFriend(USERS.find((user) => user._id === friendId));
  }, [CURRENT_USER._id, USERS, friendId, props.location.state.conversation.members]);

  useEffect(() => {
    socket.current.emit('addUser', CURRENT_USER._id);
    socket.current.on('getUsers', (users) => {
      setOnlineUsers(
        users,
      );
    });
  }, [CURRENT_USER]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date();
    today.setHours(today.getHours() + 1);

    const receiver = onlineUsers.find(
      (member) => member.userId !== CURRENT_USER._id,
    );
    
    if (receiver) {
      socket.current.emit('sendMessage', {
        senderId: CURRENT_USER._id,
        receiverId: receiver.userId,
        text: currentMessageText,
        date: today.toISOString(),
      });
    }
    const newMessage = { text: currentMessageText, date: today.toISOString(), senderId: CURRENT_USER._id };
    setConversationMessages((prevState) => ([
      ...prevState, newMessage,
    ]));
    await updateConversation(props.location.state.conversation._id);
    await postMessage(props.location.state.conversation._id, CURRENT_USER._id, currentMessageText);
  };

  const handleChange = (e) => {
    setCurrentMessageText(e.target.value);
  };

  // to set navigation bar at bottom
  useEffect(() => {
    el.current.scrollIntoView({ block: 'end', behavior: 'auto' });
  });

  return (
    <>
      <h6>
        Messages, konwersacja o ID
        {' '}
        {props.location.state.conversation._id}
      </h6>
      <div className="chat-main-bar">
        <h2>
          Konwersacja z użytkownikiem 
          {' '}
          {friend ? (
            <Link to={friend._id} userId={friend._id}>
              {friend.name}
            </Link>
          ) : false}
          {' '}
          {onlineUsers?.map((user) => user.userId).includes(friendId) 
            ? <span className="user-online">(online)</span> : <span className="user-offline">(offline)</span>}
        </h2>
        {' '}
        {' '}
        <div src="chat-avatar-container">
          <img className="chat-avatar" src={friend?.profilePhoto} alt="no chat-avatar" />
        </div>
      </div>
      {onlineUsers ? onlineUsers.map((user) => (
        <h5>
          Użytkownicy online:
          {user.userId}
        </h5>
      )) : 'brak'}
      {arrivalMessage || 'brak'}
      <div className="chatbox">
        {' '}
        {conversationMessages.map((message) => (
          <div className="message-box">
            {USERS.filter((user) => user._id === message.senderId)
              .map((user) => (
                <h5>{user.name}</h5>
              ))}
            {message.text}
            ,
            {' '}
            {message.date}
            ,
            {' '}
            {message.senderId}
          </div>
        ))}
        <div id="el" ref={el} />
      </div>
      <input
        key="message-input"
        id="message-input"
        type="text"
        defaultValue={currentMessageText}
        onChange={handleChange}
        className="message-input"
      />
      <input
        key="submit"
        id="send"
        type="submit"
        value="Wyślij"
        className="submit"
        onClick={handleSubmit}
      />
    </>
  );
}

export default Messages;
