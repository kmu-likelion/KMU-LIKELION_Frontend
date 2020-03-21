import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import API from "../../../api/SessionAPI";
// import SubmissionFrom from "../../board/session/SubmissionForm";

import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction
} from "@material-ui/core";
import {
  withStyles,
  Typography,
  Divider,
  Button,
  IconButton
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AssignmentIcon from "@material-ui/icons/Assignment";

const useStyles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  list: {
    borderRadius: "5px"
  }
});

class SubmissionView extends Component {
  state = {
    user_id: window.sessionStorage.getItem("id"),
    modalFlag: false
  };

  componentDidMount() {
    // this.props.assignmentList.map(assignment => {
    //   this.getSubmissionStatus(this.state.user_id, assignment.id);
    // });
  }

  getSubmissionStatus = async (user_id, assignment_id) => {
    await API.getSubmitStatusWithUser(user_id, assignment_id).then(res => {
      console.log(res.data);
    });
  };

  /*
  getSubmission(user_id, assignment_id) {
    // console.log("get submission api 실행.");
    return axios.get(
      `board/submission/?user_id=${user_id}&lecture=${assignment_id}`
    );
  },
  
  */

  getSubmissionInfo = async assignment_id => {
    await API.getSubmission(this.state.user_id, assignment_id).then(res => {
      console.log(res.data);
    });
  };

  get render() {
    const { classes, date, index, assignmentList, title } = this.props;
    const pub_date = moment(date).format("YYYY-MM-DD");

    return (
      <>
        <ExpansionPanel key={index}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            <Typography className={classes.heading}>{title}</Typography>
            <Typography className={classes.secondaryHeading}>
              {pub_date}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ flexDirection: "column" }}>
            {assignmentList.map((assign, index) => (
              <List component="nav" aria-label="contacts" key={index}>
                <ListItem
                  button
                  component={Link}
                  to={`/assignment/detail/${assign.id}`}
                  className={classes.list}
                >
                  <ListItemAvatar>
                    <AssignmentIcon />
                  </ListItemAvatar>
                  <ListItemText
                    primary={assign.title}
                    secondary={assign.body}
                  />
                  <ListItemSecondaryAction>
                    <IconButton aria-label="cart"></IconButton>
                  </ListItemSecondaryAction>
                </ListItem>

                <Divider variant="inset" />
              </List>
            ))}
          </ExpansionPanelDetails>
          <ExpansionPanelActions>
            <Button component={Link} to="" color="primary">
              세션 보러가기
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </>
    );
  }
}

export default withStyles(useStyles)(SubmissionView);
