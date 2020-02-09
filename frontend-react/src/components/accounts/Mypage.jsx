import React, { Component } from "react";
import { getUser } from "../../api/api_auth";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

class Mypage extends Component {
  state = {
    id: "",
    username: "",
    password: "",
    major: "",
    student_id: "",
    start_num: "",
    sns_id: "",
    email: "",
    token: ""
  };

  componentDidMount() {
    console.log("New ComponentDidMount");
    // const _id = window.sessionStorage.getItem("id");
    const _id = this.props.match.params.id;
    this.getUser(_id);
    // console.log(window.sessionStorage.getItem("token"));
  }

  async getUser(userId) {
    await getUser(userId)
      .then(res => {
        const userData = res.data;
        console.log(userData);
        this.setState({
          id: userData.id,
          username: userData.username,
          major: userData.major,
          student_id: userData.student_id,
          start_num: userData.start_number,
          sns_id: userData.sns_id,
          email: userData.email
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container maxWidth="lg" className="PostingSection">
        <Paper className="PostingPaper">
          Mypage <br />
          <br />
          ID {this.state.id} <br />
          Username {this.state.username} <br />
          Email {this.state.email} <br />
          학과 {this.state.major} <br />
          멋쟁이사자 {this.state.start_num} <br />
          학번 {this.state.student_id} <br />
          SNS {this.state.sns_id} <br />
          <br />
        </Paper>
      </Container>
    );
  }
}

export default Mypage;
