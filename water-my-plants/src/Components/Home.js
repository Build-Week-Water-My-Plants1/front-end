import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import Registration from "./Registration"; 
import Login from "./Login";


const CustomHeader = styled.h1`
 font-size: 4.2rem;
    font-weight: 600;
    line-height: 6rem;
    text-align: center;
`

const CustomButton = styled.button`
    
    line-height: 40px;
  display: inline-block;
  padding: 0 25px;
  cursor: pointer;
  color: #00BDC8;
  font-family: "Inter", sans-serif;
  -webkit-transition: all 0.4s ease;
  -o-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  transition: all 0.4s ease;
  font-size: 14px;
  font-weight: 700;

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

