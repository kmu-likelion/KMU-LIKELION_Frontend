import React, { Component } from "react";
import api from "../../../api/SessionAPI";
//@material-ui
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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
    editFlag: true
  };

  componentDidMount() {
    let user_id = window.sessionStorage.getItem("id");
    this.setState({
      userId: user_id
    });
  }

  handlingSubmit = async event => {
    event.preventDefault();
    let default_title = `Submission-${this.props.sessionId}`;
    await api
      .createSubmission({
        title: default_title,
        user_id: this.state.userId,
        body: this.state.body,
        url: this.state.url,
        lecture: this.props.sessionId
      })
      .then(res => {
        console.log("성공적으로 과제 제출됨.", res.data);
        this.closeModal();
      })
      .catch(err => {
        console.log(err);
      });
  };

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { open, handlingClose, sessionId } = this.props;
    if (!this.state.editFlag) {
      return (
        <>
          <Modal size="lg" show={open} onHide={handlingClose}>
            <Modal.Header closeButton>
              <Modal.Title>제출된 과제정보 수정</Modal.Title>
            </Modal.Header>
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
              <Button onClick={e => this.changeMode(e)}>수정</Button>
              <Button onClick={handlingClose}>Close</Button>
            </Modal.Footer>
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
            <form onSubmit={this.handlingSubmit} className={classes.form}>
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
