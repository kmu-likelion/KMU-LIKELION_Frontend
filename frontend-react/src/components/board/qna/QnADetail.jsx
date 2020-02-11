import React, { Component } from "react";
import api from "../../../api/api_board";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import LikeView from "../LikeView";

// @material-ui
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CommentView from "../CommentView";

class QnADetail extends Component {
  state = {
    id: "",
    title: "",
    body: "",
    pub_date: "",
    subject: "",
    input_cmt: "",
    comments: [],
    board:""
  };

  componentDidMount() {
    console.log("Detail ComponentDidMount");
    //this._getQnA(this.props.match.params.id);
    this.getQnA();
    this.getComments(this.state.id);
  }

  async getComments() {
    await api
      .getComments("QnA_comment", this.props.match.params.id)
      .then(res => {
        const _data = res.data;
        this.setState({
          comments: _data.results
        });
      })
      .catch(err => console.log(err));
  }

  async getQnA() {
    await api
      .getPost("QnA", this.props.match.params.id)
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
    if (target === "QnA") {
      document.location.href = "/QnA";
    } else {
      this.getComments();
    }
  };

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  async updateQnA_comment(id, data) {
    await api
      .updatePost("QnA_comment", id, data)
      .then(result => {
        console.log("정상적으로 update됨.", result);
        this.getComments();
      })

      .catch(err => console.log(err ,"err@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"));
  }

  commentUpdateSubmit = (event,cmt,board_id,user_id,comment_id) => {
    event.preventDefault(); //event의 디폴트 기능(새로고침 되는 것 등..) -> 막는다.
    console.log("submit요청청청청")
    console.log("cmt",cmt)
    console.log("boardid",board_id)
    console.log("userid",user_id)
    console.log("id",comment_id)

    this.updateQnA_comment(comment_id, {
      body: cmt,
      user_id:user_id,
      board: board_id
    });
    this.setState({ body: "", board: ""});
    
    //document.location.href = "/QnA";
  };

  commentSubmit = async event => {
    event.preventDefault();

    const current_user_id = window.sessionStorage.getItem("id");

    let result = await api
      .createPost("QnA_comment", {
        body: this.state.input_cmt,
        board: this.state.id,
        user_id: current_user_id
      })
      .catch(err => console.log(err));
    console.log("정상적으로 생성됨.", result);
    this.setState({ input_cmt: "" });
    
    this.getComments();
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
          <LikeView board_id={this.props.match.params.id} board_name="QnA" />
          <Button
            color="secondary"
            size="small"
            onClick={event => this.handlingDelete(this.state.id)}
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
            user_id ={comment.user_id}
            author_name={comment.author_name}
            body = {comment.body}
            comment_id = {comment.id}
            handlingDelete = {this.handlingDelete}
            getComments = {this.getComments}
            board_id = {comment.board}
            handlingChange = {this.handlingChange}
            commentUpdateSubmit = {this.commentUpdateSubmit}
            url ="QnA_comment"
            />
          ))}
        </div>
        <form onSubmit={this.commentSubmit} className="commentForm">
          <TextField
            id="outlined-name"
            label="comment"
            name="input_cmt"
            value={this.state.input_cmt}
            onChange={this.handlingChange}
            margin="normal"
            // variant="outlined"
          />
          <Button type="submit" variant="contained" color="primary">
            제출
          </Button>
        </form>
      </CardContent>
      </Card>
      </>


    );
  }
}

export default QnADetail;
