import React, { Component } from "react";
import api from "../../../api/api_board";
import { Link } from "react-router-dom";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class StudyNew extends Component {
  state = {
    title: "",
    body: "",
    personnel: "",
    user_id: "",
    username: "",
    group_name: "",
    group_id: "",
    study_type: "0",
    open: false
  };

  componentDidMount() {
    console.log("New ComponentDidMount");
    const _id = window.sessionStorage.getItem("id");
    const _user = window.sessionStorage.getItem("username");
    if (_id) {
      this.setState({ user_id: _id, username: _user });
      console.log("접근모드 : 로그인 상태");
    } else {
      console.log("접근모드 : 로그아웃 상태");
    }
    this.setState({
      group_name: this.props.location.state.group_name,
      group_id: this.props.location.state.group_id
    });
    // this._getPost(this.props.match.params.id);
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handlingSubmit = async event => {
    event.preventDefault();
    console.log("user-id: ", this.state.user_id);
    let result = await api.createPost("study", {
      title: this.state.title,
      body: this.state.body,
      study_type: this.state.study_type,
      group_id: this.state.group_id,
      user_id: this.state.user_id
    });
    console.log("정상적으로 생성됨.", result);
    this.setState({ title: "", body: "" });
    // this.getPosts()
    //document.location.href = "/QnA";
    this.props.history.push(`/study/${this.props.match.params.group}`);
  };

  render() {
    return (
      <Container maxWidth="lg" className="PostingSection">
        <Paper className="PostingPaper">
          <h2>[{this.state.group_name}] 새 글 작성</h2>
          <form onSubmit={this.handlingSubmit} className="PostingForm">
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={this.state.open}
              onClose={e => this.setState({ open: false })}
              name="study_type"
              onOpen={e => this.setState({ open: true })}
              value={this.state.study_type}
              onChange={e => this.setState({ study_type: e.target.value })}
            >
              <MenuItem value={0}>공식모임</MenuItem>
              <MenuItem value={1}>정보공유</MenuItem>
              <MenuItem value={2}>기타</MenuItem>
            </Select>
            <br />
            <TextField
              id="standard-basic"
              name="title"
              label="title"
              value={this.state.title}
              onChange={this.handlingChange}
              required
            />
            <br />
            <TextField
              id="standard-basic"
              label="body"
              name="body"
              value={this.state.body}
              onChange={this.handlingChange}
              multiline
              rows="4"
              required
            />
            <br />

            <br />
            <Button variant="contained" color="primary" type="submit">
              작성
            </Button>
            <Link to="/study">Cancel</Link>
          </form>
          <br />
        </Paper>
      </Container>
    );
  }
}

export default StudyNew;
