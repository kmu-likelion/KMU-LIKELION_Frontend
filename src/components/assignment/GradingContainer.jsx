import React from "react";
import { getAllUser } from "../../api/AuthAPI";
import api from "../../api/SessionAPI";

import MemberList from "./MemberList";
import GradingView from "./GradingView";

import {Grid, List, Typography} from "@material-ui/core";

class GradingContainer extends React.Component {
  state = {
    assignmentId: "",
    tabValue: 0,
    assignmentInfo: {},
    selectedMember: {},
    selectedMemberId: "",
    memberList: [],
    submissionInfo: []
  };

  componentDidMount() {
    this.getMemberList();
  }

  selectMember = id => {
    let members = this.state.memberList;
    let index = members.findIndex(x => x.id === id);

    this.setState({
      selectedMember: members[index],
      selectedMemberId: members[index].id
    });
    this.getSubmission(id, this.props.assignmentId);
  };

  getSubmission = async (userId, assignmentId) => {
    await api.getSubmission(userId, assignmentId).then(res => {
      this.setState({
        submissionInfo: res.data
      });
    });
  };

  getMemberList = async () => {
    await getAllUser().then(res => {
      this.setState({
        memberList: res.data
      });
    });
  };

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { assignmentId } = this.props;
    return (
      <>
        <Grid container spacing={3}>
          <Grid item sm={5} style={{ textAlign: "center" }}>
            <Typography>MEMBER LIST</Typography>

            <List subheader={<li />}>
              {this.state.memberList.map(member => {
                return (
                  <MemberList
                    key={member.id}
                    selectMember={this.selectMember}
                    member={member}
                    assignmentId={assignmentId}
                  />
                );
              })}
            </List>
          </Grid>
          <Grid item sm={7} style={{ textAlign: "center" }}>
            <Typography variant="body1">
              제출물 정보
            </Typography>

            <GradingView
              memberId={this.state.selectedMemberId}
              member={this.state.selectedMember}
              assignmentId={assignmentId}
              submissionInfo={this.state.submissionInfo}
              getSubmission={this.getSubmission}
            />
          </Grid>
        </Grid>
      </>
    );
  }
}

export default GradingContainer;
