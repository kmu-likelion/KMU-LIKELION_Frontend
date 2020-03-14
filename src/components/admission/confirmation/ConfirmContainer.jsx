import React, { Component } from "react";
import CheckIn from "./CheckIn";
import ConfirmApplication from "./ConfirmApplication";
import AdmissionStore from "../../../store/AdmissionStore";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

class ConfirmContainer extends Component {
  static contextType = AdmissionStore;

  setFlag = () => {
    this.setState((prevState, props) => {
      return { is_recorded: !this.state.is_recorded };
    });
  };

  render() {
    return (
      <Container maxWidth="lg" className="PostingSection">
        <Paper className="PostingPaper">
          {this.context.state.isAccessed === false ? (
            <CheckIn />
          ) : (
            <ConfirmApplication />
          )}
        </Paper>
      </Container>
    );
  }
}

export default ConfirmContainer;
