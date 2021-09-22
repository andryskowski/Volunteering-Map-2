import React from 'react';
import '../../scss/base/_register-form.scss';

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
    const response = await fetch('http://localhost:8000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        email: emailUser,
        password: passwordUser,
      }),
    });
    const USERNAME = await response.text();
    localStorage.setItem('Username', USERNAME);
  }

  render() {
    return (
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
    );
  }
}
