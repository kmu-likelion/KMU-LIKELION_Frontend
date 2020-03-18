import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { withStyles } from "@material-ui/core/styles";
import {List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction} from "@material-ui/core";
import {Avatar, Divider, IconButton, Badge} from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";


const useStyles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
});

class PostView extends Component {
  render() {
    const { classes } = this.props;
    const { postInfo, board_name } = this.props;
    const author = postInfo.author;
    const pubDate = moment(postInfo.update_date).format("YY/MM/DD hh:mm");

    let linkUrl = "";
    if (board_name !== "study") {
      linkUrl = `/${board_name}/detail/${postInfo.id}`;
    } else {
      linkUrl = `/${board_name}/${postInfo.group_name}/detail/${postInfo.id}`;
    }

    let renderItem = "";
    switch (board_name) {
      case "session":
        renderItem = (
          <>
            <ListItemText primary={postInfo.title} secondary={pubDate} />
            <ListItemSecondaryAction>
              <IconButton aria-label="cart">
                <Badge
                  color="secondary"
                  badgeContent={postInfo.assignments.length}
                  showZero
                >
                  <AssignmentIcon />
                </Badge>
              </IconButton>
            </ListItemSecondaryAction>
          </>
        );
        break;

      case "career":
        renderItem = (
          <>
            <ListItemText primary={postInfo.title} secondary={pubDate} />
          </>
        );
        break;

      default:
        renderItem = (
          <>
            <ListItemText
              primary={postInfo.title}
              secondary={`${author.name}(${author.username})`}
            />
            <ListItemSecondaryAction>
              <small>{pubDate}</small>
            </ListItemSecondaryAction>
          </>
        );
        break;
    }

    return (
      <List component="nav" className={classes.root} aria-label="contacts">
        <ListItem button component={Link} to={linkUrl}>
          <ListItemAvatar>
            <Avatar alt="Author Name" src={author.img} />
          </ListItemAvatar>
          {renderItem}
        </ListItem>
        <Divider variant="inset" />
      </List>
    );
  }
}

export default withStyles(useStyles)(PostView);
