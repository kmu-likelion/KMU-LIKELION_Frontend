import React from "react";
import { Route } from "react-router-dom";
import AssignmentStore from "../store/AssignmentStore";
import AssignmentDetail from "../components/assignment/AssignmentDetail";
import AssignmentList from "../components/assignment/AssignmentList";

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
          path={`${this.props.match.path}`}
          component={AssignmentList}
        />
        <Route
          path={`${this.props.match.path}/detail/:id`}
          component={AssignmentDetail}
          id="number"
        />
      </AssignmentStore.Provider>
    );
  }
}

export default AssignmentRouter;
