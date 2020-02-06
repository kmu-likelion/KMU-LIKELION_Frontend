import React, { Component } from "react";
import api from "../../../api/api_board";
import axios from "axios";
import { Link } from "react-router-dom";
// import moment from "moment";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { tokenConfig } from "../../../action/auth";

// @material-ui
// import Button from "@material-ui/core/Button";

// import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import Typography from "@material-ui/core/Typography";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class RecruitUpdate extends Component {
  state = {
    title: "",
    body: "",
    purpose: ""
  };

  componentDidMount() {
    console.log("Detail ComponentDidMount");
    this.getRecruit();
  }

  async getRecruit() {
    await api
      .getPost("recruit", this.props.match.params.id, tokenConfig())
      .then(res => {
        const data = res.data;

        this.setState({
          title: data.title,
          body: data.body,
          id: data.id,
          purpose: data.purpose
        });
      })
      .catch(err => console.log(err));
  }
  async updateRecruit(id, data) {
    await api
      .updatePost("recruit", id, data, tokenConfig())
      .then(result => console.log("정상적으로 update됨.", result))
      .catch(err => console.log(err));
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handlingSubmit = async event => {
    event.preventDefault(); //event의 디폴트 기능(새로고침 되는 것 등..) -> 막는다.
    this.updateRecruit(this.props.match.params.id, {
      title: this.state.title,
      body: this.state.body,
      purpose: this.state.purpose
    });
    this.setState({ title: "", content: "", purpose: "" });
    // this.getPosts()
    document.location.href = "/recruit";
  };

  render() {
    return (
      <Container maxWidth="lg" className="PostingSection">
        <Paper className="PostingPaper">
          <h2>Update Recruit</h2>
          <form onSubmit={this.handlingSubmit} className="PostingForm">
            <input
              id="title"
              name="title"
              value={this.state.title}
              onChange={this.handlingChange}
              required="required"
              placeholder="Title"
            />
            <input
              id="body"
              name="body"
              value={this.state.body}
              onChange={this.handlingChange}
              required="required"
              placeholder="Content"
            />
            <input
              name="purpose"
              value={this.state.purpose}
              onChange={this.handlingChange}
              required="required"
              placeholder="purpose"
            />

            <button type="submit">제출</button>
          </form>

          <Link to="/recruit">Cancle</Link>
        </Paper>
      </Container>
    );
  }
}

export default RecruitUpdate;
