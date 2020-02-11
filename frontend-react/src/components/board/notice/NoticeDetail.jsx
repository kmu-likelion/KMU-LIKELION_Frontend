import React, { Component } from "react";
import api from "../../../api/api_board";
import { Link } from "react-router-dom";
import moment from "moment";

import LikeView from "../LikeView";
import CommentNew from "../CommentNew";
import CommentView from "../CommentView";

// @material-ui
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

class NoticeDetail extends Component {
  state = {
    id: "",
    title: "",
    body: "",
    writer: "",
    pub_date: "",
    run_date: "",
    comments: []
  };
  //...
  componentDidMount() {
    console.log("Detail ComponentDidMount");

    this.getNotice();
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

  async getNotice() {
    await api
      .getPost("notice", this.props.match.params.id)
      .then(res => {
        const data = res.data;

        this.setState({
          title: data.title,
          body: data.body,
          id: data.id,
          writer: data.writer,
          pub_date: moment(data.pub_date).format("YYYY-MM-DD hh:mm"),
          run_date: moment(data.run_date).format("YYYY-MM-DD")
        });
      })
      .catch(err => console.log(err));
  }

  handlingDelete = async (target, id) => {
    await api.deletePost(target, id);
    // console.log(`delete id : ${id}`);
    // console.log(`delete ${target} 성공.`);
    if (target === "notice") {
      document.location.href = "/notice";
    } else {
      this.getComments();
    }
  };

  render() {
    return (
      <div>
        <Card className={"card"}>
          <CardContent>
            <Typography>
              Title : {this.state.title} <br />
              body : {this.state.body} <br />
              시각 : {this.state.run_date}
              <br />
              작성일 : {this.state.pub_date} <br />
            </Typography>
          </CardContent>

          <CardActions>
            <LikeView
              board_id={this.props.match.params.id}
              board_name="notice"
            />
            <Button
              color="secondary"
              size="small"
              onClick={event => this.handlingDelete("notice", this.state.id)}
            >
              Delete
            </Button>
            <Link to={`/notice/update/${this.state.id}`}>Update</Link>
            <Link to={"/notice"}>Back</Link>
          </CardActions>
        </Card>

        <Card className={"card"}>
          <CardContent>
            <h5>Comment</h5>
            <div>
              {this.state.comments.map(comment => (
                <CommentView
                  user_id={comment.user_id}
                  author_name={comment.author_name}
                  body={comment.body}
                  comment_id={comment.id}
                  handlingDelete={this.handlingDelete}
                  getComments={this.callGetComments}
                  board_id={comment.board}
                  url="notice_comment"
                />
              ))}
            </div>
          </CardContent>
        </Card>
        <CommentNew
          url="notice_comment"
          board_id={this.state.id}
          getComments={this.callGetComments}
        />
      </div>
    );
  }
}

export default NoticeDetail;
