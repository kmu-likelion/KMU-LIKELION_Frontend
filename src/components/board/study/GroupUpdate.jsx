import React, { Component } from "react";
import api from "../../../api/GroupAPI";
import { Link } from "react-router-dom";

import {Container, Paper, TextField, TextareaAutosize, Button, withStyles, Grid, Typography } from "@material-ui/core";

const useStyles = theme => ({

  formContent: {
    alignItems: "center",
    textAlign: "center",
    paddingTop : 25,
  },
  textarea: {
    width: "100%",
    marginTop: 20
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "50%"
  },
});

class GroupUpdate extends Component {
  state = {
    groupId: "",
    title: "",
    introduction: "",
    userName: "",
    userId: ""
  };

  componentDidMount() {
    if (window.sessionStorage.getItem("id")) {
      this.setState({
        userId: window.sessionStorage.getItem("id"),
        userName: window.sessionStorage.getItem("username")
      });
    }
    this.getGroup();
  }

  async getGroup() {
    await api
      .getGroupWithName(this.props.match.params.group)
      .then(res => {
        const data = res.data;
        console.log(data)
        this.setState({groupId:data[0].id})
        this.setState({title:data[0].name})
        this.setState({introduction:data[0].introduction})
      })
      .catch(err => console.log(err));
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handlingSubmit = async event => {
    event.preventDefault();

    await api
      .updateGroup(this.state.groupId,{
        name: this.state.title,
        introduction: this.state.introduction
      })
      .then(async data => {
        console.log("정상적으로 수정됨.");
      })
      .catch(err => console.log(err));

    this.props.history.push("/study"); //새로고침되지 않고, 리다이렉트해줌.
  };

  render() {
    const { classes } = this.props;
    return (
      <Container maxWidth="lg" className="main-container">
        <Paper className="Paper">
          <form onSubmit={this.handlingSubmit} className={classes.formContent}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={1}></Grid>
              <Grid item xs={12} sm={10}>
                <Typography variant="h4" style={{float:'left', paddingBottom: 15}}>
                  그룹 수정
                </Typography>

                <TextField
                  fullWidth
                  label="Group Name"
                  name="title"
                  value={this.state.title}
                  onChange={this.handlingChange}
                  margin="normal"
                  required
                />
                <TextareaAutosize
                  className={classes.textarea}
                  name="introduction"
                  rowsMin={3}
                  rowsMax={7}
                  placeholder="introduction"
                  value={this.state.introduction}
                  onChange={this.handlingChange}
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={1}></Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              수정
            </Button>
          </form>

          <Link to="/study">Cancel</Link>
        </Paper>
      </Container>
    );
  }
}

export default withStyles(useStyles)(GroupUpdate);
