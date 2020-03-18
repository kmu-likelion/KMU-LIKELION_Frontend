import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/BoardAPI";
import Editor from "../../Editor";

import {Grid, Container, Paper, MenuItem, Select, Button, TextField, withStyles, Avatar, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    height: "100%",
    width: "100%"
  },
  editIcon: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  textField: {
    width: "25%",
    display: "flex",
    paddingBottom: "1rem"
  },
  editor: {
    width: "100%",
    height: "100%",
    overflow: "auto"
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

    this.setState({ 
      user_id: window.sessionStorage.getItem("id"),
      username: window.sessionStorage.getItem("username"),
      group_name: this.props.location.state.group_name,
      group_id: this.props.location.state.group_id
    });

  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handlingEditorChange = ({ html, text }) => {
    this.setState({ body: text });
  };

  handlingSubmit = async event => {
    event.preventDefault();
    console.log("user-id: ", this.state.user_id);
    await api.createPost("study", {
      title: this.state.title,
      body: this.state.body,
      study_type: this.state.study_type,
      group_id: this.state.group_id,
      user_id: this.state.user_id
    }).then( res => {

      // console.log(res.data);
      this.setState({ title: "", body: "" });
      this.props.history.push(`/study/${this.props.match.params.group}`);

    }).catch(err => {console.log(err)});
  };

  render() {
    const { classes } = this.props;

    return (
      <Container maxWidth="lg" className="main-container">
        <Paper className={classes.paper} elevation={0}>
          <Avatar className={classes.editIcon}>
            <EditIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            [{this.state.group_name}] Create Your Post!
          </Typography>
          <Grid container>
            <Grid item xs={1} sm={1}></Grid>
            <Grid item xs={10} sm={10}>
              <form onSubmit={this.handlingSubmit} className={classes.form}>
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
                  <MenuItem value={0}>공지사항</MenuItem>
                  <MenuItem value={1}>스터디</MenuItem>
                </Select>
                <br /> <br />
                <TextField
                  name="title"
                  label="title"
                  value={this.state.title}
                  onChange={this.handlingChange}
                  required
                />
                <br />
                <br />
                <Editor
                  value={this.state.body}
                  name="body"
                  handlingChange={this.handlingEditorChange}
                  className={classes.editor}
                />
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
                <Link to="/study">Cancel</Link>
              </form>
            </Grid>
            <Grid item xs={1} sm={1}></Grid>

            <br />
          </Grid>
        </Paper>
      </Container>
    );
  }
}

export default withStyles(useStyles)(StudyNew);
