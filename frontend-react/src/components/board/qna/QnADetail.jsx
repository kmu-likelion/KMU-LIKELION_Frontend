import React, { Component } from "react";
import api from "../../../api/api_board";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import LikeView from "../LikeView";

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
    subject: ""
  };

  componentDidMount() {
    console.log("Detail ComponentDidMount");
    //this._getQnA(this.props.match.params.id);
    this.getQnA();
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

  _getQnA = (id = "") => {
    console.log("get QnA Method 실행");
    let URL;
    if (id) {
      URL = `QnA/${id}`;
    } else {
      // URL = `api/notice/`;
      console.log(`${id}번째 포스트 가져오기 실패!`);
    }
    let data = [];
    axios
      .get(URL)
      .then(res => {
        console.log("End Point: ", URL);
        const postData = res.data;
        this.setState({
          title: postData.title,
          body: postData.body,
          id: postData.id,
          pub_date: postData.pub_date,
          subject: postData.subject
        });
        console.log("get post 성공.");
      })
      .catch(err => console.log(err));

    return data;
  };

  handlingDelete = async id => {
    await api.deletePost("QnA", id);
    console.log("delete post 성공.");
    document.location.href = "/QnA";
  };

  render() {
    return (
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
          <LikeView board_id={this.props.match.params.id} />
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
    );
  }
}

export default QnADetail;
