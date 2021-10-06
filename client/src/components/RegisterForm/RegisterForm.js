/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
import React from 'react';
import '../../scss/base/_register-form.scss';
import { authRegister } from '../../actions/FetchData';

export default class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameUser: '',
      emailUser: '',
      passwordUser: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name } = event.target;
    this.setState({ [name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { nameUser, emailUser, passwordUser } = this.state;
    authRegister(nameUser, emailUser, passwordUser);
  }

  render() {
    return (
      <>
        <h3>Rejestracja</h3>
        <form onSubmit={this.handleSubmit} className="form">
          <label htmlFor="name">
            Login/Nazwa użytkownika:
            <input id="name" type="text" name="nameUser" onChange={this.handleChange} />
          </label>
          <label htmlFor="email">
            Email:
            <input id="email" type="email" name="emailUser" onChange={this.handleChange} />
          </label>
          <label htmlFor="password">
            Password:
            <input id="password" type="password" name="passwordUser" onChange={this.handleChange} />
          </label>
          <input
            id="send"
            type="submit"
            value="Wyślij"
            className="submit"
            onClick={this.handleSubmit}
          />
        </form>
      </>
    );
  }
}
