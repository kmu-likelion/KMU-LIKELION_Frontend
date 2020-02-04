import React, { Component } from "react";
// import api from "../../api/api_auth";
// import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

class Mypage extends Component {
  state = {
    id: "",
    username: "",
    password: "",
    token: ""
  };

  componentDidMount() {
    console.log("New ComponentDidMount");
    const _id = window.sessionStorage.getItem("id");
    const _user = window.sessionStorage.getItem("username");

    if (_id) {
      this.setState({ id: _id, username: _user });
    }
  }

  render() {
    return (
      <Container maxWidth="lg" className="PostingSection">
        <Paper className="PostingPaper">
          <h2>My page</h2>
          Username {this.state.username}
          <br />
        </Paper>
      </Container>
    );
  }
}

export default Mypage;
