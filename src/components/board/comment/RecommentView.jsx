import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/BoardAPI";
import moment from "moment";

import {TextField, Typography, Button, Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from "@material-ui/core";

export default class RecommentView extends Component {
  state = {
    is_update: false,
    update_body: "",
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

  handlingUpdate = async (event, url, board_id, user_id, comment_id) => {
    event.preventDefault();
    await api
      .updatePost(url, comment_id, {
        body: this.state.update_body,
        user_id: user_id,
        board: board_id
      })
      .then(res => {
        console.log(res);
        this.setState({ is_update: false });
        this.props.getComments();
      });
  };

  handlingDelete = async (target, id) => {
    if (window.confirm("댓글을 삭제하시겠습니까?") === true) {
      await api.deletePost(target, id);
      this.props.getComments();
    }
  };

  render() {
    const {
      user_id,
      author,
      update_date,
      body,
      comment_id,
      board_id,
      url,
    } = this.props;
    const updateDate = moment(update_date).format("MM/DD hh:mm");

    if (this.state.is_update) {
      return (
        <>
          <form
            onSubmit={event => {
              this.handlingUpdate(event, url, board_id, user_id, comment_id);
            }}
            className="commentForm"
          >
            <TextField
              id="outlined-name"
              label="comment"
              name="update_body"
              value={this.state.update_body}
              onChange={this.handlingChange}
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              수정
            </Button>
          </form>
          <hr />
        </>
      );
    } else {
      return (
        <List component="nav" aria-label="contacts">
          <ListItem>
            <ListItemAvatar>
              <IconButton component={Link} to={`/Mypage/${author.username}`}>
                <Avatar alt="recomment-author" src={author.img} />
              </IconButton>
            </ListItemAvatar>
            <ListItemText
              primary={body}
              secondary={
                <>
                  {`${author.name}(${author.username})`}
                  <Typography variant="caption"> {updateDate}</Typography>
                </>
              }
            />
            <ListItemSecondaryAction>
              {user_id === Number(window.sessionStorage.getItem("id")) ? (
                <>
                  <Button
                    color="primary"
                    size="small"
                    onClick={event =>
                      this.setState({ is_update: true, update_body: body })
                    }
                  >
                    수정
                  </Button>
                  <Button
                    color="secondary"
                    size="small"
                    onClick={event => this.handlingDelete(url, comment_id)}
                  >
                    삭제
                  </Button>
                </>
              ) : (
                <></>
              )}

              {/* <small>{pubDate}</small> */}
            </ListItemSecondaryAction>
          </ListItem>
          <Divider variant="inset" />
        </List>
      );
    }
  }
}
