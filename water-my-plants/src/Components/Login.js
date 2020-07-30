import React, { Component } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

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
      credentials:{
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
          "https://water-my-plant1.herokuapp.com/api/auth/login",
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
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.credentials.username}
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

