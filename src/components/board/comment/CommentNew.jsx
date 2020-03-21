import React, { Component } from "react";

import api from "../../../api/CommentAPI";

import {
  Grid,
  Button,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar
} from "@material-ui/core";

export default class CommentView extends Component {
  state = {
    userid: "",
    username: "",
    userImg: "",
    body: "",
    commentId: ""
  };

  UNSAFE_componentWillMount() {
    this.setState({
      userid: window.sessionStorage.getItem("id"),
      username: window.sessionStorage.getItem("username"),
      userImg: window.sessionStorage.getItem("user_img"),
      body: this.props.body,
      commentId: this.props.comment_id
    });
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handlingSubmit = async (event, url, board_id) => {
    event.preventDefault();

    if (!this.props.editFlag) {
      await api
        .createComment(url, {
          body: this.state.body,
          board: board_id,
          user_id: this.state.userid,
          parent_id: null
        })
        .then(res => {
          this.setState({
            body: ""
          });
          this.props.getComments();
        });
    } else {
      await api
        .updateComment(url, this.state.commentId, {
          body: this.state.body,
          user_id: this.state.userid,
          board: board_id
        })
        .then(res => {
          // console.log(res);
          this.props.getComments();
          this.props.flagChange();
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    const { board_id, url } = this.props;
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={10}>
            <List>
              <form
                onSubmit={event => this.handlingSubmit(event, url, board_id)}
                className="commentForm"
                style={{ width: "auto" }}
              >
                <ListItem
                  alignItems="flex-start"
                  style={{ verticalAlign: "middle" }}
                >
                  <ListItemAvatar style={{ paddingTop: 20 }}>
                    <Avatar alt="User image" src={this.state.userImg} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <TextField
                        label="comment"
                        name="body"
                        value={this.state.body || ""}
                        onChange={this.handlingChange}
                        margin="normal"
                        style={{ width: "100%" }}
                        required
                      />
                    }
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 30, marginLeft: 10 }}
                  >
                    {!this.props.editFlag ? <>작성</> : <>수정</>}
                  </Button>
                </ListItem>
              </form>
            </List>
          </Grid>
        </Grid>
      </>
    );
  }
}
