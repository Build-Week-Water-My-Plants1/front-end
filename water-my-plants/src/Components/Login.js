import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

export const CustomInput = styled.input`
  
  display: flex;
  justify-content: center;
  outline: none;
  margin: 0;
  border: 1px solid black;
  box-shadow: none;
  width: 100%;
  font-size: 14px;
  font-family: "Inter", sans-serif;
  margin: 10px;

`

export const CustomDiv = styled.div`
    
  line-height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  

  `

export const CustomButton = styled.button`
    
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
        <CustomDiv>
          <form onSubmit={this.handleSubmit}>
            <CustomInput
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.username}
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

          <CustomButton type="submit">Login</CustomButton>
        </form>
      </CustomDiv>
    );
  }
}
