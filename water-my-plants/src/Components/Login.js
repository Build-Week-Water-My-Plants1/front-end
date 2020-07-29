import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials:{
        username: "",
        password: ""
      }
      };

    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

    handleChange = e => {
      this.setState({
        credentials: {
          ...this.state.credentials,
          [e.target.name]: e.target.value
        }
        });
    };

    handleSubmit = e => {
      e.preventDefault()
      // const { email, password } = this.state;

      axios
        .post(
          "/api/auth/login", this.state.credentials,
          { withCredentials: true }
        )
        .then(res => {
          console.log(res);
          localStorage.setItem('token', res.payload);
          this.props.history.push('/plantlist');
        })
        .catch(err => console.log({ err }));
    };

    render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.credentials.username}
              onChange={this.handleChange}
            required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.credentials.password}
              onChange={this.handleChange}
            required
            />

            <button>Login</button>
          </form>
        </div>
      );
    }
  }

