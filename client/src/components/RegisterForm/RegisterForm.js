/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
import React from 'react';
import '../../scss/base/_register-form.scss';

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
    await fetch('http://localhost:8000/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        name: nameUser,
        email: emailUser,
        password: passwordUser,
      }),
    }).then((response) => {
      if (response.ok) {
        return response.text();
      }
      return response.text().then((text) => { throw Error(text); });
    })
      .then((responseText) => {
        localStorage.setItem('CURRENT_USER', responseText);
        window.location = '/';
      })
      .catch((response) => {
        alert(response);
      });
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
