import React, { Component } from "react";
import api from "../../../api/api_board";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

// @material-ui
import Button from "@material-ui/core/Button";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class StudyDetail extends Component {
  state = {
    id: "",
    title: "",
    body: "",
    pub_date: "",
    how_many_people: ""
  };

  componentDidMount() {
    console.log("Detail ComponentDidMount");
    //this._getQnA(this.props.match.params.id);
    this.getStudy();
  }

  async getStudy() {
    await api
      .getPost("study", this.props.match.params.id)
      .then(res => {
        const data = res.data;

        this.setState({
          title: data.title,
          body: data.body,
          id: data.id,
          pub_date: moment(data.pub_date).format("YYYY-MM-DD hh:mm"),
          how_many_people: data.how_many_people
        });
      })
      .catch(err => console.log(err));
  }

  handlingDelete = async id => {
    await api.deletePost("study", id);
    console.log("delete post 성공.");
    document.location.href = "/study";
  };

  render() {
    return (
      <Card className={"card"}>
        <CardContent>
          <Typography>
            <h6>Title : {this.state.title}</h6>
            <p>body : {this.state.body}</p>
            <p>참여인원 : {this.state.how_many_people}</p>
            <br />
            <p>작성일 : {this.state.pub_date}</p>
          </Typography>
        </CardContent>

        <CardActions>
          <Button
            color="secondary"
            size="small"
            onClick={event => this.handlingDelete(this.state.id)}
          >
            Delete
          </Button>
          <Link to={`/study/update/${this.state.id}`}>Update</Link>
          <Link to={"/study"}>Back</Link>
        </CardActions>
      </Card>
    );
  }
}

export default StudyDetail;
