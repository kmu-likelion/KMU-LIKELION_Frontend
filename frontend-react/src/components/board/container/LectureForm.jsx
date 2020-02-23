import React, { Component } from "react";
import api from "../../../api/BoardAPI";

// material-ui
// import moment from "moment";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = theme => ({
  form: {
    width: "100%",
    alignItems: "center",
    marginTop: theme.spacing(5)
  },
  selectBox: {
    minWidth: 100,
    textAlign: "center"
  },
  formContent: {
    alignItems: "center"
  },
  textarea: {
    width: "100%"
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class LectureForm extends Component {
  state = {
    lecture_type: 0,
    id: "",
    username: "",
    title: "",
    body: "",
    open: false
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
        user_id: this.state.id
      })
      .then(res => {
        console.log("정상처리됨 : ", res);
      })
      .catch(err => console.log(err));

    this.props.history.push("/notice");
  };

  render() {
    const { classes } = this.props;

    return (
      <form onSubmit={this.handlingSubmit} className={classes.form}>
        <Grid container spacing={2} className={classes.formContent}>
          <Grid item xs={12} sm={12}>
            <Select
              className={classes.selectBox}
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={this.state.open}
              onClose={e => this.setState({ open: false })}
              name="study_type"
              onOpen={e => this.setState({ open: true })}
              value={this.state.lecture_type}
              onChange={e => this.setState({ lecture_type: e.target.value })}
            >
              <MenuItem value={0}>정규세션</MenuItem>
              <MenuItem value={1}>과제</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={this.state.title}
              onChange={this.handlingChange}
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextareaAutosize
              className={classes.textarea}
              fullWidth
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
          </Grid>
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
    );
  }
}

export default withStyles(useStyles)(LectureForm);
