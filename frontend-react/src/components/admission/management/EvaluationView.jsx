import React, { Component } from "react";
import Button from "@material-ui/core/Button";
// import CardActions from '@material-ui/core/CardActions';
import api from "../../../api/AdmissionAPI";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";

import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Divider from "@material-ui/core/Divider";
import Rating from "@material-ui/lab/Rating";

export default class CommentView extends Component {
  state = {
    is_update: false,
    update_body: "",
    update_score: "",
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

  handlingUpdate = async (event, application_id, user_id, comment_id) => {
    event.preventDefault();
    await api
      .updateEvaluation(comment_id, {
        user_id: user_id,
        application_id: application_id,
        body: this.state.update_body,
        score: this.state.update_score
      })
      .then(res => {
        console.log("정상적으로 수정되었습니다. ", res.data);
        this.setState({
          is_update: false
        });
        this.props.getEvaluations();
      })
      .catch(err => console.log(err));
  };

  handlingDelete = async id => {
    if (window.confirm("댓글을 삭제하시겠습니까?") === true) {
      await api.deleteEvaluation(id);
      this.props.getEvaluations();
    }
  };

  render() {
    const {
      user_id,
      author_name,
      body,
      comment_id,
      score,
      application_id,
      user_img
    } = this.props;

    if (this.state.is_update) {
      return (
        <>
          <List>
            <form
              onSubmit={event => {
                this.handlingUpdate(event, application_id, user_id, comment_id);
              }}
              style={{ width: "auto" }}
            >
              <ListItem
                alignItems="flex-start"
                style={{ verticalAlign: "middle" }}
              >
                <ListItemAvatar>
                  <Avatar alt="comment-writer" src={user_img} />
                </ListItemAvatar>
                <ListItemSecondaryAction>
                  <Rating
                    name="update_score"
                    defaultValue={score}
                    value={this.state.update_score}
                    onChange={this.handlingChange}
                    size="large"
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem alignItems="middle" style={{ verticalAlign: "middle" }}>
                <ListItemText
                  primary={
                    <TextareaAutosize
                      name="update_body"
                      rowsMin={3}
                      rowsMax={7}
                      placeholder="comment"
                      value={this.state.update_body}
                      onChange={this.handlingChange}
                      style={{ width: "100%" }}
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
            <ListItemAvatar
              style={{
                display: "flex",
                marginRight: 25,
                verticalAlign: "middle"
              }}
            >
              <IconButton
                component={Link}
                to={`/Mypage/${author_name}`}
                style={{ marginRight: 10 }}
              >
                <Avatar alt="comment-writer" src={user_img} />
              </IconButton>
              <Typography variant="h6" style={{ paddingTop: 15 }}>
                {author_name}
              </Typography>
            </ListItemAvatar>

            <Rating name="read-only" value={score} readOnly />
            <ListItemSecondaryAction>
              <Button
                color="primary"
                size="small"
                onClick={event =>
                  this.setState({
                    is_update: true,
                    update_body: body,
                    update_score: score
                  })
                }
              >
                Update
              </Button>
              <Button
                color="secondary"
                size="small"
                onClick={event => this.handlingDelete(comment_id)}
              >
                Delete
              </Button>
              {/* <small>{pubDate}</small> */}
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem
            alignItems="middle"
            style={{ verticalAlign: "middle", alignItems: "center" }}
          >
            <Paper
              elevation={0}
              style={{
                padding: 30,
                textAlign: "center",
                width: "80%"
              }}
            >
              <ListItemText
                primary={<Typography component="pre">{body}</Typography>}
              />
            </Paper>
          </ListItem>
          <br />
          <Divider />
        </List>
      );
    }
  }
}
