import React, { Component } from "react";
import api from "../../../api/BoardAPI";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

// import moment from 'moment';

class NoticeUpdate extends Component {
  state = {
    title: "",
    body: "",
    run_date: ""
  };

  componentDidMount() {
    console.log("New ComponentDidMount");
    this.getNotice();
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
          run_date: data.run_date
        });
      })
      .catch(err => console.log(err));
  }

  async updateNotice(id, data) {
    await api
      .updatePost("notice", id, data)
      .then(result => console.log("정상적으로 update됨.", result))
      .catch(err => console.log(err));
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handlingSubmit = async event => {
    event.preventDefault(); //event의 디폴트 기능(새로고침 되는 것 등..) -> 막는다.
    this.updateNotice(this.props.match.params.id, {
      title: this.state.title,
      body: this.state.body,
      run_date: this.state.run_date
    });
    this.setState({ title: "", content: "", run_date: "" });
    // this.getPosts()
    document.location.href = "/notice";
  };

  render() {
    return (
      <Container maxWidth="lg" className="PostingSection">
        <Paper className="PostingPaper">
          <h2>Update Notice</h2>
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
              type="date"
              name="run_date"
              value={this.state.run_date}
              onChange={this.handlingChange}
              required="required"
              placeholder="Run Date"
            />

            <button type="submit">제출</button>
          </form>

          <Link to="/notice">Cancel</Link>
        </Paper>
      </Container>
    );
  }
}

export default NoticeUpdate;
