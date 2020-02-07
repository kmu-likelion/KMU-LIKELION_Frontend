import React, { Component } from "react";
import api from "../../../api/api_group";
import { Link } from "react-router-dom";
import { tokenConfig } from "../../../action/auth";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

class GroupNew extends Component {
  state = {
    title: "",
    introduction: "",
    username: "",
    id: ""
  };

  componentDidMount() {
    console.log("New ComponentDidMount");
    const _id = window.sessionStorage.getItem("id");
    const _user = window.sessionStorage.getItem("username");
    if (_id) {
      this.setState({ id: _id, username: _user });
      console.log("접근모드 : 로그인 상태");
    } else {
      console.log("접근모드 : 로그아웃 상태");
    }
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handlingSubmit = async event => {
    event.preventDefault();
    // console.log("user-id: ", this.state.id);
    await api
      .createGroup(
        {
          title: this.state.title,
          introduction: this.state.introduction
        },
        tokenConfig()
      )
      .then(result => {
        console.log("정상적으로 생성됨.", result);
        this.setState({ title: "", introduction: "" });
      })
      .catch(err => console.log(err));

    // this.getPosts()
    this.props.history.push("/study"); //새로고침되지 않고, 리다이렉트해줌.
  };

  render() {
    return (
      <Container maxWidth="lg" className="PostingSection">
        <Paper className="PostingPaper">
          <h2>New StudyGroup</h2>
          <form onSubmit={this.handlingSubmit} className="PostingForm">
            <input
              id="title"
              name="title"
              value={this.state.title}
              onChange={this.handlingChange}
              required="required"
              placeholder="Title"
            />
            <input
              id="introduction"
              name="introduction"
              value={this.state.introduction}
              onChange={this.handlingChange}
              required="required"
              placeholder="introduction"
            />

            <button type="submit">생성</button>
          </form>

          <Link to="/study">Cancle</Link>
        </Paper>
      </Container>
    );
  }
}

export default GroupNew;
