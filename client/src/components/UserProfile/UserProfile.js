/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, {
  useContext, useEffect, useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import Parser from 'html-react-parser';
import { UsersContext } from '../../contexts/UsersContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { postConversation, findConversation } from '../../actions/FetchData';

function UserProfile(props) {
  const { userId } = props;
  const users = useContext(UsersContext);
  const CURRENT_USER_CONTEXT = useContext(CurrentUserContext);
  const CURRENT_USER = CURRENT_USER_CONTEXT.userInfo;
  const [currentConversation, setCurrentConversation] = useState(null);
  const history = useHistory();

  const setRoleStyle = (role) => {
    if (role === 'moderator') return { color: 'blue' };
    if (role === 'admin') return { color: 'red' };
    if (role === 'user') return { color: 'green' };
    return { color: 'black' };
  };

  useEffect(() => {
    const currentUser = users.filter((user) => user._id === userId);
  }, [userId, users]);

  useEffect(() => {
    if (currentConversation) {
      history.push('/messages', { conversation: currentConversation });
    }
  }, [currentConversation, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fetchMyDataIfConversationExists = async () => {
      const response = await findConversation(props.userId, CURRENT_USER._id);
      if (response) {
        setCurrentConversation(response);
      } else {
        const fetchMyDataIfConversationNotExists = async () => {
          await postConversation(CURRENT_USER._id, props.userId);
          const response2 = await findConversation(props.userId, CURRENT_USER._id);
          setCurrentConversation(response2);
        };
        fetchMyDataIfConversationNotExists();
      }
    };
    fetchMyDataIfConversationExists();
  };

  return (
    <>
      <div className="page-container">
        {users.filter((user) => user._id === userId)
          .map((user) => (
            <>
              <h2>Profil użytkownika</h2>
              <div>
                <img src={user.profilePhoto} width="150" height="150" alt="Error no profile phot" />
              </div>
              <p>
                <b>Rola: </b>
                <span style={setRoleStyle(user.role)}>{user.role}</span>
              </p>
              <input
                key="submit"
                id="send"
                type="submit"
                value="Napisz wiadomość"
                className="submit"
                onClick={handleSubmit}
              />
              <p>
                <b>Nazwa użytkownika: </b>
                {user.name}
              </p>
              <p>
                <b>Dołączył dnia </b>
                {user.date.substring(0, 10)}
                <b>, o gdzinie </b>
                {user.date.substring(11, 16)}
              </p>
              <p>
                <b>Email użytkownika: </b>
                {user.email}
              </p>
              <p>
                <b>Opis użytkownika: </b>
                {user.description ? Parser(user.description) : 'brak opisu'}
              </p>
            </>
          ))}
      </div>
    </>
  );
}

export default UserProfile;
