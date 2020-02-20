import React, { Component } from "react";
import api from "../../../api/BoardAPI";
import { Link } from "react-router-dom";
import moment from "moment";

import LikeView from "../LikeView";
import CommentNew from "../comment/CommentNew";
import CommentView from "../comment/CommentView";

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

class NoticeDetail extends Component {
  state = {
    id: "",
    title: "",
    body: "",
    author_name: "",
    author_id: "",
    pub_date: "",
    notice_date: "",
    comments: []
  };
  //...
  componentDidMount() {
    console.log("Detail ComponentDidMount");

    this.getPost();
    this.getComments();
  }

  async getComments() {
    await api
      .getComments("notice_comment", this.props.match.params.id)
      .then(res => {
        const _data = res.data;
        this.setState({
          comments: _data.results
        });
      })
      .catch(err => console.log(err));
  }

  //하위컴포넌트에서 직접적으로 getComments를 하지 못하므로, 중계하는 함수를 props로 보냄.
  callGetComments = () => {
    this.getComments();
  };

  async getPost() {
    await api
      .getPost("notice", this.props.match.params.id)
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
          notice_date: moment(data.notice_date).format("YYYY-MM-DD")
        });
      })
      .catch(err => console.log(err));
  }

  handlingDelete = async (target, id) => {
    await api.deletePost(target, id);
    if (target === "notice") {
      document.location.href = "/notice";
    } else {
      this.getComments();
    }
  };

  render() {
    // console.log("f------------------df", this.state.body);
    // var contents = this.state.body.replace("\n",);
    return (
      <Container maxWidth="lg" className="main-container">
        <Paper>
          <Grid container spacing={2}>
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
                    <pre className="preTag">{this.state.body}</pre>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <LikeView
                      board_id={this.props.match.params.id}
                      board_name="notice"
                    />
                    <Button
                      color="primary"
                      size="small"
                      onClick={event =>
                        this.handlingDelete("notice", this.state.id)
                      }
                    >
                      Delete
                    </Button>
                    <Button
                      color="primary"
                      size="small"
                      component={Link}
                      to={`/notice/update/${this.state.id}`}
                    >
                      Update
                    </Button>
                    <Button
                      color="primary"
                      size="small"
                      component={Link}
                      to={"/notice"}
                    >
                      Back
                    </Button>
                  </TableCell>
                </TableRow>
              </Table>
              <Divider />
              <Typography component="h1" variant="h6">
                Comment
              </Typography>

              {this.state.comments.map(comment => (
                <CommentView
                  user_id={comment.user_id}
                  author_name={comment.author_name}
                  body={comment.body}
                  comment_id={comment.id}
                  handlingDelete={this.handlingDelete}
                  getComments={this.callGetComments}
                  board_id={comment.board}
                  user_img={comment.user_img}
                  url="notice_comment"
                />
              ))}
              <CommentNew
                url="notice_comment"
                board_id={this.state.id}
                getComments={this.callGetComments}
              />
            </Grid>
            <Grid item xs={1} sm={1}></Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

export default NoticeDetail;
