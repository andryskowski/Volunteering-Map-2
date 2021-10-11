/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, {
  Children,
  useContext, useEffect, useState,  
} from 'react';
import { getUsers, removeUser, updateUserRole } from '../../actions/FetchData';
import '../../scss/base/_users-list.scss';

function UsersPanel() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchMyData = async () => {
      const response = await getUsers();
      setUsers(response);
    };
    fetchMyData();
  }, []);

  const removeSelectedUser = (event) => {
    const removedUserId = event.target.value;
    const fetchMyData = async () => {
      await removeUser(removedUserId);
    };
    fetchMyData();
    alert(`Usunieto uzytkownika o id ${removedUserId}`);
    window.location.reload(true);
  };

  const changeUserRole = (event) => {

  };

  const handleChangeRole = (event) => {
    const changedRole = event.target.value;
    const changedUserId = event.target.id;
    console.log(event.target.id, changedRole);
    updateUserRole(changedUserId, changedRole);
  };

  const setRoleStyle = (role) => {
    if (role === 'moderator') return { color: 'blue' };
    if (role === 'admin') return { color: 'red' };
    if (role === 'user') return { color: 'green' };
    return { color: 'black' };
  };

  return (
    <>
      <div className="page-container">
        <h1>Users list</h1>
        {users.map((user) => (
          <div className="users-container">
            <button className="remove-user-button" value={user._id} type="submit" onClick={removeSelectedUser}>X</button>
            <div className="role-container">
              <p>Zmień rolę na: </p>
              <select onChange={handleChangeRole} id={user._id}>
                <option selected value=""> </option>
                <option value="admin">admin</option>
                <option value="moderator">moderator</option>
                <option value="user">user</option>
              </select>
            </div>
            <img src={user.profilePhoto} className="profile-photo" alt="no user img" width="100px" height="100px" />
            <p>
              <b>role:</b> 
              {' '}
              <span style={setRoleStyle(user.role)}>{user.role}</span>
            </p>
            <p>
              <b>login:</b> 
              {' '}
              {user.name}
            </p>
            <p>
              <b>id:</b> 
              {' '}
              {user._id}
            </p>
            <p>
              <b>email:</b> 
              {' '}
              {user.email}
            </p>
            <p>
              <b>data dołączenia:</b> 
              {' '}
              {user.date}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default UsersPanel;