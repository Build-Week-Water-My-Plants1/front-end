import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: "",
        password: "",
        loginErrors: ""

      
      };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

    handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value 
    });
    console.log(this.state)
  }

    handleSubmit = e => {
      e.preventDefault()
      const { username, password } = this.state;

      axios
        .post(
          'https://cors-anywhere.herokuapp.com/https://water-my-plants1.herokuapp.com/api/auth/login', this.state,
        { withCredentials: true }
      )
        
        .then(res => {
          console.log(res);
          localStorage.setItem('token', res.payload);
          this.props.history.push('/plantlist');
          if (res.data.logged_in) {
          this.props.handleSuccessfulAuth(res.data);
        }

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
              value={this.state.username}
              onChange={this.handleChange}
            required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            required
            />

            <button>Login</button>
          </form>
        </div>
      );
    }
  }

