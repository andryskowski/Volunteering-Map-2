/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import Parser from 'html-react-parser';
import { UsersContext } from '../../contexts/UsersContext';

function UserProfile(props) {
  const { userId } = props;
  const users = useContext(UsersContext);

  const setRoleStyle = (role) => {
    if (role === 'moderator') return { color: 'blue' };
    if (role === 'admin') return { color: 'red' };
    if (role === 'user') return { color: 'green' };
    return { color: 'black' };
  };

  useEffect(() => {
    const currentUser = users.filter((user) => user._id === userId);
    console.log(currentUser.name, currentUser.email);
  }, [userId, users]);

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
