import React from "react";
// import { Link } from "react-router-dom";
import api from "../../../api/SessionAPI";
import AssignmentView from "./AssignmentView";

import { Typography, withStyles } from "@material-ui/core";

const useStyles = theme => ({
  root: {
    width: "100%",
    maxWidth: 750,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 500
  }
});

class MySubmission extends React.Component {
  state = {
    sessionList: []
  };

  componentDidMount() {
    this.getAssignments(window.sessionStorage.getItem("cardinal_number"));
  }

  getAssignments = async cardinal_num => {
    await api.getSessionsWithAlum(cardinal_num).then(res => {
      console.log(res.data);
      this.setState({ sessionList: res.data.results });
    });
  };

  render() {
    // const { classes } = this.props;
    return (
      <>
        <Typography variant="h4">My Submission</Typography>
        <hr />
        <br />
        {this.state.sessionList.map((session, index) => (
          <AssignmentView
            key={index}
            index={index}
            title={session.title}
            date={session.update_date}
            assignmentList={session.assignments}
            sessionId={session.id}
          />
        ))}
      </>
    );
  }
}

export default withStyles(useStyles)(MySubmission);
