import React, { Component } from "react";
import api from "../../../api/BoardAPI";

import { Link } from "react-router-dom";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class PostUpdate extends Component {
  state = {
    title: "",
    body: "",
    id: "",
    study_type: "",
    open: false
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
          study_type: data.study_type
        });
      })
      .catch(err => console.log(err));
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handlingSubmit = async event => {
    event.preventDefault();
    await api
      .updatePost("study", this.state.id, {
        title: this.state.title,
        body: this.state.body,
        study_type: this.state.study_type
      })
      .then(result => console.log("정상적으로 update됨.", result))
      .catch(err => console.log(err));

    this.setState({ title: "", content: "" });
    // this.getPosts()
    // document.location.href = "/study";
    this.props.history.push(
      `/study/${this.props.match.params.group}/detail/${this.state.id}`
    );
  };

  render() {
    return (
      <Container maxWidth="lg" className="PostingSection">
        <Paper className="PostingPaper">
          <h2>Update Post</h2>
          <form onSubmit={this.handlingSubmit} className="PostingForm">
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={this.state.open}
              onClose={e => this.setState({ open: false })}
              name="study_type"
              onOpen={e => this.setState({ open: true })}
              value={this.state.study_type}
              onChange={e => this.setState({ study_type: e.target.value })}
            >
              <MenuItem value={0}>공식모임</MenuItem>
              <MenuItem value={1}>스터디</MenuItem>
              <MenuItem value={2}>기타</MenuItem>
            </Select>
            <br />
            <TextField
              id="standard-basic"
              name="title"
              label="title"
              value={this.state.title}
              onChange={this.handlingChange}
              required
            />
            <br />
            <TextField
              id="standard-basic"
              label="body"
              name="body"
              value={this.state.body}
              onChange={this.handlingChange}
              multiline
              rows="4"
              required
            />
            <br />
            <br />
            <Button variant="contained" color="primary" type="submit">
              작성
            </Button>
          </form>

          <Link to="/study">Cancel</Link>
        </Paper>
      </Container>
    );
  }
}

export default PostUpdate;
