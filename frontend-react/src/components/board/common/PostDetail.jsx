import React, { Component } from "react";
import api from "../../../api/BoardAPI";
import { Link } from "react-router-dom";
import moment from "moment";

import LikeView from "../LikeView";
import CommentNew from "../comment/CommentNew";
import CommentView from "../comment/CommentView";
import Viewer from "../../Viewer";
import AnswerView from "./AnswerView";

// @material-ui
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Divider from "@material-ui/core/Divider";

import Editor from "../../Editor";
// import { isValid } from "date-fns/esm";

class postDetail extends Component {
  state = {
    id: "",
    title: "",
    body: "",
    author_name: "",
    author_id: "",
    pub_date: "",
    notice_date: "",
    board_name: "",
    comments: []
  };

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
        console.log(data);
        this.setState({
          title: data.title,
          body: data.body,
          id: data.id,
          author_name: data.author_name,
          author_id: data.user_id,
          pub_date: moment(data.pub_date).format("YYYY-MM-DD hh:mm"),
          notice_date: moment(data.notice_date).format("YYYY-MM-DD"),
          board_name: board_name
        });
      })
      .catch(err => console.log(err));
  }

  handlingDelete = async (target, id) => {
    if (window.confirm("게시물을 삭제하시겠습니까?") == true) {
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

  render() {
    const board_name = this.props.match.path.split("/")[1];
    return (
      <Container maxWidth="lg" className="main-container">
        <Paper>
          <Grid container spacing={2} style={{ paddingTop: "1.5rem" }}>
            <Grid item xs={1} sm={1}></Grid>
            <Grid item xs={10} sm={10}>
              <Table className={"post-table"}>
                <TableRow>
                  <TableCell>
                    <Typography component="h1" variant="h5">
                      {this.state.title}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <small>작성일 {this.state.pub_date}</small> /&nbsp;
                  <small>작성자 {this.state.author_name}</small>
                </TableRow>
                <TableRow>
                  <TableCell className="post-body">
                    <Typography color="textSecondary" component="pre">
                      <Viewer value={this.state.body} />
                    </Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <LikeView
                      board_id={this.props.match.params.id}
                      board_name={board_name}
                    />
                    <Button
                      color="primary"
                      size="small"
                      onClick={event =>
                        this.handlingDelete(
                          this.state.board_name,
                          this.state.id
                        )
                      }
                    >
                      Delete
                    </Button>
                    <Button
                      color="primary"
                      size="small"
                      component={Link}
                      to={`/${this.state.board_name}/update/${this.state.id}`}
                    >
                      Update
                    </Button>
                    <Button
                      color="primary"
                      size="small"
                      component={Link}
                      to={`/${this.state.board_name}`}
                    >
                      Back
                    </Button>
                  </TableCell>
                </TableRow>
              </Table>
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
                        user_id={comment.user_id}
                        author_name={comment.author_name}
                        body={comment.body}
                        comment_id={comment.id}
                        recomments={comment.recomments}
                        getComments={this.callGetComments}
                        board_id={comment.board}
                        user_img={comment.user_img}
                        pub_date={comment.pub_date}
                        url={`${this.state.board_name}_comment`}
                      />
                    ))}
                    <CommentNew
                      url={`${this.state.board_name}_comment`}
                      board_id={this.state.id}
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
                      board_id={this.state.id}
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

export default postDetail;
