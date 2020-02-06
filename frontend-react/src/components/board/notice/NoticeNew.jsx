import React, { Component } from "react";
import api from "../../../api/api_board";
import { Link } from "react-router-dom";
// import { Router } from "react-router";

// material-ui
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { tokenConfig } from "../../../action/auth";
// import moment from 'moment';

class NoticeNew extends Component {
  state = {
    id: "",
    username: "",
    title: "",
    body: "",
    run_date: ""
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
    console.log(event.target.value);
  };

  handlingSubmit = async event => {
    event.preventDefault(); //event의 디폴트 기능(새로고침 되는 것 등..)
    // var rDate = moment(this.state.run_date).format();
    // rDate = moment(rDate).add(1,'d');
    console.log("user-id: ", this.state.id);
    // var user_id = parseInt(this.state.id);
    var number = 1;
    console.log(number, typeof number);

    let result = await api
      .createPost(
        "notice",
        {
          title: this.state.title,
          body: this.state.body,
          run_date: this.state.run_date,
          writer: this.state.id
        },
        tokenConfig()
      )
      .catch(err => console.log(err));
    console.log("정상적으로 생성됨.", result);
    this.setState({
      title: "",
      content: "",
      run_date: ""
    });
    // this.getPosts()
    // document.location.href = "/notice";
    this.props.history.push("/notice"); //새로고침되지 않고, 리다이렉트해줌.
  };

  render() {
    return (
      <Container maxWidth="lg" className="PostingSection">
        <Paper className="PostingPaper">
          <h2>New Notice</h2>
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
              type="date"
              name="run_date"
              value={this.state.run_date}
              onChange={this.handlingChange}
              required="required"
              placeholder="Run Date"
            />

            <button type="submit">제출</button>
          </form>

          <Link to="/notice">Cancle</Link>
        </Paper>
      </Container>
    );
  }
}

export default NoticeNew;
