import React, { Component } from "react";
import api from "../../../api/BoardAPI";
import { Link } from "react-router-dom";
import moment from "moment";

import LikeView from "../LikeView";

// @material-ui
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

class PostDetail extends Component {
  state = {
    id: "",
    title: "",
    body: "",
    study_type: "",
    pub_date: ""
  };

  componentDidMount() {
    this.getPost();
  }

  async getPost() {
    await api
      .getPost("study", this.props.match.params.id)
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
      })
      .catch(err => console.log(err));
  }

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
    return (
      <Container maxWidth="lg" className="post-container">
        <Paper className="PostingSection">
          <p>[{post_type[this.state.study_type]}]</p>
          <h4>{this.state.title}</h4>
          <p>{this.state.body}</p>
          <br />
          <small>pub date : {this.state.pub_date}</small>
          <hr />
          <LikeView board_id={this.props.match.params.id} board_name="study" />
          <Button
            color="secondary"
            size="small"
            onClick={event => this.handlingDelete(this.state.id)}
          >
            Delete
          </Button>
          <Link
            to={`/study/${this.props.match.params.group}/update/${this.state.id}`}
          >
            Update
          </Link>{" "}
          &nbsp;
          <Link to={`/study/${this.props.match.params.group}`}>List</Link>
          <hr />
        </Paper>
      </Container>
    );
  }
}

export default PostDetail;
