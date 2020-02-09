import React, { Component } from "react";
import api from "../../../api/api_board";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import ScrapView from "../ScrapView";

// @material-ui
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class NoticeDetail extends Component {
  state = {
    id: "",
    title: "",
    body: "",
    writer: "",
    pub_date: "",
    run_date: "",
    input_cmt: "",
    comments: []
  };
  //...
  componentDidMount() {
    console.log("Detail ComponentDidMount");
    // this._getNotice(this.props.match.params.id);
    this.getNotice();
    this.getComments();
  }

  componentDidUpdate() {
    // this.getComments();
    console.log("post id : ", this.state.id);
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
    console.log(`delete id : ${id}`);
    console.log(`delete ${target} 성공.`);
    if (target === "notice") {
      document.location.href = "/notice";
    } else {
      this.getComments();
    }
  };

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  commentSubmit = async event => {
    event.preventDefault();
    console.log("body:", this.state.input_cmt);
    console.log("board:", this.state.id);
    console.log("writer:", this.state.writer);
    // console.log("token:", window.sessionStorage.getItem("token"));
    let result = await api
      .createPost("notice_comment", {
        body: this.state.input_cmt,
        board: this.state.id,
        writer: this.state.writer //id
        // token: window.sessionStorage.getItem("token")
      })
      .catch(err => console.log(err));
    console.log("정상적으로 생성됨.", result);
    this.setState({ input_cmt: "" });
    this.getComments();
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
            <ScrapView board_id={this.props.match.params.id} />
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
                <>
                  작성자 :
                  <Link to={`/Mypage/${comment.writer}`}>
                    {comment.author_name}
                  </Link>
                  <br />
                  <span>{comment.body}</span>
                  <br />
                  <Button
                    color="secondary"
                    size="small"
                    onClick={event =>
                      this.handlingDelete("notice_comment", comment.id)
                    }
                  >
                    Delete
                  </Button>
                  <hr />
                </>
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
      </div>
    );
  }
}

export default NoticeDetail;
