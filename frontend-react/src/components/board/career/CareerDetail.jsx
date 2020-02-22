import React, { Component } from "react";
import api from "../../../api/BoardAPI";
import { Link } from "react-router-dom";
import moment from "moment";

import LikeView from "../LikeView";
import CommentNew from "../comment/CommentNew";
import CommentView from "../comment/CommentView";
import Viewer from "../../Viewer";

// @material-ui
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

class CareerDetail extends Component {
  state = {
    id: "",
    title: "",
    body: "",
    writer: "",
    pub_date: "",
    comments: []
  };
  //...
  componentDidMount() {
    console.log("Detail ComponentDidMount");

    this.getCareer();
    this.getComments();
    console.log(this.state);
  }

  async getComments() {
    await api
      .getComments("career_comment", this.props.match.params.id)
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

  async getCareer() {
    await api
      .getPost("career", this.props.match.params.id)
      .then(res => {
        const data = res.data;

        this.setState({
          title: data.title,
          body: data.body,
          id: data.id,
          writer: data.writer,
          pub_date: moment(data.pub_date).format("YYYY-MM-DD hh:mm"),
        });
      })
      .catch(err => console.log(err));
  }

  handlingDelete = async (target, id) => {
    await api.deletePost(target, id);
    // console.log(`delete id : ${id}`);
    // console.log(`delete ${target} 성공.`);
    if (target === "career") {
      document.location.href = "/career";
    } else {
      this.getComments();
    }
  };

  render() {
    // console.log("f------------------df", this.state.body);
    // var contents = this.state.body.replace("\n",);
    return (
      <div>
        <Card className={"card"}>
          <CardContent>
            <Typography>
              제목 : {this.state.title} <br />
              내용 : <Viewer value={this.state.body}/> <br />
              일자 : {this.state.career_date}
              <br />
              <small>pub date : {this.state.pub_date}</small> <br />
            </Typography>
          </CardContent>

          <CardActions>
            <LikeView
              board_id={this.props.match.params.id}
              board_name="career"
            />
            <Button
              color="secondary"
              size="small"
              onClick={event => this.handlingDelete("career", this.state.id)}
            >
              Delete
            </Button>
            <Link to={`/career/update/${this.state.id}`}>Update</Link>
            <Link to={"/career"}>Back</Link>
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
                  url="career_comment"
                />
              ))}
            </div>
          </CardContent>
        </Card>
        <CommentNew
          url="career_comment"
          board_id={this.state.id}
          getComments={this.callGetComments}
        />
      </div>
    );
  }
}

export default CareerDetail;
