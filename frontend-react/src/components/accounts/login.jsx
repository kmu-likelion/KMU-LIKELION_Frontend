import React, { Component } from "react";
import { authlogin } from "../../api/api_auth";
import Store from "../../Store/store";

import { Link, Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

class Login extends Component {
  static contextType = Store; //contextType으로 context 접근.

  state = {
    username: "",
    password: ""
  };

  componentDidMount() {
    console.log("New ComponentDidMount");
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.value);
  };

  handlingSubmit = async event => {
    event.preventDefault();

    await authlogin({
      username: this.state.username,
      password: this.state.password
    })
      .then(result => {
        console.log("로그인 성공!", result);
        this.doSignup(
          result.data.user.id,
          result.data.user.username,
          result.data.img,
          result.data.token
        );
        this.context.onLogin();
      })
      .catch(err => console.log(err));

    this.setState({ username: "", password: "" });
  };

  doSignup = (id, name, img, token) => {
    window.sessionStorage.setItem("id", id);
    window.sessionStorage.setItem("username", name);
    window.sessionStorage.setItem("user_img", img);
    window.sessionStorage.setItem("token", token);
    console.log("token in session : ", window.sessionStorage.getItem("token"));
  };

  render() {
    if (this.context.logged) {
      return <Redirect to="/" />; //logged 상태가 true일 시, main page로 리다이렉트.
    }
    return (
      <Container maxWidth="lg" className="PostingSection">
        <Paper className="PostingPaper">
          <h2>Login</h2>
          <form onSubmit={this.handlingSubmit} className="PostingForm">
            <input
              type="text"
              id="username"
              name="username"
              value={this.state.username}
              onChange={this.handlingChange}
              required="required"
              placeholder="Username"
            />
            <br />
            <input
              type="password"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handlingChange}
              required="required"
              placeholder="PW"
            />
            <br />
            <button type="submit">Login</button>
          </form>

          <Link to="/">Cancel</Link>
        </Paper>
      </Container>
    );
  }
}

export default Login;
