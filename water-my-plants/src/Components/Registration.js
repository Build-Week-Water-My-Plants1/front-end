import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import {CustomButton, CustomInput, CustomDiv} from "./Login";



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
      <CustomDiv>
        <form onSubmit={this.handleSubmit}>
          <CustomInput
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />

<CustomInput
            type="phonenumber"
            name="phonenumber"
            placeholder="Phone number"
            value={this.state.phonenumber}
            onChange={this.handleChange}
            required
          />

          <CustomInput
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <CustomInput
            type="password"
            name="password_confirmation"
            placeholder="Password confirmation"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />

          <CustomButton type="submit">Register</CustomButton>
        </form>
      </CustomDiv>
    );
  }
}