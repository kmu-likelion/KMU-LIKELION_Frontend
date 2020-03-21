import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import API from "../../../api/SessionAPI";
import Viewer from "../../Viewer";
import SubmissionForm from "./SubmissionForm";

// @material-ui
import { Container, Button, Typography, Chip } from "@material-ui/core";
import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead
} from "@material-ui/core";

class SubmissionDetail extends Component {
  state = {
    title: "",
    body: "",
    pub_date: "",
    scoreTypes: [],
    deadline: "",
    author: {},
    submissionInfo: {},
    isSubmitted: false,
    modalFlag: false
  };

  componentDidMount() {
    const assignment_id = this.props.match.params.assignmentId;
    this.getAssignmentInfo(assignment_id);
    this.getSubmissionInfo(assignment_id);
  }

  getAssignmentInfo = async assignmentId => {
    await API.getAssignment(assignmentId).then(res => {
      console.log(res.data);
      var scoretypes = res.data.score_types.split(",");

      this.setState({
        title: res.data.title,
        body: res.data.body,
        scoreTypes: scoretypes,
        pub_date: moment(res.data.pub_date).format("YYYY-MM-DD HH:MM"),
        deadline: moment(res.data.deadline).format("YYYY-MM-DD HH:MM"),
        author: res.data.author
      });
    });
  };

  getSubmissionInfo = async assignmentId => {
    await API.getSubmission(window.sessionStorage.getItem("id"), assignmentId)
      .then(res => {
        // console.log("제출 데이터", res.data);
        if (res.data.length === 0) {
          this.setState({
            isSubmitted: false
          });
        } else {
          this.setState({
            submissionInfo: res.data[0],
            isSubmitted: true
          });
        }
      })
      .catch(err => console.log(err));
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
    // this.getJoinDataWithId(this.context.state.applicationId);
  };

  render() {
    return (
      <Container maxWidth="lg">
        <Table className={"post-table"}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h5">과제 제출물 관리</Typography>
                <hr />
                <Typography variant="h6">{this.state.title}</Typography>
                <br />
                <Viewer value={String(this.state.body)} />
                <div style={{ marginTop: 30 }}>
                  {this.state.scoreTypes.map(type => (
                    <Chip
                      key={`chip-${type}`}
                      label={type}
                      name={type}
                      color="primary"
                      style={{ marginRight: 5 }}
                    />
                  ))}
                </div>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell className="post-body">
                {this.state.isSubmitted ? (
                  <>
                    <Typography variant="caption">
                      제출일자 :
                      {moment(this.state.submissionInfo.update_date).format(
                        "YYYY-MM-DD HH:MM"
                      )}
                    </Typography>
                    <Typography variant="body1">
                      {this.state.submissionInfo.body}
                    </Typography>
                    <Typography variant="body2">
                      {this.state.submissionInfo.url}
                    </Typography>

                    <Button color="primary" onClick={this.modalOpen}>
                      과제수정
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography variant="body1">
                      제출되지 않았습니다.
                    </Typography>
                    <Button color="primary" onClick={this.modalOpen}>
                      과제제출
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <Typography variant="h5">평가</Typography>
                아직 평가되지 않았습니다.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <SubmissionForm
          open={this.state.modalFlag}
          handlingClose={this.modalClose}
          editFlag={this.state.isSubmitted}
          assignmentId={this.props.match.params.assignmentId}
          getSubmissionInfo={this.getSubmissionInfo}
        />
      </Container>
    );
  }
}

export default SubmissionDetail;
