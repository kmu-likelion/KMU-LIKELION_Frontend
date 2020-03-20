import React, { Component } from "react";
import api from "../../../api/CommentAPI";

import { Grid, Button, TextField, Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";

export default class RecommentView extends Component {
  state = {
    userid: "",
    username: "",
    userImg: "",
    body: "",
    board_id: ""
  };

  componentDidMount() {
    this.setState({
      userid: window.sessionStorage.getItem("id"),
      username: window.sessionStorage.getItem("username"),
      userImg: window.sessionStorage.getItem("user_img")
    });
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handlingSubmit = async (event, url, board_id, comment_id) => {
    event.preventDefault();

    await api
      .createRecomment(url, comment_id, {
        body: this.state.body,
        board: board_id,
        user_id: this.state.userid,
        parent_id: String(comment_id)
      })
      .then(res => {
        this.setState({
          body: ""
        });
        this.props.getComments();
        this.props.closeRecomment();
      });
  };

  render() {
    const { board_id, url, comment_id } = this.props;
    return (
      <Grid container spacing={2}>
        <Grid item xs={10} sm={8}>
          <List>
            <form
              onSubmit={event =>
                this.handlingSubmit(event, url, board_id, comment_id)
              }
              className="commentForm"
              style={{ width: "auto" }}
            >
              <ListItem
                alignItems="flex-start"
                style={{ verticalAlign: "middle" }}
              >
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={this.state.userImg} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <TextField
                      id="outlined-name"
                      label="comment"
                      name="body"
                      value={this.state.body}
                      onChange={this.handlingChange}
                      // margin="normal"
                      style={{ width: "100%" }}
                    />
                  }
                />

                <Button type="submit" variant="contained" color="primary">
                  작성
                </Button>
              </ListItem>
            </form>
          </List>
        </Grid>
        <Grid item xs={2} sm={4}></Grid>
      </Grid>
    );
  }
}
