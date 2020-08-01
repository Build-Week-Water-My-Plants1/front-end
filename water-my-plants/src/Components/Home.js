import React, { Component } from "react";
import axios from "axios";
import img from '../assets/plant3.jpg';

import Registration from "./Registration"; 
import Login from "./Login";
import styled from 'styled-components';
import Nav from './Nav';


const H1 = styled.h1`
  font-size: 3em;
padding: 10px;
 font-family: 'Inter', sans-serif;
 font-weight: bold;
color: #00bdc8;
font-family: 'Noto Sans', sans-serif;
`

const H2 = styled.h2`
  color: #2b3438;
   font-family: 'Inter', sans-serif;
   font-family: 'Noto Sans', sans-serif;

`

const H4 = styled.h4`
  color: #2b3438;
   font-family: 'Inter', sans-serif;
   font-family: 'Noto Sans', sans-serif;

`
const Button = styled.button`
width: 227px;
height: 36px;
background-color: #00bdc8;
border-radius: 20px;
color: #ffffff;
padding-bottom: 10px;
border: 1px solid #00bdc8;
`;


const Container= styled.div`
    background-image: url(${img});
    background-size: 100% auto;
    padding-bottom: 300px;
    margin: 0 auto;
    `

    const Input =styled.input`
width: 335px;
height: 40px;
stroke: #d6ebec;
border-radius: 10px;
margin: 10px;
`;


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
      <Container>
        <Nav />
      <div>
        <H1>Water My Plants</H1>
        <H2>Login or signup to get started</H2>
        <H4>Status: {this.props.loggedInStatus}</H4>
        <Button onClick={() => this.handleLogoutClick()}>Logout</Button>
        {/* <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} /> */}
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
      </div>
      </Container>
    );
  }
}

