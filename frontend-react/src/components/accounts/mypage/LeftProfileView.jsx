import React, { Component } from "react";
// import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";

export default class LeftProfileView extends Component {
  render() {
    const { username, sns_id, user_img } = this.props;

    return (
      <Paper elevation={10} className="LeftProfile">
        <div>
          <img
            src={user_img}
            alt="Myprofile"
            style={{ width: "70%", padding: "5px" }}
          />
          <br />
          <br />
          <h1>{username}</h1>
          <h5>@{sns_id}</h5>
          <br />
        </div>

        <MenuList>
          <hr />
          <MenuItem
            onClick={event => this.props.handlingSubmit(event, "Myprofile")}
          >
            <ListItemIcon>
              <SendIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">My Profile</Typography>
          </MenuItem>

          <MenuItem
            onClick={event => this.props.handlingSubmit(event, "MyLike")}
          >
            <ListItemIcon>
              <PriorityHighIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">My Liked Post</Typography>
          </MenuItem>

          <MenuItem
            onClick={event => this.props.handlingSubmit(event, "MyPost")}
          >
            <ListItemIcon>
              <DraftsIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              My Post
            </Typography>
          </MenuItem>

          <MenuItem
            onClick={event => this.props.handlingSubmit(event, "MyComment")}
          >
            <ListItemIcon>
              <DraftsIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              My Comment
            </Typography>
          </MenuItem>

          <MenuItem
            onClick={event => this.props.handlingSubmit(event, "MyMentoring")}
          >
            <ListItemIcon>
              <DraftsIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              My Mentoring
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={event => this.props.handlingSubmit(event, "MyStudyGroup")}
          >
            <ListItemIcon>
              <DraftsIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              My StudyGroup
            </Typography>
          </MenuItem>
        </MenuList>
      </Paper>
    );
  }
}
