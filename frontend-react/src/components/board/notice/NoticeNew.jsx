import React, { Component } from "react";
import api from "../../../api/api_board";
import { Link } from "react-router-dom";
// import { Router } from "react-router";

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

class NoticeNew extends Component {
  state = {
    id: "",
    username: "",
    title: "",
    body: "",
    notice_date: new Date(),
    mark_calendar: false,
    mark_name: ""
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

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.value);
  };

  handleCheck = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  handlingSubmit = async event => {
    event.preventDefault();

    if (!this.state.mark_calendar) {
      //달력미표기 시 공지일정은 기록되지 않음.
      await api
        .createPost("notice", {
          title: this.state.title,
          body: this.state.body,
          user_id: this.state.id,
          notice_date: ""
        })
        .then(res => {
          console.log("정상처리(달력 미표기)", res);
        })
        .catch(err => console.log(err));
    } else {
      //달력표기 시 공지일정이 기록됨.
      await api
        .createPost("notice", {
          title: this.state.title,
          body: this.state.body,
          user_id: this.state.id,
          notice_date: moment(this.state.notice_date).format("YYYY-MM-DD")
        })
        .then(res => {
          console.log("정상처리(달력표기)", res);
        })
        .catch(err => console.log(err));
    }

    this.props.history.push("/notice");
  };

  render() {
    return (
      <Container maxWidth="lg">
        <Paper className="PostingSection">
          <h2>공지글 작성</h2>
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
            <TextareaAutosize
              label="Body"
              name="body"
              rowsMin={3}
              rowsMax={7}
              placeholder="Contents"
              value={this.state.body}
              onChange={this.handlingChange}
              margin="normal"
              required
            />
            <hr />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.mark_calendar}
                  onChange={this.handleCheck}
                  name="mark_calendar"
                  color="primary"
                />
              }
              label="달력표시 여부"
            />
            <br />
            <TextField
              label="Mark Name"
              name="mark_name"
              value={this.state.mark_name}
              onChange={this.handlingChange}
              // required
              disabled={!this.state.mark_calendar}
              required={this.state.mark_calendar}
            />
            <br />
            <small>*달력에 표시될 이벤트명</small>
            <br />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                label="Mark Date"
                margin="normal"
                format="yyyy/MM/dd"
                name="notice_date"
                value={this.state.notice_date}
                onChange={event => this.setState({ notice_date: event })}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
                disabled={!this.state.mark_calendar}
                required={this.state.mark_calendar}
              />
            </MuiPickersUtilsProvider>
            <br />
            <Button type="submit">제출</Button>
          </form>

          <Link to="/notice">Cancle</Link>
        </Paper>
      </Container>
    );
  }
}

export default NoticeNew;
