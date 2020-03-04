import React, { Component } from "react";
import Button from "@material-ui/core/Button";

import moment from "moment";
import api from "../../../api/CommentAPI";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";

import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider";

export default class CommentView extends Component {
  state = {
    is_update: false,
    update_body: "",
    request_user: ""
  };

  componentWillMount() {
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
      .updateComment(url, comment_id, {
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
      await api.deleteComment(target, id);
      this.props.getComments();
    }
  };

  render() {
    const {
      user_id,
      author_name,
      full_name,
      update_date,
      body,
      comment_id,
      board_id,
      url,
      user_img
    } = this.props;
    var updateDate = moment(update_date).format("MM/DD hh:mm");
    if (this.state.is_update) {
      return (
        <>
          <List>
            <form
              onSubmit={event => {
                this.handlingUpdate(event, url, board_id, user_id, comment_id);
              }}
              className="commentForm"
              style={{ width: "auto" }}
            >
              <ListItem
                alignItems="flex-start"
                style={{ verticalAlign: "middle" }}
              >
                <ListItemAvatar>
                  <Avatar alt="comment-writer" src={user_img} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <TextField
                      id="outlined-name"
                      label="comment"
                      name="update_body"
                      value={this.state.update_body}
                      onChange={this.handlingChange}
                      margin="normal"
                      style={{ width: "70%" }}
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
            <ListItemAvatar>
              <IconButton component={Link} to={`/Mypage/${author_name}`}>
                <Avatar alt="Recomment-writer" src={user_img} />
              </IconButton>
            </ListItemAvatar>
            <ListItemText
              primary={body}
              secondary={
                <>
                  {`${full_name}(${author_name})`}
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
                    Update
                  </Button>
                  <Button
                    color="secondary"
                    size="small"
                    onClick={event => this.handlingDelete(url, comment_id)}
                  >
                    Delete
                  </Button>
                </>
              ) : (
                <></>
              )}
            </ListItemSecondaryAction>
          </ListItem>
          <Divider variant="inset" />
        </List>
      );
    }
  }
}
