import React, { Component } from "react";
import Button from "@material-ui/core/Button";
// import CardActions from '@material-ui/core/CardActions';
import api from "../../api/api_board";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

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
        <>
          <img src={user_img} alt="" />
          <Link to={`/Mypage/${user_id}`}>{author_name}</Link>
          <br />
          <span>{body}</span>
          <br />
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
              onClick={event => this.props.handlingDelete(url, comment_id)}
            >
              Delete
            </Button>
          </>

          <hr />
        </>
      );
    }
  }
}
