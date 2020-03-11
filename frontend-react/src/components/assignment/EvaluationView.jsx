import React, { Component } from "react";

import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

export default class EvaluationView extends Component {
  state = {
    is_update: false,
    update_body: "",
    request_user: ""
  };

  componentWillMount() {
    this.setState({
      request_user: window.sessionStorage.getItem("id")
    });
  }

  render() {
    const { evaluator_name, evaluation, evaluation_pub_date } = this.props;

    return (
      <List component="nav" aria-label="contacts">
        <ListItem>
          <ListItemAvatar>
            <IconButton component={Link} to={`/Mypage/${evaluator_name}`}>
              <Avatar alt="EvaluatorImage" src="" />
            </IconButton>
          </ListItemAvatar>
          <ListItemText
            primary={<Typography component="pre">{evaluation}</Typography>}
            secondary={`[채점자] ${evaluator_name}`}
          />
          <ListItemSecondaryAction>
            <small>{evaluation_pub_date}</small>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider variant="inset" />
      </List>
    );
  }
}
