import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/AdmissionAPI";


import { Typography, Paper, Avatar, Button, TextareaAutosize, Divider, IconButton } from "@material-ui/core";
import {List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

export default class CommentView extends Component {
  state = {
    is_update: false,
    update_body: "",
    update_score: "",
    request_user: ""
  };

  componentDidMount() {
    this.setState({
      request_user: window.sessionStorage.getItem("id")
    });
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handlingUpdate = async (event, application_id, user_id, comment_id) => {
    event.preventDefault();
    await api
      .updateEvaluation(comment_id, {
        user_id: user_id,
        application_id: application_id,
        body: this.state.update_body,
        score: this.state.update_score
      })
      .then(res => {
        this.setState({
          is_update: false
        });
        this.props.getEvaluations();
      })
      .catch(err => console.log(err));
  };

  handlingDelete = async id => {
    if (window.confirm("댓글을 삭제하시겠습니까?") === true) {
      await api.deleteEvaluation(id);
      this.props.getEvaluations();
    }
  };

  render() {
    const {
      user_id,
      author_name,
      body,
      comment_id,
      score,
      application_id,
      user_img
    } = this.props;

    if (this.state.is_update) {
      return (
        <>
          <List>
            <form
              onSubmit={event => {
                this.handlingUpdate(event, application_id, user_id, comment_id);
              }}
              style={{ width: "auto" }}
            >
              <ListItem
                alignItems="flex-start"
                style={{ verticalAlign: "middle" }}
              >
                <ListItemAvatar>
                  <Avatar alt="comment-writer" src={user_img} />
                </ListItemAvatar>
                <ListItemSecondaryAction>
                  <Rating
                    name="update_score"
                    defaultValue={score}
                    value={this.state.update_score}
                    onChange={this.handlingChange}
                    size="large"
                  />
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem alignItems="center" style={{ verticalAlign: "middle" }}>
                <ListItemText
                  primary={
                    <TextareaAutosize
                      name="update_body"
                      rowsMin={3}
                      rowsMax={7}
                      placeholder="comment"
                      value={this.state.update_body}
                      onChange={this.handlingChange}
                      style={{ width: "100%" }}
                      required
                    />
                  }
                />

                <Button
                  color="secondary"
                  size="small"
                  type="submit"
                  variant="contained"
                >
                  수정
                </Button>
              </ListItem>
            </form>
            <Divider variant="inset" />
          </List>
        </>
      );
    } else {
      return (
        <List component="nav" aria-label="contacts">
          <ListItem>
            <ListItemAvatar
              style={{
                display: "flex",
                marginRight: 25,
                verticalAlign: "middle"
              }}
            >
              <IconButton
                component={Link}
                to={`/Mypage/${author_name}`}
                style={{ marginRight: 10 }}
              >
                <Avatar alt="comment-writer" src={user_img} />
              </IconButton>
              <Typography variant="h6" style={{ paddingTop: 15 }}>
                {author_name}
              </Typography>
            </ListItemAvatar>

            <Rating name="read-only" value={score} readOnly />
            <ListItemSecondaryAction>
              <Button
                color="primary"
                size="small"
                onClick={event =>
                  this.setState({
                    is_update: true,
                    update_body: body,
                    update_score: score
                  })
                }
              >
                Update
              </Button>
              <Button
                color="secondary"
                size="small"
                onClick={event => this.handlingDelete(comment_id)}
              >
                Delete
              </Button>
              {/* <small>{pubDate}</small> */}
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem
            alignItems="center"
            style={{ verticalAlign: "middle", alignItems: "center" }}
          >
            <Paper
              elevation={0}
              style={{
                padding: 30,
                textAlign: "center",
                width: "80%"
              }}
            >
              <ListItemText
                primary={<Typography component="pre">{body}</Typography>}
              />
            </Paper>
          </ListItem>
          <br />
          <Divider />
        </List>
      );
    }
  }
}
