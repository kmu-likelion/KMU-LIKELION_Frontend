import React, { Component } from "react";

import JoinBasicInfo from "./JoinFormBasic";
import JoinSubmit from "./JoinFormSubmit";
import JoinStore from "./joinStore";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

class JoinForm extends Component {
  state = {
    name: "",
    phoneNum: "",
    major: "",
    studentId: "",
    birth: "",
    sex: "",
    email: "",
    is_recorded: false
  };
  // JoinStore = this.state;
  setFlag = () => {
    this.setState((prevState, props) => {
      return { is_recorded: !this.state.is_recorded };
    });

    // this.setState({
    //   is_recorded: !this.state.is_recorded
    // });
  };

  componentDidMount() {
    console.log("New ComponentDidMount");
  }

  // componentDidUpdate() {
  //   console.log("test다");
  // }

  render() {
    return (
      <Container maxWidth="lg" className="PostingSection">
        <Paper className="PostingPaper">
          <JoinStore.Provider value={this.state}>
            {this.state.is_recorded === false ? (
              <JoinBasicInfo setFlag={this.setFlag} />
            ) : (
              <JoinSubmit />
            )}
          </JoinStore.Provider>
        </Paper>
      </Container>
    );
  }
}

export default JoinForm;
