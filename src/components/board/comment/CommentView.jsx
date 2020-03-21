import React, { Component } from "react";
import { Link } from "react-router-dom";

import moment from "moment";
import api from "../../../api/CommentAPI";
import CommentNew from "./CommentNew";

//@material-ui
import {
  Avatar,
  Typography,
  IconButton,
  Divider,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction
} from "@material-ui/core";

import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import SettingsIcon from "@material-ui/icons/Settings";

export default class CommentView extends Component {
  state = {
    is_update: false,
    request_user: ""
  };

  UNSAFE_componentWillMount() {
    this.setState({
      request_user: window.sessionStorage.getItem("id")
    });
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handlingDelete = async (target, id) => {
    if (window.confirm("댓글을 삭제하시겠습니까?") === true) {
      await api.deleteComment(target, id);
      this.props.getComments();
    }
  };

  flagChange = () => {
    this.setState({
      is_update: false
    });
  };

  render() {
    const {
      user_id,
      author,
      update_date,
      body,
      comment_id,
      board_id,
      url,
      getComments
    } = this.props;

    const updateDate = moment(update_date).format("MM/DD hh:mm");

    if (this.state.is_update) {
      return (
        <CommentNew
          board_id={board_id}
          url={url}
          editFlag={this.state.is_update}
          body={body}
          user_id={user_id}
          comment_id={comment_id}
          getComments={getComments}
          flagChange={this.flagChange}
        />
      );
    } else {
      return (
        <List component="nav" aria-label="contacts">
          <ListItem>
            <ListItemAvatar>
              <IconButton component={Link} to={`/Mypage/${author.username}`}>
                <Avatar alt="comment-author" src={author.img} />
              </IconButton>
            </ListItemAvatar>
            <ListItemText
              primary={body}
              secondary={
                <>
                  {`${author.name}(${author.username})`}
                  <Typography variant="caption"> {updateDate}</Typography>
                </>
              }
            />
            <ListItemSecondaryAction>
              {user_id === Number(window.sessionStorage.getItem("id")) ? (
                <>
                  <PopupState variant="popover" popupId="popup-menu">
                    {popupState => (
                      <>
                        <IconButton
                          style={{ color: "white" }}
                          {...bindTrigger(popupState)}
                        >
                          <SettingsIcon color="primary" />
                        </IconButton>
                        <Menu {...bindMenu(popupState)} style={{ padding: 10 }}>
                          <MenuItem
                            onClick={e => {
                              popupState.close();
                              this.setState({
                                is_update: true,
                                update_body: body
                              });
                            }}
                            style={{ color: "blue" }}
                          >
                            수정
                          </MenuItem>
                          <MenuItem
                            onClick={e => {
                              popupState.close();
                              this.handlingDelete(url, comment_id);
                            }}
                            style={{ color: "red" }}
                          >
                            삭제
                          </MenuItem>
                        </Menu>
                      </>
                    )}
                  </PopupState>
                </>
              ) : (
                <></>
              )}
            </ListItemSecondaryAction>
          </ListItem>
          <Divider variant="inset" />
        </List>
      );
    }
  }
}
