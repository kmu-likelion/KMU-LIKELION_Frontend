import React, { Component } from "react";
import api from "../../../api/api_board";
import { Link } from "react-router-dom";
import { tokenConfig } from "../../../action/auth";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

class StudyNew extends Component {
  state = {
    title: "",
    body: "",
    how_many_people: "",
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
    // this._getPost(this.props.match.params.id);
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handlingSubmit = async event => {
    event.preventDefault(); //event의 디폴트 기능(새로고침 되는 것 등..) -> 막는다.
    console.log("user-id: ", this.state.id);
    let result = await api.createPost(
      "study",
      {
        title: this.state.title,
        body: this.state.body,
        how_many_people: this.state.how_many_people,
        writer: this.state.id
      },
      tokenConfig()
    );
    console.log("정상적으로 생성됨.", result);
    this.setState({ title: "", content: "" });
    // this.getPosts()
    //document.location.href = "/QnA";
    this.props.history.push("/study"); //새로고침되지 않고, 리다이렉트해줌.
  };

  render() {
    return (
      <Container maxWidth="lg" className="PostingSection">
        <Paper className="PostingPaper">
          <h2>New Study</h2>
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
              id="body"
              name="body"
              value={this.state.body}
              onChange={this.handlingChange}
              required="required"
              placeholder="Content"
            />
            <input
              name="how_many_people"
              value={this.state.how_many_people}
              onChange={this.handlingChange}
              required="required"
              placeholder="how_many_people"
            />

            <button type="submit">제출</button>
          </form>

          <Link to="/study">Cancle</Link>
        </Paper>
      </Container>
    );
  }
}

export default StudyNew;
