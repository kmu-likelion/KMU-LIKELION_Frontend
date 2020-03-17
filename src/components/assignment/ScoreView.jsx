import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import {List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction} from "@material-ui/core";
import {Divider, IconButton} from "@material-ui/core";
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

class ScoreView extends Component {
  render() {
    const { classes, scores, totalScore } = this.props;
    return (
      <List component="nav" aria-label="contacts">
        <ListItem className={classes.list}>
          <ListItemAvatar>
            <AssignmentIcon />
          </ListItemAvatar>
          <ListItemText primary="총 점수" secondary={`${totalScore} / 100`} />
          {scores.map(score => (
            <ListItemText
              primary={score.score_type}
              secondary={`${score.score} / 100`}
            />
          ))}
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
