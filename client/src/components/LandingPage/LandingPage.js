/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';

function ViewPlaceForm(props) {
  return (
    <>
      <h1>Landing page</h1>
      <div>
        <LoginForm />
        <RegisterForm />
      </div>
    </>
  );
}

export default ViewPlaceForm;
