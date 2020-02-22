import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import api from "../../../api/BoardAPI";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider";

export default class CommentView extends Component {
  state = {
    is_update: false,
    update_body: "",
    request_user: ""
  };

  componentDidMount() {
    const user_id = window.sessionStorage.getItem("id");
    console.log("현재 유저 아이디 : ", user_id);
    this.setState({
      request_user: user_id
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
    if (window.confirm("대댓글을 삭제하시겠습니까?") == true) {
      await api.deletePost(target, id);
      this.props.getComments();
    }
  };

  render() {
    const {
      user_id,
      author_name,
      body,
      comment_id,
      board_id,
      url,
      user_img
    } = this.props;

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
              제출
            </Button>
          </form>
          <hr />
        </>
      );
    } else {
      return (
        <List component="nav" aria-label="contacts">
          <ListItem button component={Link} to={`/Mypage/${user_id}`}>
            <ListItemAvatar>
              <Avatar alt="Recomment-writer" src={user_img} />
            </ListItemAvatar>
            <ListItemText primary={body} secondary={author_name} />
            <ListItemSecondaryAction>
              <Button
                color="primary"
                size="small"
                onClick={event =>
                  this.setState({ is_update: true, update_body: body })
                }
              >
                Update
              </Button>
              <Button
                color="secondary"
                size="small"
                onClick={event => this.handlingDelete(url, comment_id)}
              >
                Delete
              </Button>
              {/* <small>{pubDate}</small> */}
            </ListItemSecondaryAction>
          </ListItem>
          <Divider variant="inset" />
        </List>
      );
    }
  }
}
