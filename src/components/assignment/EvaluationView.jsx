import React, { Component } from "react";
import { Link } from "react-router-dom";

import {List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction} from "@material-ui/core";
import {Divider, Typography, IconButton, Avatar} from "@material-ui/core";


export default class EvaluationView extends Component {
  state = {
    is_update: false,
    update_body: "",
    request_user: ""
  };

  UNSAFE_componentWillMount() {
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
