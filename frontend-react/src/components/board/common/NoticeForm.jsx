import React, { Component } from "react";
import api from "../../../api/BoardAPI";
import { Link, Redirect } from "react-router-dom";
import Editor from "../../Editor";

// material-ui
import moment from "moment";
import TextField from "@material-ui/core/TextField";
// import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DateFnsUtils from "@date-io/date-fns";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
// import { isThursday } from "date-fns";

const useStyles = theme => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(2)
  },
  formContent: {
    // alignItems: "center"
  },
  textField: {
    width: "25%",
    paddingBottom: "1.5rem"
  },
  editor: {
    width: "100%",
    height: "100%"
  },
  editorWrap: {
    // overflow: "auto",
    minHeight: "300px",
    height: "auto",
    overflow: "hidden"
    // display: "flex",
    // flexWrap: "wrap"
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    maxWidth: "40%"
  },
  submitWrap: {
    textAlign: "center",
    alignItems: "center"
  }
});

class NoticeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      username: "",
      title: "",
      body: "",
      noticeDate: new Date(),
      isRecorded: false,
      eventName: "",
      endSubmit: false,

      isEdit: false,
      postId: ""
    };
  }

  componentDidMount() {
    if (window.sessionStorage.getItem("id")) {
      this.setState({
        userId: window.sessionStorage.getItem("id"),
        username: window.sessionStorage.getItem("username")
      });
    }

    if (this.props.isEdit) {
      this.getPostInfo();
    }
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCheck = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  handlingEditorChange = ({ html, text }) => {
    this.setState({ body: text });
  };

  getPostInfo = async () => {
    let post_id = this.props.editId;
    await api.getPost("notice", post_id).then(res => {
      console.log(res.data);
      this.setState({
        title: res.data.title,
        body: res.data.body,
        noticeDate: res.data.notice_date,
        isRecorded: res.data.is_recorded,
        eventName: res.data.event_name
      });
    });
  };

  handlingSubmit = async event => {
    event.preventDefault();

    switch (this.props.isEdit) {
      case true: //edit function
        await api
          .updatePost("notice", this.props.editId, {
            title: this.state.title,
            body: this.state.body,
            user_id: this.state.id,
            notice_date: moment(this.state.noticeDate).format("YYYY-MM-DD"),
            is_recorded: this.state.isRecorded, //캘린더표기 여부에 따라 notice_date는 유효한값인지 판단 가능.
            event_name: this.state.eventName
          })
          .then(res => {
            console.log("정상적으로 수정됨. ", res);
            this.setState({
              endSubmit: true
            });
          })
          .catch(err => console.log(err));
        break;
      case false: //create function
        await api
          .createPost("notice", {
            title: this.state.title,
            body: this.state.body,
            user_id: this.state.userId,
            notice_date: moment(this.state.noticeDate).format("YYYY-MM-DD"),
            is_recorded: this.state.isRecorded, //캘린더표기 여부에 따라 notice_date는 유효한값인지 판단 가능.
            event_name: this.state.eventName
          })
          .then(res => {
            console.log("정상적으로 생성됨. ", res);
            this.setState({
              endSubmit: true
            });
          })
          .catch(err => console.log(err));
        break;
    }
  };

  render() {
    const { classes } = this.props;
    if (this.state.endSubmit) {
      return <Redirect to="/notice" />;
    }
    return (
      <Grid container alignItems="stretch">
        <Grid item xs={12} sm={12} className={classes.formContent}>
          <form onSubmit={this.handlingSubmit}>
            <TextField
              label="Title"
              name="title"
              value={this.state.title}
              onChange={this.handlingChange}
              margin="normal"
              className={classes.textField}
              required
            />
            <br />
            {/* <TextareaAutosize
              label="Body"
              name="body"
              rowsMin={3}
              rowsMax={7}
              placeholder="Contents"
              value={this.state.body}
              onChange={this.handlingChange}
              margin="normal"
              required
            /> */}
            <div className={classes.editorWrap}>
              <Editor
                value={this.state.body}
                handlingChange={this.handlingEditorChange}
                className={classes.editor}
              />
            </div>

            <hr />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.isRecorded}
                  onChange={this.handleCheck}
                  name="isRecorded"
                  color="primary"
                />
              }
              label="달력기록 여부"
            />
            <br />
            <TextField
              label="Eventname"
              name="eventName"
              value={this.state.eventName}
              onChange={this.handlingChange}
              // required
              disabled={!this.state.isRecorded}
              required={this.state.isRecorded}
            />
            <br />
            <small>*달력에 표시될 이벤트명</small>
            <br />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                label="Event Date"
                margin="normal"
                format="yyyy/MM/dd"
                name="noticeDate"
                value={this.state.noticeDate}
                onChange={event => this.setState({ noticeDate: event })}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
                disabled={!this.state.isRecorded}
                required={this.state.isRecorded}
              />
            </MuiPickersUtilsProvider>
            <br />
            <div className={classes.submitWrap}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                작성
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(NoticeForm);
