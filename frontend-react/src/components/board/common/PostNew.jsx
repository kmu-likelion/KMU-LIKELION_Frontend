import React, { Component } from "react";
import api from "../../../api/BoardAPI";
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

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CreateIcon from "@material-ui/icons/Create";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%",
    alignItems: "center",
    marginTop: theme.spacing(5)
  },
  formContent: {
    alignItems: "center"
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
  //   center: {
  //     display: "flex",
  //     flexDirection: "column",
  //     alignItems: "center"
  //   }
});

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
    }
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
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
      })
      .catch(err => console.log(err));

    this.props.history.push("/notice");
  };

  render() {
    const { classes } = this.props;

    return (
      <Container maxWidth="xs">
        <Paper className={classes.paper} elevation={0}>
          <Avatar className={classes.avatar}>
            <CreateIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Your Post!
          </Typography>
          <form onSubmit={this.handlingSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={1} sm={1}></Grid>
              <Grid item xs={10} sm={10} className={classes.formContent}>
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
              </Grid>
              <Grid item xs={1} sm={1}></Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              작성
            </Button>
          </form>
          <Link to="/notice">Cancel</Link>
        </Paper>
      </Container>
    );
  }
}

export default withStyles(useStyles)(NoticeNew);
