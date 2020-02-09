import React, { Component } from "react";
import api from "../../../api/api_board";

import { Link } from "react-router-dom";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

class StudyUpdate extends Component {
  state = {
    title: "",
    body: "",
    how_many_people: ""
  };

  componentDidMount() {
    console.log("Detail ComponentDidMount");
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
          how_many_people: data.how_many_people
        });
      })
      .catch(err => console.log(err));
  }
  async updateStudy(id, data) {
    await api
      .updatePost("study", id, data)
      .then(result => console.log("정상적으로 update됨.", result))
      .catch(err => console.log(err));
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handlingSubmit = async event => {
    event.preventDefault(); //event의 디폴트 기능(새로고침 되는 것 등..) -> 막는다.
    this.updateStudy(this.props.match.params.id, {
      title: this.state.title,
      body: this.state.body,
      how_many_people: this.state.how_many_people
    });
    this.setState({ title: "", content: "", how_many_people: "" });
    // this.getPosts()
    document.location.href = "/study";
  };

  render() {
    return (
      <Container maxWidth="lg" className="PostingSection">
        <Paper className="PostingPaper">
          <h2>Update Study</h2>
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
              name="how_many_people"
              value={this.state.how_many_people}
              onChange={this.handlingChange}
              required="required"
              placeholder="how_many_people"
            />

            <button type="submit">제출</button>
          </form>

          <Link to="/study">Cancle</Link>
        </Paper>
      </Container>
    );
  }
}

export default StudyUpdate;
