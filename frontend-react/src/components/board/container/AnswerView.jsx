import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import api from "../../../api/BoardAPI";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import RecommentNew from "../comment/RecommentNew";
// import CommentView from "../comment/CommentView";
import RecommentView from "../comment/RecommentView";
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
    request_user: "",
    openRecomment: false
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

  closeRecomment = () => {
    this.setState({
      openRecomment: false
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
      recomments,
      user_img,
      pub_date,
      getComments
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
          <details>
            <summary> {recomments.length}개의 댓글이 있습니다.</summary>
            {recomments.map(recmt => (
              <RecommentView
                key={recmt.id}
                user_id={recmt.user_id}
                author_name={recmt.author_name}
                body={recmt.body}
                comment_id={recmt.id}
                getComments={getComments}
                board_id={recmt.board}
                user_img={recmt.user_img}
                url={`qna_comment`}
              />
            ))}
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
            {this.state.openRecomment == true ? (
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
          </details>

          <br />
        </div>
      );
    }
  }
}
