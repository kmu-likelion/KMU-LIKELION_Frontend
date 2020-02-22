import React, { Component } from "react";
import api from "../../../api/BoardAPI";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";

export default class CommentView extends Component {
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
      .createPost(url, {
        body: this.state.body,
        board: board_id,
        user_id: this.state.userid,
        parent_id: comment_id
      })
      .then(res => {
        console.log("대댓글생성 성공 !", res.data);
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
