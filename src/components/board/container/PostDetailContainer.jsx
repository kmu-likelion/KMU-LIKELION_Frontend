import React, { Component } from "react";
import api from "../../../api/BoardAPI";
import CommentAPI from "../../../api/CommentAPI";

import CommentNew from "../comment/CommentNew";
import CommentView from "../comment/CommentView";
import AnswerNew from "../qna/AnswerNew";
import AnswerView from "../qna/AnswerView";
import NoticeDetail from "../notice/NoticeDetail";
import QnADetail from "../qna/QnADetail";
import CareerDetail from "../career/CareerDetail";
import SessionDetail from "../session/SessionDetail";

// @material-ui
import {Container, Paper, Typography, Grid, Divider} from "@material-ui/core";


class PostDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postInfo: {},
      author: {},
      board_name: "",
      comments: [],
      userId: ""
    };
  }

  componentDidMount() {
    // console.log("디테일페이지 component did mount!");
    let board_name = this.props.match.path.split("/")[1];
    this.getPost(board_name);
    this.getComments(board_name);
    this.setState({
      userId: window.sessionStorage.getItem("id")
    });
  }

  async getComments(board_name) {
    await CommentAPI
      .getComments(`${board_name}_comment`, this.props.match.params.id)
      .then(res => {
        this.setState({
          comments: res.data,
          board_name: board_name
        });
      })
      .catch(err => console.log(err));
  }

  //하위컴포넌트에서 직접적으로 getComments를 하지 못하므로, 중계하는 함수를 props로 보냄.
  callGetComments = () => {
    this.getComments(this.state.board_name);
  };

  getPost = async board_name => {
    await api
      .getPost(board_name, this.props.match.params.id)
      .then(res => {
        const data = res.data;
        console.log("data: ", data);
        this.setState({
          postInfo: data,
          author: data.author,
          board_name: board_name
        });
      })
      .catch(err => console.log(err));
  };

  handlingDelete = async (target, id) => {
    if (window.confirm("게시물을 삭제하시겠습니까?") === true) {
      await api
        .deletePost(target, id)
        .then(res => {
          console.log(res);
          document.location.href = `/${target}`;
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  renderDetailComponent = (boardName, postInfo, author) => {
    let detailComponent = "";
    switch (boardName) {
      case "notice":
        detailComponent = (
          <NoticeDetail
            postInfo={postInfo}
            author={author}
            handlingDelete={this.handlingDelete}
            post_id={this.props.match.params.id}
            board_name={this.props.match.path.split("/")[1]}
          />
        );
        break;
      case "qna":
        detailComponent = (
          <QnADetail
            postInfo={postInfo}
            author={author}
            handlingDelete={this.handlingDelete}
            post_id={this.props.match.params.id}
            board_name={this.props.match.path.split("/")[1]}
          />
        );
        break;
      case "career":
        detailComponent = (
          <CareerDetail
            postInfo={postInfo}
            author={author}
            handlingDelete={this.handlingDelete}
            post_id={this.props.match.params.id}
            board_name={this.props.match.path.split("/")[1]}
          />
        );
        break;

      case "session":
        detailComponent = (
          <SessionDetail
            // postInfo={postInfo}
            handlingDelete={this.handlingDelete}
            post_id={this.props.match.params.id}
            board_name={this.props.match.path.split("/")[1]}
          />
        );
        break;

      default:
        detailComponent = "";
    }
    return detailComponent;
  };

  render() {
    const board_name = this.props.match.path.split("/")[1];
    const post_id = this.props.match.params.id;
    return (
      <Container maxWidth="lg" className="main-container">
        <Paper>
          <Grid container spacing={2} style={{ paddingTop: "1.5rem" }}>
            <Grid item xs={1} sm={1}></Grid>
            <Grid item xs={10} sm={10}>
              {this.renderDetailComponent(board_name, this.state.postInfo, this.state.author)}
              <Divider />
              <div style={{ padding: "1rem" }}>
                {board_name === "qna" ? (
                  <>
                    {this.state.userId > 0 ? (
                      <>
                      <AnswerNew
                          url={`${this.state.board_name}_comment`}
                          board_id={post_id}
                          getComments={this.callGetComments}
                        />
                        <Typography
                          component="h1"
                          variant="h5"
                          style={{ paddingBottom: "1.5rem" }}
                        >
                          {this.state.comments.length} Answers
                        </Typography>

                        {this.state.comments.map(comment => (
                          <AnswerView
                            key={comment.id}
                            user_id={comment.user_id}
                            author={comment.author}
                            body={comment.body}
                            comment_id={comment.id}
                            recomments={comment.recomments}
                            getComments={this.callGetComments}
                            board_id={post_id}
                            pub_date={comment.pub_date}
                            url={`${this.state.board_name}_comment`}
                          />
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <>
                    {this.state.userId > 0 && board_name !== "career" ? (
                      <>
                        <Typography component="h1" variant="h6">
                          Comments
                        </Typography>

                        {this.state.comments.map(comment => (
                          <CommentView
                            key={comment.id}
                            user_id={comment.user_id}
                            author={comment.author}
                            update_date={comment.update_date}
                            body={comment.body}
                            comment_id={comment.id}
                            recomments={comment.recomments}
                            getComments={this.callGetComments}
                            board_id={comment.board}
                            url={`${this.state.board_name}_comment`}
                          />
                        ))}
                        <CommentNew
                          url={`${this.state.board_name}_comment`}
                          board_id={post_id}
                          getComments={this.callGetComments}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </div>
            </Grid>
            <Grid item xs={1} sm={1}></Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

export default PostDetailContainer;
