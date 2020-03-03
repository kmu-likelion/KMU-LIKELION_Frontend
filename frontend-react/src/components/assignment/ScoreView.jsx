import React, { Component } from "react";
import { Link } from "react-router-dom";
// import moment from "moment";

import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import AssignmentIcon from "@material-ui/icons/Assignment";
import IconButton from "@material-ui/core/IconButton";

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

class ScoreView extends Component {
  render() {
    const { classes, submissionId, scores } = this.props;
    return (
      <List component="nav" aria-label="contacts">
        <ListItem className={classes.list}>
          <ListItemAvatar>
            <AssignmentIcon />
          </ListItemAvatar>
          {scores.map(score => (
            <ListItemText
              primary={score.score_type}
              secondary={`${score.score} / 100`}
            />
          ))}
          {/* <ListItemText primary={assign.title} secondary={assign.body} /> */}
          <ListItemSecondaryAction>
            <IconButton aria-label="cart"></IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <Divider variant="inset" />
      </List>
    );
  }
}

export default withStyles(useStyles)(ScoreView);
