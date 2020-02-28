import React from "react";
import MemberList from "./MemberList";
import GradingView from "./GradingView";
import { getAllUser } from "../../api/AuthAPI";
import api from "../../api/SessionAPI";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

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
      console.log("멤버의 과제제출물 가져옴 ", res.data);
      this.setState({
        submissionInfo: res.data
      });
    });
  };

  getMemberList = async () => {
    await getAllUser().then(res => {
      console.log("기수 가져옴 ", res.data);
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
            <MemberList
              selectMember={this.selectMember}
              memberList={this.state.memberList}
            />
          </Grid>
          <Grid item sm={7} style={{ textAlign: "center" }}>
            <Typography>제출물 채점</Typography>
            {/* 디테일 평가 */}

            <GradingView
              memberId={this.state.selectedMemberId}
              member={this.state.selectedMember}
              assignmentId={assignmentId}
              submissionInfo={this.state.submissionInfo}
            />
          </Grid>
        </Grid>
      </>
    );
  }
}

export default GradingContainer;
