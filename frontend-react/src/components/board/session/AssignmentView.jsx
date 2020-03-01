import React, { Component } from "react";
import api from "../../../api/SessionAPI";
import SubmissionForm from "./SubmissionForm";

//@material-ui;
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import Divider from "@material-ui/core/Divider";

export default class AssignmentView extends Component {
  state = {
    tab: "",
    userId: "",
    seletedAssignmentId: "",
    submissionInfo: "",
    editFlag: false,
    submitInfo: {},
    modalFlag: false
  };

  componentDidMount() {
    this.setState({
      userId: window.sessionStorage.getItem("id")
    });
    this.getUserSubmission();
  }

  getUserSubmission = () => {
    api
      .getSubmission(this.state.userId, this.props.assignment.id)
      .then(res => {
        console.log("request user의 과제제출정보 가져옴.", res.data);
        console.log(res.data.length);
        let submitted;
        if (res.data.length === 0) {
          submitted = false;
        } else {
          submitted = true;
        }
        this.setState({
          submissionInfo: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handlingDelete = async (event, taskId) => {
    if (window.confirm("과제를 삭제하시겠습니까?") === true) {
      await api
        .deleteAssignment(taskId)
        .then(res => {
          console.log("과제삭제 실행.", res.data);
          this.props.getAssignments();
        })
        .catch(err => console.log(err));
    }
  };

  modalOpen = () => {
    this.setState({
      modalFlag: true
    });
  };

  modalClose = () => {
    this.setState({
      modalFlag: false
    });
  };

  slice = scoreTypes => {
    return scoreTypes.split(",");
  };

  render() {
    const { assignment, sessionId, index } = this.props;

    console.log(assignment);
    return (
      <>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6">
              과제{index + 1} {assignment.title}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ flexDirection: "column" }}>
            <div>
              <Typography variant="body1" style={{ margin: 15 }}>
                {assignment.body}
              </Typography>
            </div>
            <div>
              {this.slice(assignment.score_types).map(type => (
                <Chip
                  key={`chip-${type}`}
                  label={type}
                  name={type}
                  color="secondary"
                  style={{ marginRight: 5 }}
                />
              ))}
            </div>
          </ExpansionPanelDetails>
          <ExpansionPanelActions>
            {/* {this.assignment ? (
              <>
                과제를 이미 제출하셨습니다!
                <Button
                  color="primary"
                  onClick={event => this.modalOpen(assignment.id)}
                >
                  과제 수정제출
                </Button>
              </>
            ) : (
              <Button
                color="primary"
                onClick={event => this.modalOpen(assignment.id)}
              >
                과제제출
              </Button>
            )} */}

            <Button
              color="secondary"
              onClick={e => this.handlingDelete(e, assignment.id, sessionId)}
            >
              과제삭제
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>

        <SubmissionForm
          open={this.state.modalFlag}
          handlingClose={this.modalClose}
          assignmentId={assignment.id}
          editFlag={this.state.editFlag}
          getUserSubmission={this.getUserSubmission}
        />
      </>
    );
  }
}
