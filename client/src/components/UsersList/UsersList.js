/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, {
  useContext, useEffect, useState,  
} from 'react';
import { getUsers, removeUser } from '../../actions/FetchData';
import '../../scss/base/_users-list.scss';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [roleToChange, setRoleToChange] = useState('user');
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
    // const fetchMyData = async () => {
    //   await updateUser(changedUserId, changedRole);
    // };
  };

  return (
    <>
      <div className="page-container">
        <h1>Users list</h1>
        {users.map((user) => (
          <div className="users-container">
            <button className="remove-user-button" value={user._id} type="submit" onClick={removeSelectedUser}>X</button>
            <select onChange={handleChangeRole} id={user._id}>
              <option value="admin">admin</option>
              <option value="moderator">moderator</option>
              <option selected value="user">user</option>
            </select>
            <img src={user.profilePhoto} className="profile-photo" alt="no user img" width="100px" height="100px" />
            <p>
              <b>role:</b> 
              {' '}
              {user.role}
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

export default UsersList;
