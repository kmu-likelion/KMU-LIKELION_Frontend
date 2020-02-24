import React, { Component } from "react";
import api from "../../../api/BoardAPI";

import CommentNew from "../comment/CommentNew";
import CommentView from "../comment/CommentView";
import AnswerView from "./AnswerView";
import NoticeDetail from "./NoticeDetail";
import QnADetail from "./QnADetail";
import CareerDetail from "./CareerDetail";
import SessionDetail from "./SessionDetail";

// @material-ui
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
// import { isValid } from "date-fns/esm";

class PostDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postInfo: {},
      board_name: "",
      comments: []
    };
  }

  componentDidMount() {
    // console.log("디테일페이지 component did mount!");
    let board_name = this.props.match.path.split("/")[1];
    this.getPost(board_name);
    this.getComments(board_name);
  }

  async getComments(board_name) {
    await api
      .getComments(`${board_name}_comment`, this.props.match.params.id)
      .then(res => {
        const _data = res.data;
        console.log("가져온 댓글 : ", _data.results);
        this.setState({
          comments: _data.results,
          board_name: board_name
        });
      })
      .catch(err => console.log(err));
  }

  //하위컴포넌트에서 직접적으로 getComments를 하지 못하므로, 중계하는 함수를 props로 보냄.
  callGetComments = () => {
    this.getComments(this.state.board_name);
  };

  async getPost(board_name) {
    await api
      .getPost(board_name, this.props.match.params.id)
      .then(res => {
        const data = res.data;
        console.log("data: ", data);
        console.log("과제 :", data.assignments.length);
        this.setState({
          postInfo: data,
          board_name: board_name
        });
      })
      .catch(err => console.log(err));
  }

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

  renderDetailComponent = (boardName, postInfo) => {
    let detailComponent = "";
    switch (boardName) {
      case "notice":
        detailComponent = (
          <NoticeDetail
            postInfo={postInfo}
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
              {this.renderDetailComponent(board_name, this.state.postInfo)}
              <Divider />
              <div style={{ padding: "1rem" }}>
                {board_name === "qna" ? (
                  <>
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
                        author_name={comment.author_name}
                        body={comment.body}
                        comment_id={comment.id}
                        recomments={comment.recomments}
                        getComments={this.callGetComments}
                        board_id={post_id}
                        user_img={comment.user_img}
                        pub_date={comment.pub_date}
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
                  <>
                    <Typography component="h1" variant="h6">
                      Comments
                    </Typography>

                    {this.state.comments.map(comment => (
                      <CommentView
                        key={comment.id}
                        user_id={comment.user_id}
                        author_name={comment.author_name}
                        body={comment.body}
                        comment_id={comment.id}
                        recomments={comment.recomments}
                        getComments={this.callGetComments}
                        board_id={comment.board}
                        user_img={comment.user_img}
                        url={`${this.state.board_name}_comment`}
                      />
                    ))}
                    <CommentNew
                      url={`${this.state.board_name}_comment`}
                      board_id={post_id}
                      getComments={this.callGetComments}
                    />
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
