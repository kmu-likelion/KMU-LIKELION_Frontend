import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/SessionAPI";
import moment from "moment";

//@material-ui;
// import { Button, Chip, Typography,  } from "@material-ui/core";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";

export default class AssignmentView extends Component {
  state = {
    userId: "",
    submissionInfo: "",
    submitInfo: {}
  };

  // UNSAFE_componentWillMount() {
  //   this.setState({
  //     userId: window.sessionStorage.getItem("id")
  //   });
  // }

  handlingDelete = async (event, taskId) => {
    if (window.confirm("과제를 삭제하시겠습니까?") === true) {
      await api
        .deleteAssignment(taskId)
        .then(res => {
          this.props.getAssignments();
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    const { assignment } = this.props;
    const deadline = moment(assignment.deadline).format("YYYY-MM-DD HH:DD");

    return (
      <>
        <List
          component="nav"
          aria-label="contacts"
          style={{ borderRadius: "10px" }}
        >
          <ListItem
            button
            component={Link}
            to={`/assignment/submission/${assignment.id}`}
          >
            <ListItemAvatar>
              <AssignmentIcon />
            </ListItemAvatar>
            <ListItemText
              primary={assignment.title}
              secondary={`제출기한 : ${deadline}`}
            />
          </ListItem>

          <Divider variant="inset" />
        </List>
      </>
    );
  }
}
