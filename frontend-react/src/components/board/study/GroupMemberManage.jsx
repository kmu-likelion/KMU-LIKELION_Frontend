import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

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

