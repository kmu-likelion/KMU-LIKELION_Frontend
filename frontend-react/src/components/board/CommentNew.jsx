import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import api from "../../api/api_board";
import TextField from "@material-ui/core/TextField";

export default class CommentView extends Component {
  state = {
    userid: "",
    username: "",
    body: "",
    board_id: ""
  };

  componentDidMount() {
    let user_id = window.sessionStorage.getItem("id");
    let username = window.sessionStorage.getItem("username");
    this.setState({
      userid: user_id,
      username: username
    });
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handlingSubmit = async (event, board_id) => {
    event.preventDefault();

    await api
      .createPost("QnA_comment", {
        body: this.state.body,
        board: board_id,
        user_id: this.state.userid
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
    const { board_id } = this.props;
    return (
      <>
        <Card className={"card"}>
          <CardContent>
            <form
              onSubmit={event => this.handlingSubmit(event, board_id)}
              className="commentForm"
            >
              <span>{this.state.username}</span>
              <TextField
                id="outlined-name"
                label="comment"
                name="body"
                value={this.state.body}
                onChange={this.handlingChange}
                margin="normal"
              />
              <Button type="submit" variant="contained" color="primary">
                작성
              </Button>
            </form>
          </CardContent>
        </Card>
      </>
    );
  }
}
