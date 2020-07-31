import React, { Component } from "react";
import axios from "axios";
import styled from 'styled-components';
import img from '../assets/plant3.jpg';
import Nav from './Nav';

const Button = styled.button`
width: 227px;
height: 36px;
background-color: #00bdc8;
border-radius: 20px;
color: #ffffff;
border: 1px solid #00bdc8;
margin: 5px;

`;

const Container = styled.div`
    margin-top: 20px;
    background-image: url(${img});
    background-size: 100% auto;
    padding-bottom: 300px;
    padding-top: 50px;
    margin: 0 auto;
    `

const Input = styled.input`
width: 335px;
height: 40px;
stroke: #d6ebec;
border-radius: 10px;
margin: 7px;
`;


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
         <Nav />

        <h1>Sign Up to get started</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
            required
          /><br/>

          <Input
            type="phonenumber"
            name="phonenumber"
            placeholder="Phone number"
            value={this.state.phonenumber}
            onChange={this.handleChange}
            required
          /><br/>

          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          /><br/>

          <Input
            type="password"
            name="password_confirmation"
            placeholder="Password confirmation"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          /><br/>

          <Button type="submit">Register</Button>
        </form>
      </div>
    );
  }
}