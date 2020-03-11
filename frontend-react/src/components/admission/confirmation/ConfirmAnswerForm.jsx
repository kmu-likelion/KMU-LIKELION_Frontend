import React, { Component } from "react";
import api from "../../../api/AdmissionAPI";
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

class ConfirmAnswerForm extends Component {
  state = {
    id: "",
    body: "",
    editFlag: false
  };

  componentDidMount() {}

  handlingSubmit = async event => {
    event.preventDefault();
    await api
      .updateAnswer(this.props.answerInfo.id, {
        body: this.state.body,
        application_id: this.props.answerInfo.application_id,
        question_id: this.props.answerInfo.question_id
      })
      .then(res => {
        // console.log("성공적으로 수정됨.", res.data);
        this.closeModal();
      })
      .catch(err => {
        console.log(err);
      });
  };

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  changeMode = (event, body) => {
    this.setState(prevState => ({
      editFlag: !prevState.editFlag,
      body: body
    }));
  };

  closeModal = () => {
    this.setState({ editFlag: false });
    this.props.handlingClose();
  };

  render() {
    const { classes } = this.props;
    const { open, answerInfo } = this.props;
    if (!this.state.editFlag) {
      return (
        <>
          <Modal size="lg" show={open} onHide={this.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Answer</Modal.Title>
            </Modal.Header>
            <Modal.Body>{answerInfo.body}</Modal.Body>
            <Modal.Footer>
              <Button onClick={e => this.changeMode(e, answerInfo.body)}>
                수정
              </Button>
              <Button onClick={this.closeModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    } else {
      return (
        <>
          <Modal size="lg" show={open} onHide={this.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Answer</Modal.Title>
            </Modal.Header>
            <form onSubmit={this.handlingSubmit} className={classes.form}>
              <Modal.Body>
                <TextField
                  // fullWidth
                  label="답변"
                  name="body"
                  className={classes.textField}
                  value={this.state.body}
                  onChange={this.handlingChange}
                  margin="normal"
                  required
                />
              </Modal.Body>
              <Modal.Footer>
                <Button color="primary" type="submit">
                  작성
                </Button>
                <Button color="secondary" onClick={this.changeMode}>
                  취소
                </Button>
                <Button onClick={this.closeModal}>Close</Button>
              </Modal.Footer>
            </form>
          </Modal>
        </>
      );
    }
  }
}

export default withStyles(useStyles)(ConfirmAnswerForm);
