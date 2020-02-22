import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import api from "../../../api/BoardAPI";
// import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
// import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import moment from "moment";

export default class AnswerView extends Component {
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
    if (window.confirm("답변을 삭제하시겠습니까?") == true) {
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
      user_img,
      pub_date
    } = this.props;

    const pubDate = moment(pub_date).format("YY-MM-DD HH:MM");

    if (this.state.is_update) {
      return (
        <>
          <form
            onSubmit={event => {
              this.handlingUpdate(event, url, board_id, user_id, comment_id);
            }}
            className="answerForm"
          >
            <Card className="answer-card">
              <CardHeader
                avatar={
                  <Link to={`/Mypage/${user_id}`}>
                    <Avatar
                      src={user_img}
                      alt="User-Image"
                      aria-label="recipe"
                    />
                  </Link>
                }
                title={author_name}
                subheader="September 14, 2016"
              />
              <CardContent>
                <TextareaAutosize
                  name="update_body"
                  rowsMin={3}
                  rowsMax={7}
                  placeholder="body"
                  value={this.state.update_body}
                  onChange={this.handlingChange}
                  margin="normal"
                  required
                />
              </CardContent>
              <CardActions>
                <Button type="submit" variant="contained" color="primary">
                  수정하기
                </Button>
              </CardActions>
            </Card>
          </form>
          <hr />
        </>
      );
    } else {
      return (
        <div>
          <Card className="answer-card">
            <CardHeader
              avatar={
                <Link to={`/Mypage/${user_id}`}>
                  <Avatar src={user_img} alt="User-Image" aria-label="recipe" />
                </Link>
              }
              title={author_name}
              subheader={pubDate}
            />
            <CardContent style={{ paddingLeft: "1.5rem" }}>
              <Typography color="textSecondary" component="pre">
                {body}
              </Typography>
            </CardContent>
            <CardActions>
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
            </CardActions>
          </Card>

          <br />
        </div>
      );
    }
  }
}
