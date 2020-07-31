import React, { Component } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import styled from 'styled-components';
import img from '../assets/plant3.jpg';
import {Link } from 'react-router-dom';
import Nav from './Nav';


const Button = styled.button`
width: 227px;
height: 36px;
background-color: #00bdc8;
border-radius: 20px;
color: #ffffff;
padding: 4px 0 20px 0;
border: 1px solid #00bdc8;
margin: 5px;

`;

const Input = styled.input`
width: 335px;
height: 40px;
stroke: #d6ebec;
border-radius: 10px;
margin: 7px;
`;


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        username: "",
        password: "",
        // loginErrors: ""
      }

    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [event.target.name]: event.target.value
      }
    });
    console.log(this.state.credentials)
  }

  handleSubmit = e => {
    e.preventDefault()
    const { username, password } = this.state;

    axios
      .post(
        "https://cors-anywhere.herokuapp.com/https://water-my-plants1.herokuapp.com/api/auth/login",
        this.state.credentials,
        //   {
        //   user: {
        //     username: username,
        //     password: password,
        //     // loginErrors: ''
        //   }
        // },
        { withCredentials: true }
      )

      .then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem("currentUser", res.data.user_id);

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
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
            required
          /><br />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
            required
          /><br />

          <Button type="submit">Login</Button>
        </form>
          <Link to='/register'><Button>Or Sign Up</Button></Link>

      </div>
    );
  }
}

