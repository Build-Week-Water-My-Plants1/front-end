import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import Registration from "./Registration"; 
import Login from "./Login";
import {CustomButton} from "./Login";


const CustomHeader = styled.h1`
 font-size: 3.8rem;
    font-weight: 600;
    line-height: 6rem;
    text-align: center;
`


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push("/dashboard");
  }

  handleLogoutClick() {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then(response => {
        this.props.handleLogout();
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }

  render() {
    return (
      <div>
        <CustomHeader>Log In</CustomHeader>
        <h1> {this.props.loggedInStatus}</h1>
        
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
        
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
        <CustomButton onClick={() => this.handleLogoutClick()}>Logout</CustomButton>
      </div>
    );
  }
}

