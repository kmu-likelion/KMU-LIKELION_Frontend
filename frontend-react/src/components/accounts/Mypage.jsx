import React, { Component } from "react";
import api from "../../api/api_auth";

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
    // const _id = window.sessionStorage.getItem("id");
    const _id = this.props.match.params.id;
    this.getUser(_id);
    // console.log(window.sessionStorage.getItem("token"));
  }

  async getUser(userId) {
    await api
      .getUser(userId)
      .then(res => {
        const userData = res.data;
        console.log(userData);
        this.setState({
          id: userData.id,
          username: userData.username
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container maxWidth="lg" className="PostingSection">
        <Paper className="PostingPaper">
          My page <br />
          <br />
          id {this.state.id} <br />
          Username {this.state.username}
          <br />
        </Paper>
      </Container>
    );
  }
}

export default Mypage;
