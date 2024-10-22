import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import api from "../../../api/BoardAPI";

import LikeView from "../LikeView";
import Viewer from "../../Viewer";
import AuthButton from "../../common/AuthButton";
import CommentNew from "../comment/CommentNew";
import CommentView from "../comment/CommentView";

// @material-ui
import {Container, Paper, Typography, Button, Table, TableRow, TableCell, TableHead, TableBody} from "@material-ui/core"

class PostDetail extends Component {
  state = {
    id: "",
    title: "",
    body: "",
    author: "",
    study_type: "",
    pub_date: "",
    comments: [],
    userId: ""
  };

  componentDidMount() {
    this.setState({
      userId: window.sessionStorage.getItem("id")
    });
    this.getPost(this.props.match.params.id);
  }

  async getPost(postId) {
    await api
      .getPost("study", postId)
      .then(res => {
        const data = res.data;
        console.log(data);
        this.setState({
          title: data.title,
          body: data.body,
          author: data.author,
          id: data.id,
          study_type: data.study_type,
          pub_date: moment(data.pub_date).format("YYYY-MM-DD hh:mm")
        });
        this.getComments("study");
      })
      .catch(err => console.log(err));
  }

  async getComments(board_name) {
    await api
      .getComments(`${board_name}_comment`, this.props.match.params.id)
      .then(res => {
        this.setState({
          comments: res.data
        });
      })
      .catch(err => console.log(err));
  }
  callGetComments = () => {
    this.getComments("study");
  };

  handlingDelete = async id => {
    await api.deletePost("study", id);
    console.log("delete post 성공.");
    document.location.href = `/study/${this.props.match.params.group}`;

  };

  render() {
    const post_type = {
      0: "공지사항",
      1: "스터디",
      2: "기타"
    };
    const post_id = this.props.match.params.id;

    return (
      <Container maxWidth="lg" className="main-container">
        <Paper style={{ padding: "1.5rem" }}>
          <Table className={"post-table"}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography component="h1" variant="h5">
                  [{post_type[this.state.study_type]}]&nbsp;{this.state.title}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="caption" color="textSecondary">
                  작성일 {this.state.pub_date} /&nbsp; 작성자 {this.state.author.name}(
                  <Link to={`/mypage/${this.state.author.username}`}>
                    {this.state.author.username}
                  </Link>
                  )
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell className="post-body">
                <Typography color="textSecondary" component="pre">
                  <Viewer value={String(this.state.body)} />
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <LikeView post_id={post_id} board_name="study" />
                <AuthButton
                  authType="isWriter"
                  info={post_id}
                  boardName="study"
                  button={
                    <>
                      <Button
                        color="primary"
                        size="small"
                        onClick={event => this.handlingDelete(this.state.id)}
                      >
                        Delete
                      </Button>
                      <Button
                        color="primary"
                        size="small"
                        component={Link}
                        to={`/study/${this.props.match.params.group}/update/${this.state.id}`}
                      >
                        Update
                      </Button>
                    </>
                  }
                />
                <Button
                  color="primary"
                  size="small"
                  component={Link}
                  to={`/study/${this.props.match.params.group}`}
                >
                  Back
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {this.state.userId > 0 ? (
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
                url={`study_comment`}
              />
            ))}
            <CommentNew
              url="study_comment"
              board_id={post_id}
              getComments={this.callGetComments}
            />
          </>
          ) : (
            <></>
          )}
        </Paper>
      </Container>
    );
  }
}

export default PostDetail;
