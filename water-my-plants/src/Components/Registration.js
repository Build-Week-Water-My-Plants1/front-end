import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

const Button = styled.button`
    
    border-style: solid;
    border-radius: 30px;
    padding: 1.5rem 2.5rem;
    font-size: 2rem;
    cursor: pointer;
    transition: all 0.5s ease;
    font-family: "Inter", sans-serif;

  `


  const CustomForm = styled.form`
    
    background-color: transparent; /* Remove background fill */
    text-transform: uppercase; /* Make text all uppercase */
    border-radius: 0; /* Remove corner curve */
    border: 2px solid #fff; /* 2px white border */
    color: #2B3438; /* White text */
    height: 45px; /* Increase input height */

`


export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      phonenumber: "",
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
    const { email, password, password_confirmation } = this.state;

    axios
      .post(
        "http://localhost:3001/registrations",
        {
          user: {
            email: email,
            password: password,
            password_confirmation: password_confirmation
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.status === "created") {
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch(error => {
        console.log("registration error", error);
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
            value={this.state.email}
            onChange={this.handleChange}
            required
          />

<input
            type="phonenumber"
            name="phonenumber"
            placeholder="Phonenumber"
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