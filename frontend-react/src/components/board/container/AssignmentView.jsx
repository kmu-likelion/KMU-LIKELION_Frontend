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
import Divider from "@material-ui/core/Divider";

export default class AssignmentView extends Component {
  state = {
    tab: "",
    modalFlag: false
  };

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handlingDelete = async (event, taskId, sessionId) => {
    if (window.confirm("과제를 삭제하시겠습니까?") === true) {
      await api
        .deleteAssignment(taskId)
        .then(res => {
          console.log("과제삭제 실행.", res.data);
          this.props.getAssignments(sessionId);
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
    const { assignments, sessionId } = this.props;

    console.log(assignments);
    return (
      <>
        {assignments.map((task, index) => (
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6">
                과제{index + 1} {task.title}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ flexDirection: "column" }}>
              <div>
                <Typography variant="body1" style={{ margin: 15 }}>
                  {task.body}
                </Typography>
              </div>
              {/* <div style={{ width: "100%" }}>
                <Divider />
              </div> */}
              <div>
                {this.slice(task.score_types).map(type => (
                  <Chip
                    key={`chip-${type}`}
                    label={type}
                    // onDelete={event => this.deleteScoreType(type)}
                    name={type}
                    color="secondary"
                    style={{ marginRight: 5 }}
                  />
                ))}
              </div>
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
              <Button color="primary" onClick={event => this.modalOpen()}>
                과제제출
              </Button>
              <Button
                color="secondary"
                onClick={e => this.handlingDelete(e, task.id, sessionId)}
              >
                과제삭제
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
        ))}
        {/* 
        <Tab.Container defaultActiveKey={0}>
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                {assignments.map((task, index) => (
                  <Nav.Item>
                    <Nav.Link eventKey={index}>{task.title}</Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                {assignments.map((task, index) => (
                  <Tab.Pane eventKey={index}>
                    {task.body}
                    <br />
                    <Button color="primary" onClick={event => this.modalOpen()}>
                      과제제출
                    </Button>
                    <Button
                      color="secondary"
                      onClick={e => this.handlingDelete(e, task.id, sessionId)}
                    >
                      과제삭제
                    </Button>
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container> */}
        <SubmissionForm
          open={this.state.modalFlag}
          handlingClose={this.modalClose}
          sessionId={sessionId}
        />
      </>
    );
  }
}
