import React, { Component } from "react";
import api from "../../../api/SessionAPI";
import SubmissionForm from "./SubmissionForm";
import moment from "moment";

import Viewer from "../../Viewer";
//@material-ui;
import {Button, Chip, Typography, Divider} from "@material-ui/core";
import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanelActions} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default class AssignmentView extends Component {
  state = {
    tab: "",
    userId: "",
    seletedAssignmentId: "",
    submissionInfo: "",
    editFlag: false,
    submitInfo: {},
    isSubmistted: false,
    modalFlag: false
  };

  UNSAFE_componentWillMount() {
    this.setState({
      userId: window.sessionStorage.getItem("id")
    });
    this.getUserSubmission();
  }

  getUserSubmission = () => {
    api
      .getSubmission(this.state.userId, this.props.assignment.id)
      .then(res => {
        let submitted;
        if (res.data.length === 0) {
          submitted = false;
        } else {
          submitted = true;
        }
        this.setState({
          submissionInfo: res.data,
          isSubmistted: submitted
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

  renderSubmissionBtn = assignment_id => {
    let renderBtn = <></>;

    switch(this.state.isSubmistted) {
      case true: 
        
        renderBtn = (
        <>
          이미 제출되었습니다. <br/>
          <Button
          color="secondary"
          onClick={event => this.modalOpen(assignment_id)}
        >
          제출수정
        </Button>
        </>);
        break;
      default:
        renderBtn = (
        <Button
          color="primary"
          onClick={event => this.modalOpen(assignment_id)}
        >
          과제제출
        </Button>);
        break;    
    }
    return renderBtn;
  }

  render() {
    const { assignment, sessionId, index } = this.props;
    const deadline = moment(assignment.deadline).format("YY-MM-DD HH:DD");
    
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

          <ExpansionPanelDetails style={{ flexDirection: "column"}}>

            <Typography variant="body2" color="primary">
                제출 기한 : {deadline}  
            </Typography>
            <Divider style={{marginTop: 10, marginBottom: 20}} />
            
            <Viewer value={String(assignment.body)}/>
            
            <div style={{ marginTop: 30 }}>
              {this.slice(assignment.score_types).map(type => (
                <Chip
                  key={`chip-${type}`}
                  label={type}
                  name={type}
                  color="primary"
                  style={{ marginRight: 5 }}
                />
              ))}
            </div>
          </ExpansionPanelDetails>

          <ExpansionPanelActions>
            {/* 제출여부에 따른 과제제출버튼 */}
            {this.renderSubmissionBtn(assignment.id)}

            {window.sessionStorage.getItem("user_type") < 3 ? (
              <>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={e =>
                    this.handlingDelete(e, assignment.id, sessionId)
                  }
                >
                  과제삭제
                </Button>
              </>
            ) : (
              <></>
            )}
          </ExpansionPanelActions>
        </ExpansionPanel>

        <SubmissionForm
          open={this.state.modalFlag}
          handlingClose={this.modalClose}
          assignmentId={assignment.id}
          editFlag={this.state.isSubmistted}
          getUserSubmission={this.getUserSubmission}
        />
      </>
    );
  }
}
