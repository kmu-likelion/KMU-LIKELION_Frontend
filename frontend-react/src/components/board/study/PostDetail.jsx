import React, { Component } from "react";
import api from "../../../api/BoardAPI";
import { Link } from "react-router-dom";
import moment from "moment";

import LikeView from "../LikeView";
import Viewer from "../../Viewer";
import CommentNew from "../comment/CommentNew";
import CommentView from "../comment/CommentView";

// @material-ui
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

class PostDetail extends Component {
  state = {
    id: "",
    title: "",
    body: "",
    study_type: "",
    pub_date: "",
    comments: []
  };

  componentDidMount() {
    const post_id = this.props.match.params.id;
    this.getPost(post_id);
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
        console.log("게시물 댓글 : ", res.data.results);
        this.setState({
          comments: res.data.results
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
    // this.props.history.push(`/study/${this.props.match.params.group}`);
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
        <Paper>
          <Table className={"post-table"}>
            <TableRow>
              <TableCell>
                <Typography component="h1" variant="h5">
                  [{post_type[this.state.study_type]}]&nbsp;{this.state.title}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <Typography variant="caption" color="textSecondary">
                작성일 {this.state.pub_date} /&nbsp; 작성자
              </Typography>
            </TableRow>

            <TableRow>
              <TableCell className="post-body">
                <Typography color="textSecondary" component="pre">
                  <Viewer value={String(this.state.body)} />
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <LikeView
                  board_id={this.props.match.params.id}
                  board_name="study"
                />
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
          </Table>
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
              url={`study_comment`}
            />
          ))}
          <CommentNew
            url="study_comment"
            board_id={post_id}
            getComments={this.callGetComments}
          />
        </Paper>
      </Container>
    );
  }
}

export default PostDetail;
