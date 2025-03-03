import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from "@material-ui/core";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction
} from "@material-ui/core";
import { Typography, Divider, IconButton } from "@material-ui/core";

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

class ListView extends Component {
  render() {
    const { classes, index, assignmentList, title } = this.props;

    return (
      <ExpansionPanel key={index}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography className={classes.heading}>{index + 1}주차</Typography>
          <Typography className={classes.secondaryHeading}>{title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ flexDirection: "column" }}>
          {assignmentList.map((assign, index) => (
            <List component="nav" aria-label="contacts" key={index}>
              <ListItem
                button
                component={Link}
                to={`/assignment/evaluation/${assign.id}`}
                className={classes.list}
              >
                <ListItemAvatar>
                  <AssignmentIcon />
                </ListItemAvatar>
                <ListItemText primary={assign.title} secondary={assign.body} />
                <ListItemSecondaryAction>
                  <IconButton aria-label="cart"></IconButton>
                </ListItemSecondaryAction>
              </ListItem>

              <Divider variant="inset" />
            </List>
          ))}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default withStyles(useStyles)(ListView);
