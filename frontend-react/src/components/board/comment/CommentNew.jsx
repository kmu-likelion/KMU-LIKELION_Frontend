import React, { Component } from "react";

import api from "../../../api/CommentAPI";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

export default class CommentView extends Component {
  state = {
    userid: "",
    username: "",
    userImg: "",
    body: "",
    board_id: ""
  };

  componentWillMount() {
    this.setState({
      userid: window.sessionStorage.getItem("id"),
      username: window.sessionStorage.getItem("username"),
      userImg: window.sessionStorage.getItem("user_img")
    });
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handlingSubmit = async (event, url, board_id) => {
    event.preventDefault();

    await api
      .createComment(url, {
        body: this.state.body,
        board: board_id,
        user_id: this.state.userid,
        parent_id: null
      })
      .then(res => {
        console.log("댓글생성 성공 !", res.data);
        this.setState({
          body: ""
        });
        this.props.getComments();
      });
  };

  render() {
    const { board_id, url } = this.props;
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={10} sm={10}>
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
                  <ListItemAvatar>
                    <Avatar alt="User image" src={this.state.userImg} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <TextField
                        label="comment"
                        name="body"
                        value={this.state.body}
                        onChange={this.handlingChange}
                        margin="normal"
                        style={{ width: "100%" }}
                        required
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
        </Grid>
      </>
    );
  }
}
