import React, { Component } from "react";

import api from "../../../api/CommentAPI";

import {
  Grid,
  Button,
  Typography,
  TextareaAutosize,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar
} from "@material-ui/core";

export default class AnswerNew extends Component {
  state = {
    userid: "",
    username: "",
    userImg: "",
    body: "",
    board_id: ""
  };

  UNSAFE_componentWillMount() {
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
      <form onSubmit={event => this.handlingSubmit(event, url, board_id)}>
        <Grid container spacing={2}>          
            <List style={{width: "100%"}}>
              <Grid item xs={12} sm={12}>
                <ListItem>
                  <ListItemAvatar
                    style={{ display: "flex" }}
                  >
                    <Avatar
                      alt="answer-author"
                      src={this.state.userImg}
                    />
                  </ListItemAvatar>
                  <ListItemText>
                    <Typography variant="body1">
                      {this.state.username}
                    </Typography> 
                  </ListItemText>
                </ListItem>

                <ListItem
                  alignItems="center"
                >
                  <ListItemText
                    primary={
                      <TextareaAutosize
                        name="body"
                        rowsMin={3}
                        rowsMax={7}
                        placeholder="Answer"
                        value={this.state.body}
                        onChange={this.handlingChange}
                        style={{ width: "100%" }}
                        required
                      />
                    }
                  />
                </ListItem>
              </Grid>
              <ListItem style={{width: "auto"}}>
                <Grid item sm={4}></Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    답변작성
                  </Button>
                  </Grid>
                <Grid item sm={4}></Grid>
              </ListItem>
            </List>
          </Grid>        
        </form>
        <hr/>
      </>
    );
  }
}
