import React, { Component } from "react";
import axios from "axios";

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      phonenumber: "",
      password: "",
      password_confirmation: "",
      registrationErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { username, phonenumber, password} = this.state;

    axios
      .post(
        "https://water-my-plants1.herokuapp.com/api/auth/register",
        {
          user: {
            username: username,
            phone_number: phonenumber,
            password: password
          }
        },
        { withCredentials: true }
      )
      .then(res => {
        console.log(res);
        //localStorage.setItem("token", res.data.token); need to figure out the exact response
        // this.props.history.push("/plantlist"); //need to figure out exact route

      })
      .catch(err => {
        console.log("registration error", err);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />

          <input
            type="phonenumber"
            name="phonenumber"
            placeholder="Phone number"
            value={this.state.phonenumber}
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

          <input
            type="password"
            name="password_confirmation"
            placeholder="Password confirmation"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}