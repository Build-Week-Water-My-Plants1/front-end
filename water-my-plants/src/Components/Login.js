import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
          state = {
            credentials:{
            email: "",
            password: "",
            phone:"",
            loginErrors: ""
       }
  };

  handleChange(event) {
    this.setState({
      credentials:{
      [event.target.name]: event.target.value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // const { email, password } = this.state;

    axios
      .post(
        "http://localhost:3000/login",this.state.credentials)//???
      .then(res => {
        if (res.data) {
          localStorage.setItem('token', res.data.payload);
          this.props.history.push('/plants');//????
        }
      })
      .catch(error => {
        console.log("login error", error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.credentials.email}
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

          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

