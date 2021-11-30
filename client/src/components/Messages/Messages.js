/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, {
  useContext, useEffect, useState, useRef, 
} from 'react';
import { io } from 'socket.io-client';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import '../../scss/base/_messages.scss';

function Messages(props) {
  // const [socket, setSocket] = useState(null)
  const socket = useRef();
  const CURRENT_USER_CONTEXT = useContext(CurrentUserContext);
  const CURRENT_USER = CURRENT_USER_CONTEXT.userInfo;
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentMessageText, setCurrentMessageText] = useState('napisz wiadomość');
  const [conversationMessages, setConversationMessages] = useState([{ text: 'witam', date: '29.11.2021', senderId: 'fdsfsdfsd' }, 
    { text: 'cześć', date: '30.11.2021', senderId: 'fdsfdsadsdfsd' }]);

  useEffect(() => {
    socket.current = io('ws://localhost:8900');
    socket.current.on('getMessage', (data) => {
      const newMessage = { text: data.text, date: data.date, senderId: data.senderId };
      setConversationMessages((prevState) => ([
        ...prevState, newMessage,
      ]));
    });
  }, []); 

  useEffect(() => {
    socket.current.emit('addUser', CURRENT_USER._id);
    socket.current.on('getUsers', (users) => {
      console.log(users);
      setOnlineUsers(
        users,
      );
    });
  }, [CURRENT_USER]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const receiver = onlineUsers.find(
      (member) => member.userId !== CURRENT_USER._id,
    );

    if (receiver) {
      socket.current.emit('sendMessage', {
        senderId: CURRENT_USER._id,
        receiverId: receiver.userId,
        text: currentMessageText,
      });
    }
    const newMessage = { text: currentMessageText, date: '22.22.2022', senderId: CURRENT_USER._id };
    setConversationMessages((prevState) => ([
      ...prevState, newMessage,
    ]));
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    const newMessage = { text: currentMessageText, date: '22.22.2022', senderId: CURRENT_USER._id };
    setConversationMessages((prevState) => ([
      ...prevState, newMessage,
    ]));
    // socket.current.on('getMessage', (data) => {
    //   setArrivalMessage(data.text);
    // });
  };

  const handleChange = (e) => {
    setCurrentMessageText(e.target.value);
  };

  return (
    <>
      <h1>
        Messages, konwersacja o ID
        {' '}
        {props.location.state.conversationId}
      </h1>
      {onlineUsers ? onlineUsers.map((user) => (
        <h5>
          {user.userId}
        </h5>
      )) : 'brak'}
      {arrivalMessage || 'brak'}
      <div className="chatbox">
        Chatbox
        {' '}
        {conversationMessages.map((message) => (
          <div>
            {message.text}
            ,
            {' '}
            {message.date}
            ,
            {' '}
            {message.senderId}
          </div>
        ))}
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
      <input
        key="submit2"
        id="send2"
        type="submit"
        value="Odbierz"
        className="submit"
        onClick={handleSubmit2}
      />
      {currentMessageText || 'current'}
    </>
  );
}

export default Messages;
