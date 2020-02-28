import React, { Component } from "react";
import { Link } from "react-router-dom";
// import moment from "moment";

import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";

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

class ListView extends Component {
  render() {
    const { classes, index, assignmentList, title } = this.props;
    // const { postInfo } = this.props;
    // const pubDate = moment(postInfo.pub_date).format("YYYY-MM-DD HH:MM");
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
          {assignmentList.map(assign => (
            <List component="nav" aria-label="contacts">
              <ListItem
                button
                component={Link}
                to={`/assignment/detail/${assign.id}`}
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
        <ExpansionPanelActions></ExpansionPanelActions>
      </ExpansionPanel>
    );
  }
}

export default withStyles(useStyles)(ListView);
