import React, { Component } from "react";

import JoinFormView from "./JoinFormView";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

class JoinForm extends Component {
  //   state = {
  //     name: "",
  //     phone_num: "",
  //     major: "",
  //     student_id: "",
  //     birth: "",
  //     sex: "",
  //     email: ""
  //   };

  componentDidMount() {
    console.log("New ComponentDidMount");
  }

  render() {
    return (
      <Container maxWidth="lg" className="PostingSection">
        <Paper className="PostingPaper">
          <JoinFormView />
        </Paper>
      </Container>
    );
  }
}

export default JoinForm;
