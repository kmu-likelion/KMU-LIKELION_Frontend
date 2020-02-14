import React, { Component } from "react";
import api from "../../../api/api_board";
import api_cal from "../../../api/api_calendar";
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

    await api
      .createPost("notice", {
        title: this.state.title,
        body: this.state.body,
        user_id: this.state.id,
        notice_date: moment(this.state.notice_date).format("YYYY-MM-DD"),
        is_valid_date: this.state.mark_calendar //캘린더표기 여부에 따라 notice_date는 유효한값인지 판단 가능.
      })
      .then(res => {
        console.log("정상처리 : ", res);
        this.createCalendarEvent(res.data.id);
      })
      .catch(err => console.log(err));

    this.props.history.push("/notice");
  };

  createCalendarEvent = async notice_id => {
    await api_cal
      .createCalendar({
        title: this.state.mark_name,
        start_date: moment(this.state.notice_date).format("YYYY-MM-DD"),
        end_date: moment(this.state.notice_date).format("YYYY-MM-DD"),
        contents: this.state.body,
        plan_type: 0,
        notice_id: notice_id
      })
      .then(res => {
        console.log("캘린더이벤트 생성완료 : ", res.data);
      })
      .catch(err => {
        console.log(err);
      });
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
