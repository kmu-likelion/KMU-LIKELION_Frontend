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

class RecruitDetail extends Component {
  state = {
    id: "",
    title: "",
    body: "",
    pub_date: "",
    purpose: "",
    comments: []
  };

  componentDidMount() {
    console.log("Detail ComponentDidMount");
    this.getRecruit();
    this.getComments();
  }

  async getComments() {
    await api
      .getComments("recruit_comment", this.props.match.params.id)
      .then(res => {
        const _data = res.data;
        this.setState({
          comments: _data.results
        });
        console.log(_data.results);
      })
      .catch(err => console.log(err));
  }

  //하위컴포넌트에서 직접적으로 getComments를 하지 못하므로, 중계하는 함수를 props로 보냄.
  callGetComments = () => {
    this.getComments();
  };

  async getRecruit() {
    await api
      .getPost("recruit", this.props.match.params.id)
      .then(res => {
        const data = res.data;
        console.log("정상적으로 가져옴.", data);

        this.setState({
          title: data.title,
          body: data.body,
          id: data.id,
          pub_date: moment(data.pub_date).format("YYYY-MM-DD hh:mm"),
          purpose: data.purpose
        });
      })
      .catch(err => console.log(err));
  }

  handlingDelete = async (target, id) => {
    await api.deletePost(target, id);
    if (target === "recruit") {
      document.location.href = "/recruit";
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
              <h6>Title : {this.state.title}</h6>
              <p>body : {this.state.body}</p>
              <p>목적 : {this.state.purpose}</p>
              <br />
              <p>작성일 : {this.state.pub_date}</p>
            </Typography>
          </CardContent>

          <CardActions>
            <LikeView
              board_id={this.props.match.params.id}
              board_name="recruit"
            />
            <Button
              color="secondary"
              size="small"
              onClick={event => this.handlingDelete("recruit", this.state.id)}
            >
              Delete
            </Button>
            <Link to={`/recruit/update/${this.state.id}`}>Update</Link>
            <Link to={"/recruit"}>Back</Link>
          </CardActions>
        </Card>
        <Card className={"card"}>
          <CardContent>
            <h5>Comment</h5>
            <div>
              {this.state.comments.map(comment => (
                <CommentView
                  user_id={comment.user_id}
                  user_img={comment.user_img}
                  author_name={comment.author_name}
                  body={comment.body}
                  comment_id={comment.id}
                  handlingDelete={this.handlingDelete}
                  getComments={this.callGetComments}
                  board_id={comment.board}
                  url="recruit_comment"
                />
              ))}
            </div>
            <CommentNew
              url="recruit_comment"
              board_id={this.state.id}
              getComments={this.callGetComments}
            />
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default RecruitDetail;
