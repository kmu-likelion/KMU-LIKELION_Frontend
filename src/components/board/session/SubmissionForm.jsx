import React, { Component } from "react";
import api from "../../../api/SessionAPI";

//@material-ui
import { withStyles, TextField, Button, Typography } from "@material-ui/core";

//bootstrap
import Modal from "react-bootstrap/Modal";

const useStyles = theme => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  textField: {
    display: "flex",
    paddingBottom: "1rem"
  }
});

class SubmissionForm extends Component {
  state = {
    userId: "",
    id: "",
    body: "",
    url: "",
    submittedDate: "",
    InfodidGet: false,
  };

  componentDidMount() {
    this.setState({
      userId: window.sessionStorage.getItem("id")
    });
  }

  getSubmissionInfo = async () => {
    await api
      .getSubmission(this.state.userId, this.props.assignmentId)
      .then(res => {
        console.log(res.data);
        this.setState({
          id: res.data[0].id,
          body: res.data[0].body,
          url: res.data[0].url,
          submittedDate: res.data[0].update_date,
          InfodidGet: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  updateSubmission = async event => {
    event.preventDefault();
    let default_title = `Submission-${this.props.sessionId}`;
    await api
      .updateSubmission(this.state.id, {
        title: default_title,
        user_id: this.state.userId,
        body: this.state.body,
        url: this.state.url,
        lecture: this.props.assignmentId
      })
      .then(res => {
        this.props.handlingClose();
        this.props.getUserSubmission();
      })
      .catch(err => {
        console.log(err);
      });
  };

  createSubmission = async event => {
    event.preventDefault();
    let default_title = `Submission-${this.props.sessionId}`;
    await api
      .createSubmission({
        title: default_title,
        user_id: this.state.userId,
        body: this.state.body,
        url: this.state.url,
        lecture: this.props.assignmentId
      })
      .then(res => {
        this.props.handlingClose();
        this.props.getUserSubmission();
        this.getSubmissionInfo();

        this.setState({
          body: "",
          url: ""
        });
        alert("과제제출 성공!");
      })
      .catch(err => {
        console.log(err);
      });
  };

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {    
    const { classes, open, handlingClose, editFlag } = this.props;

    if (editFlag) {
      if(!this.state.InfodidGet) {
        this.getSubmissionInfo();
      }
      return (
        <>
          <Modal size="lg" show={open} onHide={handlingClose}>
            <Modal.Header closeButton>
              <Modal.Title>제출된 과제정보 수정</Modal.Title>
            </Modal.Header>
            <form onSubmit={this.updateSubmission} className={classes.form}>
              <Modal.Body>
                <Typography variant="caption">
                  제출된 날짜 {this.state.submittedDate}
                </Typography>
                <TextField
                  // fullWidth
                  label="과제 설명"
                  name="body"
                  className={classes.textField}
                  value={this.state.body}
                  onChange={this.handlingChange}
                  margin="normal"
                  required
                />
                <TextField
                  label="Github URL"
                  name="url"
                  className={classes.textField}
                  value={this.state.url}
                  onChange={this.handlingChange}
                  margin="normal"
                  required
                />
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit">수정제출</Button>
                <Button onClick={handlingClose}>Close</Button>
              </Modal.Footer>
            </form>
          </Modal>
        </>
      );
    } else {
      return (
        <>
          <Modal size="lg" show={open} onHide={handlingClose}>
            <Modal.Header closeButton>
              <Modal.Title>과제 제출 폼</Modal.Title>
            </Modal.Header>
            <form onSubmit={this.createSubmission} className={classes.form}>
              <Modal.Body>
                <TextField
                  // fullWidth
                  label="과제 설명"
                  name="body"
                  className={classes.textField}
                  value={this.state.body}
                  onChange={this.handlingChange}
                  margin="normal"
                  required
                />
                <TextField
                  label="Github URL"
                  name="url"
                  className={classes.textField}
                  value={this.state.url}
                  onChange={this.handlingChange}
                  margin="normal"
                  required
                />
              </Modal.Body>
              <Modal.Footer>
                <Button color="primary" type="submit">
                  제출
                </Button>
                <Button onClick={handlingClose}>Close</Button>
              </Modal.Footer>
            </form>
          </Modal>
        </>
      );
    }
  }
}

export default withStyles(useStyles)(SubmissionForm);
