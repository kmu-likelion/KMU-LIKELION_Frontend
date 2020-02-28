import React, { Component } from "react";
import api from "../../../api/GroupAPI";
import { Link } from "react-router-dom";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

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
    console.log("group Id" ,this.props.match.params.group)
    this.getGroup();
  }

  async getGroup() {
    await api
      .getGroupWithName(this.props.match.params.group)
      .then(res => {
        const data = res.data;
        console.log(data)
        console.log(data[0].name)
        console.log(data[0].introduction)
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
    // console.log("user-id: ", this.state.id);
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
          <Typography component="h1" variant="h4">
            그룹 수정
          </Typography>
          <form onSubmit={this.handlingSubmit} className="PostingForm">
            <Grid container spacing={2} className={classes.formContent}>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="Group Name"
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
                  // label="Introduction"
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
