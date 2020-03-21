import React from "react";
import { Route } from "react-router-dom";
import AssignmentStore from "../store/AssignmentStore";
import EvaluationDetail from "../components/assignment/evaluation/AssignmentDetail";
import EvaluationList from "../components/assignment/evaluation/AssignmentList";
import SubmissionDetail from "../components/assignment/submission/SubmissionDetail";
// import SubmissionForm from "../components/board/session/SubmissionForm";

class AssignmentRouter extends React.Component {
  state = {
    isAccessed: false,
    applicationId: ""
  };

  updateValue = (key, val) => {
    this.setState({ [key]: val });
  };

  render() {
    return (
      <AssignmentStore.Provider
        value={{ state: this.state, updateValue: this.updateValue }}
      >
        <Route
          exact
          path={`${this.props.match.path}/evaluation`}
          component={EvaluationList}
        />
        <Route
          path={`${this.props.match.path}/evaluation/:id`}
          component={EvaluationDetail}
          id="number"
        />
        <Route
          path={`${this.props.match.path}/submission/:assignmentId`}
          component={SubmissionDetail}
          assignmentId="number"
        />
      </AssignmentStore.Provider>
    );
  }
}

export default AssignmentRouter;
