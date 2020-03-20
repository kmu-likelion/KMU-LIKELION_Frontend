import React, { Component } from "react";

import api from "../../../api/AdmissionAPI";

import {Typography, Grid, Button, TextareaAutosize, Avatar} from "@material-ui/core";
import {List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

export default class CommentView extends Component {
  state = {
    userId: "",
    username: "",
    userImg: "",
    body: "",
    score: "3",
    board_id: ""
  };

  componentDidMount() {
    // console.log("현재 유저아이디", window.sessionStorage.getItem("id"));
    this.setState({
      userId: window.sessionStorage.getItem("id"),
      username: window.sessionStorage.getItem("username"),
      userImg: window.sessionStorage.getItem("user_img")
    });
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handlingSubmit = async event => {
    event.preventDefault();

    await api
      .createEvaluation({
        user_id: Number(this.state.userId),
        application_id: this.props.applicationId,
        body: this.state.body,
        score: Number(this.state.score)
      })
      .then(res => {
        // console.log("성공적으로 평가생성됨.", res.data);
        this.setState({
          body: "",
          score: "3"
        });
        this.props.getEvaluations();
      });
  };

  render() {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item sm={3}></Grid>
          <Grid item xs={12} sm={6}>
            <List>
              <form
                onSubmit={event => this.handlingSubmit(event)}
                style={{ width: "auto" }}
              >
                <ListItem
                  alignItems="flex-start"
                  style={{ verticalAlign: "middle" }}
                >
                  <ListItemAvatar style={{ display: "flex", marginRight: 15 }}>
                    <Avatar
                      alt="comment-writer"
                      src={this.state.userImg}
                      style={{ marginRight: 10 }}
                    />
                    <Typography variant="h6">{this.state.username}</Typography>
                  </ListItemAvatar>
                  <ListItemSecondaryAction>
                    <Rating
                      name="score"
                      value={this.state.score}
                      onChange={this.handlingChange}
                      size="large"
                    />
                  </ListItemSecondaryAction>
                </ListItem>

                <ListItem
                  alignItems="center"
                  style={{ verticalAlign: "middle" }}
                >
                  <ListItemText
                    primary={
                      <TextareaAutosize
                        name="body"
                        rowsMin={3}
                        rowsMax={7}
                        placeholder="comment"
                        value={this.state.body}
                        onChange={this.handlingChange}
                        style={{ width: "100%" }}
                        required
                      />
                    }
                  />
                </ListItem>
                <ListItem
                  alignItems="center"
                  style={{ verticalAlign: "middle" }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    평가하기
                  </Button>
                </ListItem>
              </form>
            </List>
          </Grid>
          <Grid item sm={3}></Grid>
        </Grid>
      </>
    );
  }
}
