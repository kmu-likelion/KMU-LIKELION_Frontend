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
import { withStyles, Typography, Divider, Button } from "@material-ui/core";

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

class AssignmentView extends Component {
  state = {
    user_id: window.sessionStorage.getItem("id"),
    submitStatus: [],
    modalFlag: false
  };

  componentDidMount() {
    this.props.assignmentList.map((assignment, index) => {
      this.getSubmissionStatus(this.state.user_id, assignment.id, index);
      return null;
    });
  }

  getSubmissionStatus = async (user_id, assignment_id, index) => {
    await API.getSubmitStatusWithUser(user_id, assignment_id)
      .then(res => {
        // console.log(res.data);
        var status = this.state.submitStatus;
        status.push(res.data.status);
        this.setState({ submitStatus: status });
      })
      .catch(err => console.log(err));
  };

  renderStatus = index => {
    const keyword = {
      COMPLETE: "제출됨",
      UNQUALIFIED: "권한이 없습니다.",
      NOT_SUBMIT: "미제출",
      LATE: "마감 후 제출"
    };
    let render = <></>;

    switch (this.state.submitStatus[index]) {
      case "COMPLETE":
        render = (
          <Typography variant="body2" color="primary">
            {keyword["COMPLETE"]}
          </Typography>
        );
        break;
      case "NOT_SUBMIT":
        render = (
          <Typography variant="body2" color="secondary">
            {keyword["NOT_SUBMIT"]}
          </Typography>
        );
        break;
      case "LATE":
        render = (
          <Typography variant="body2" color="secondary">
            {keyword["LATE"]}
          </Typography>
        );
        break;

      default:
        break;
    }
    return render;
  };

  render() {
    const {
      classes,
      date,
      index,
      assignmentList,
      title,
      sessionId
    } = this.props;
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
                  to={`/assignment/submission/${assign.id}`}
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
                    {this.renderStatus(index)}
                  </ListItemSecondaryAction>
                </ListItem>

                <Divider variant="inset" />
              </List>
            ))}
          </ExpansionPanelDetails>
          <ExpansionPanelActions>
            <Button
              component={Link}
              to={`/session/detail/${sessionId}`}
              color="primary"
            >
              세션 보러가기
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </>
    );
  }
}

export default withStyles(useStyles)(AssignmentView);
