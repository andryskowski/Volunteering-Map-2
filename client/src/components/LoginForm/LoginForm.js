/* eslint-disable no-alert */
/* eslint-disable no-shadow */
import React from 'react';
import { authLogin } from '../../actions/FetchData';
import '../../scss/base/_login-form.scss';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { emailUser, passwordUser } = this.state;
    authLogin(emailUser, passwordUser);
  }

  render() {
    return (
      <>
        <h3>Logowanie</h3>
        <form onSubmit={this.handleSubmit} className="form">
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
