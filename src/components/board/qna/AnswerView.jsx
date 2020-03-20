import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/BoardAPI";
import moment from "moment";

import RecommentNew from "../comment/RecommentNew";
import RecommentView from "../comment/RecommentView";

import {Button, TextareaAutosize, Avatar, Typography, Card, CardHeader, CardActions, CardContent} from "@material-ui/core";

export default class AnswerView extends Component {
  state = {
    is_update: false,
    update_body: "",
    request_user: "",
    openRecomment: false
  };

  componentDidMount() {
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
    if (window.confirm("답변을 삭제하시겠습니까?") === true) {
      await api.deletePost(target, id);
      this.props.getComments();
    }
  };

  closeRecomment = () => {
    this.setState({
      openRecomment: false
    });
  };

  render() {
    const {
      user_id,
      author,
      body,
      comment_id,
      board_id,
      url,
      recomments,
      pub_date,
      getComments
    } = this.props;

    const pubDate = moment(pub_date).format("MM/DD HH:MM");

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
                  <Link to={`/Mypage/${author.username}`}>
                    <Avatar
                      src={author.img}
                      alt="User-Image"
                      aria-label="recipe"
                    />
                  </Link>
                }
                title={`${author.name}(${author.username})`}
                // subheader="September 14, 2016"
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
                <Link to={`/Mypage/${author.username}`}>
                  <Avatar src={author.img} alt="User-Image" aria-label="recipe" />
                </Link>
              }
              title={`${author.name}(${author.username})`}
              subheader={pubDate}
            />
            <CardContent style={{ paddingLeft: "1.5rem" }}>
              <Typography color="textSecondary" component="pre">
                {body}
              </Typography>
            </CardContent>
            <CardActions>
              {user_id === Number(window.sessionStorage.getItem("id")) ? (
                <>
                  <Button
                    color="primary"
                    onClick={event =>
                      this.setState({ is_update: true, update_body: body })
                    }
                  >
                    수정
                  </Button>
                  <Button
                    color="secondary"
                    onClick={event => this.handlingDelete(url, comment_id)}
                  >
                    삭제
                  </Button>
                </>
              ) : (
                <></>
              )}
              <Button
              color="primary"
              onClick={event =>
                this.setState(prevState => ({
                  openRecomment: !prevState.openRecomment
                }))
              }
            >
              {this.state.openRecomment === true ? "작성취소" : "댓글작성"}
            </Button>
            </CardActions>
          </Card>
          {this.state.openRecomment === true ? (
              <RecommentNew
                url={`qna_comment`}
                board_id={board_id}
                comment_id={comment_id}
                getComments={getComments}
                closeRecomment={this.closeRecomment}
              />
            ) : (
              <></>
            )}
          <details>
            <summary> {recomments.length}개의 댓글이 있습니다.</summary>
            {recomments.map(recmt => (
              <RecommentView
                key={recmt.id}
                user_id={recmt.user_id}
                author={recmt.author}
                body={recmt.body}
                update_date={recmt.update_date}
                comment_id={recmt.id}
                getComments={getComments}
                board_id={recmt.board}
                url={`qna_comment`}
              />
            ))}
          </details>

          <br />
        </div>
      );
    }
  }
}
