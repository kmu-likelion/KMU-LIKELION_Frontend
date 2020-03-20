import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/BoardAPI";
import Editor from "../../Editor";

import {
  Container,
  MenuItem,
  Select,
  TextField,
  Button,
  Typography
} from "@material-ui/core";

class PostUpdate extends Component {
  state = {
    title: "",
    body: "",
    id: "",
    study_type: "",
    open: false
  };

  componentDidMount() {
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

  handlingEditorChange = ({ html, text }) => {
    this.setState({ body: text });
  };

  handlingSubmit = async event => {
    event.preventDefault();
    await api
      .updatePost("study", this.state.id, {
        title: this.state.title,
        body: this.state.body,
        study_type: this.state.study_type
      })
      .then(res => {
        this.setState({ title: "", content: "" });
        this.props.history.push(
          `/study/${this.props.match.params.group}/detail/${this.state.id}`
        );
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container
        maxWidth="lg"
        className="PostingSection"
        style={{ padding: 30 }}
      >
        <Typography variant="h4"> Update Post </Typography>
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
          </Select>
          <br />
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
          <br />
          <Editor
            value={this.state.body}
            name="body"
            handlingChange={this.handlingEditorChange}
          />
          <br />
          <br />

          <Button color="primary" component={Link} to="/study">
            뒤로가기
          </Button>

          <Button variant="contained" color="primary" type="submit">
            저장
          </Button>
        </form>
      </Container>
    );
  }
}

export default PostUpdate;
