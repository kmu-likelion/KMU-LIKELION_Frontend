import React, { Component } from "react";
import api from "../../../api/GroupAPI";
import { Link } from "react-router-dom";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
//import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";



export default class GroupMemberManage extends Component {
  render() {
    return (
      <Container maxWidth="lg" className="main-container">
        <Paper className="Paper">
          그룹 멤버 관리
        </Paper>
      </Container>
    );
  }
}

