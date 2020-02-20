import React, { Component } from "react";
import api from "../../../api/BoardAPI";
import { Link } from "react-router-dom";
import moment from "moment";

// 하위 component
import LikeView from "../LikeView";
import CommentNew from "../comment/CommentNew";
import CommentView from "../comment/CommentView";

// @material-ui
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

class QnADetail extends Component {
  state = {
    id: "",
    title: "",
    body: "",
    pub_date: "",
    subject: "",
    comments: [],
    board: ""
  };

  componentDidMount() {
    console.log("Detail ComponentDidMount");

    this.getQnA();
    this.getComments(this.state.id);
  }

  async getComments() {
    await api
      .getComments("qna_comment", this.props.match.params.id)
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

  async getQnA() {
    await api
      .getPost("qna", this.props.match.params.id)
      .then(res => {
        const data = res.data;

        this.setState({
          title: data.title,
          body: data.body,
          id: data.id,
          pub_date: moment(data.pub_date).format("YYYY-MM-DD hh:mm"),
          subject: data.subject
        });
      })
      .catch(err => console.log(err));
  }

  handlingDelete = async (target, id) => {
    await api.deletePost(target, id);
    console.log(`delete id : ${id}`);
    console.log(`delete ${target} 성공.`);
    if (target === "qna") {
      document.location.href = "/QnA";
    } else {
      this.getComments();
    }
  };

  render() {
    return (
      <>
        <Card className={"card"}>
          <CardContent>
            <Typography>
              <h6>Title : {this.state.title}</h6>
              <p>body : {this.state.body}</p>
              <p>과목 : {this.state.subject}</p>
              <br />
              <p>작성일 : {this.state.pub_date}</p>
            </Typography>
          </CardContent>

          <CardActions>
            <LikeView board_id={this.props.match.params.id} board_name="qna" />
            <Button
              color="secondary"
              size="small"
              onClick={event => this.handlingDelete("qna", this.state.id)}
            >
              Delete
            </Button>
            <Link to={`/QnA/update/${this.state.id}`}>Update</Link>
            <Link to={"/QnA"}>Back</Link>
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
                  user_img={comment.user_img}
                  url="qna_comment"
                />
              ))}
            </div>
          </CardContent>
        </Card>
        <CommentNew
          url="qna_comment"
          board_id={this.state.id}
          getComments={this.callGetComments}
        />
      </>
    );
  }
}

export default QnADetail;