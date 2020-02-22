import React, { Component } from "react";
import api from "../../../api/BoardAPI";
// import api_cal from "../../../api/api_calendar";
import { Link } from "react-router-dom";

// material-ui
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

import Editor from "../../Editor";

class CareerNew extends Component {
  state = {
    id: "",
    username: "",
    title: "",
    body: "",
    link: "",
  };

  componentDidMount() {
    console.log("New ComponentDidMount");
    const _id = window.sessionStorage.getItem("id");
    const _user = window.sessionStorage.getItem("username");
    if (_id) {
      this.setState({ id: _id, username: _user });
      // console.log("접근모드 : 로그인 상태");
    } else {
      // console.log("접근모드 : 로그아웃 상태");
    }
  }

  handlingChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handlingEditorChange = ({ html, text }) => {
    this.setState({ body: text });
  }

  handleCheck = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  handlingSubmit = async event => {
    event.preventDefault();

    await api
      .createPost("career", {
        title: this.state.title,
        body: this.state.body,
        user_id: this.state.id,
        link: this.state.link,
      })
      .then(res => {
        console.log("정상처리 : ", res);
        // this.createCalendarEvent(res.data.id);
      })
      .catch(err => console.log(err));

    this.props.history.push("/career");
  };

  render() {
    return (
      <Container maxWidth="lg">
        <Paper className="PostingSection">
          <h2>Career 작성</h2>
          <form onSubmit={this.handlingSubmit}>
            <TextField
              label="Title"
              name="title"
              value={this.state.title}
              onChange={this.handlingChange}
              margin="normal"
              required
            />
            <br />
            <TextField
              label="관련된 URL"
              name="link"
              value={this.state.link}
              onChange={this.handlingChange}
              margin="normal"
              placeholder="https://github.com/example/project"
            />
            <br />
            <Editor handlingChange={this.handlingEditorChange} />
            <hr />
            <Button type="submit">제출</Button>
          </form>

          <Link to="/career">Cancel</Link>
        </Paper>
      </Container>
    );
  }
}

export default CareerNew;
