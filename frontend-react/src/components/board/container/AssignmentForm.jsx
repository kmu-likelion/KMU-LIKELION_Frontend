import React, { Component } from "react";

import sessionApi from "../../../api/SessionAPI";
import Editor from "../../Editor";
import moment from "moment";

//@material-ui
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";

// import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Modal from "react-bootstrap/Modal";

const useStyles = theme => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(3)
    // display: "flex",
    // flexDirection: "column"
  },
  textField: {
    // width: "50%",
    display: "flex",
    paddingBottom: "1rem"
  },
  editor: {
    width: "100%",
    height: "100%",
    overflow: "auto"
  },
  scoreTypeForm: {
    display: "flex",
    padding: "2px 4px",
    // paddingLeft: "2px",
    alignItems: "center"
  },
  addButton: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 200
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    maxWidth: "40%"
  },
  submitWrap: {
    textAlign: "center",
    alignItems: "center"
  }
});

class AssignmentForm extends Component {
  state = {
    title: "",
    body: "",
    deadline: moment(new Date()).format("YYYY-MM-DDThh:mm:ss"),
    scoreTypeList: [],
    scoreType: ""
  };

  componentDidMount() {
    if (window.sessionStorage.getItem("id")) {
      console.log("접근상태 : 인증됨");
    } else {
      console.log("접근상태 : 인증되지 않음.");
    }
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log("입력값 :", event.target.value);
    console.log("상태값 :", this.state.title);
  };

  handlingEditorChange = ({ html, text }) => {
    this.setState({ body: text });
  };

  handlingSubmit = async (event, sessionId) => {
    event.preventDefault();
    if (this.state.body !== "" && this.state.scoreTypeList.length > 0) {
      let score_type = this.state.scoreTypeList.join(",");
      await sessionApi
        .addAssignment(sessionId, {
          title: this.state.title,
          user_id: window.sessionStorage.getItem("id"),
          body: this.state.body,
          score_types: score_type,
          deadline: this.state.deadline
        })
        .then(res => {
          console.log("성공적으로 과제 생성됨", res);
          this.setState({
            title: "",
            body: "",
            deadline: moment(new Date()).format("YYYY-MM-DDThh:mm:ss"),
            scoreTypeList: [],
            scoreType: ""
          });
          this.props.getAssignments(sessionId);
        })
        .catch(err => console.log(err));
    } else {
      alert("모든 항목을 채워주세요!");
    }
  };

  addScoreType = () => {
    if (this.state.scoreType !== "") {
      let types = this.state.scoreTypeList;
      types.push(this.state.scoreType);
      this.setState({
        scoreTypeList: types,
        scoreType: ""
      });
    }
  };

  deleteScoreType = name => {
    console.info(`You clicked the delete '${name}'`);
    let type_list = this.state.scoreTypeList;
    let index = type_list.indexOf(name);
    if (index > -1) {
      type_list.splice(index, 1);
      // console.log(type_list);
      this.setState({
        scoreTypeList: type_list
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { open, handlingClose, sessionId } = this.props;
    return (
      <>
        <Modal size="lg" show={open} onHide={handlingClose}>
          <Modal.Header closeButton>
            <Modal.Title>멋사인들에게 죽음을 선사하세요..</Modal.Title>
          </Modal.Header>
          <form
            onSubmit={e => this.handlingSubmit(e, sessionId)}
            className={classes.form}
          >
            <Modal.Body>
              <TextField
                label="과제명"
                name="title"
                className={classes.textField}
                value={this.state.title}
                onChange={this.handlingChange}
                margin="normal"
                required
              />
              <Editor
                value={this.state.body}
                handlingChange={this.handlingEditorChange}
                className={classes.editor}
              />
              <br />
              <TextField
                label="마감일자"
                type="datetime-local"
                value={this.state.deadline}
                className={classes.textField}
                onChange={event =>
                  this.setState({
                    deadline: moment(event.target.value).format(
                      "YYYY-MM-DDThh:mm:ss"
                    )
                  })
                }
                InputLabelProps={{
                  shrink: true
                }}
              />
              <Paper className={classes.scoreTypeForm} elevation={0}>
                <Paper className={classes.addButton}>
                  <InputBase
                    placeholder="평가기준 추가"
                    name="scoreType"
                    value={this.state.scoreType}
                    onChange={this.handlingChange}
                  />
                  <IconButton
                    className={classes.iconButton}
                    aria-label="Add"
                    onClick={this.addScoreType}
                  >
                    <AddCircleIcon />
                  </IconButton>
                </Paper>
                {this.state.scoreTypeList.map(type => (
                  <Chip
                    key={`chip-${type}`}
                    label={type}
                    onDelete={event => this.deleteScoreType(type)}
                    name={type}
                    color="primary"
                  />
                ))}
              </Paper>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handlingClose}>Close</Button>
              <Button type="submit">생성</Button>
            </Modal.Footer>
          </form>
        </Modal>
      </>
    );
  }
}

export default withStyles(useStyles)(AssignmentForm);
