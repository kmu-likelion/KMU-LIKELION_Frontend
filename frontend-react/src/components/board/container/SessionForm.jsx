import React, { Component } from "react";
import api from "../../../api/BoardAPI";
import sessionApi from "../../../api/SessionAPI";
import { Redirect } from "react-router-dom";
import Editor from "../../Editor";
import moment from "moment";

// material-ui
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";

import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
// import Grid from "@material-ui/core/Grid";

const useStyles = theme => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(3)
    // display: "flex",
    // flexDirection: "column"
  },
  textField: {
    width: "25%",
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

class LectureForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      username: "",
      title: "",
      body: "",
      checkedAssignment: false,
      taskTitle: "",
      taskBody: "",
      taskDeadline: moment(new Date()).format("YYYY-MM-DDThh:mm:ss"),
      taskScoreTypeList: [],
      taskScoreType: "",
      tasks: [],

      // open: false,
      endSubmit: false,
      isEdit: false,
      postId: ""
    };
  }

  componentDidMount() {
    if (window.sessionStorage.getItem("id")) {
      this.setState({
        userId: window.sessionStorage.getItem("id"),
        username: window.sessionStorage.getItem("username")
      });
    }
    // let date = moment(new Date()).format("YYYY-MM-DDTHH:MM");
    // console.log(date);
    if (this.props.isEdit) {
      // this.getPostInfo();
    }
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCheck = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  handlingEditorChange = ({ html, text }) => {
    this.setState({ body: text });
  };
  handlingTaskEditorChange = ({ html, text }) => {
    this.setState({ taskBody: text });
  };

  getPostInfo = async () => {
    let post_id = this.props.editId;
    await api.getPost("session", post_id).then(res => {
      console.log(res.data);
      this.setState({
        title: res.data.title,
        body: res.data.body,
        session_type: res.data.session_type
      });
    });
  };

  handlingSubmit = async event => {
    event.preventDefault();

    switch (this.props.isEdit) {
      case true: //edit function
        await api
          .updatePost("session", this.props.editId, {
            title: this.state.title,
            body: this.state.body,
            user_id: this.state.userId,
            session_type: this.state.session_type
          })
          .then(res => {
            console.log("정상적으로 수정됨. ", res);
            this.setState({
              endSubmit: true
            });
          })
          .catch(err => console.log(err));
        break;
      case false: //create function
        await api
          .createPost("session", {
            title: this.state.title,
            body: this.state.body,
            user_id: this.state.userId,
            session_type: "L"
          })
          .then(res => {
            console.log("정상적으로 생성됨. ", res);
            //과제리스트 create api 통신.
            this.state.tasks.map(task => {
              console.log(task);
              this.createAssignment(res.data.id, task);
            });

            this.setState({
              endSubmit: true
            });
          })
          .catch(err => console.log(err));
        break;
      default:
        break;
    }
  };

  createAssignment = async (sessionId, assignment) => {
    console.log("보낼 과제 데이터 : ", assignment);
    await sessionApi
      .addAssignment(sessionId, assignment)
      .then(res => {
        console.log("성공적으로 과제 생성됨", res);
      })
      .catch(err => console.log(err));
  };

  //tasks 상태 리스트에 과제를 추가함.
  addAssignment = () => {
    if (this.state.checkedAssignment === true) {
      let addedTasks = this.state.tasks;
      let score_type = this.state.taskScoreTypeList.join(",");

      addedTasks.push({
        title: this.state.taskTitle,
        user_id: this.state.userId,
        body: this.state.taskBody,
        score_types: score_type,
        deadline: this.state.taskDeadline
        // deadline: "2020-02-24T14:45:17.894165Z"
      });
      console.log("추가된 과제 :", addedTasks);
      this.setState({
        tasks: addedTasks,
        taskTitle: "",
        taskBody: "",
        taskDeadline: moment(new Date()).format("YYYY-MM-DDThh:mm:ss"),
        taskScoreTypeList: [],
        score_type: []
      });
    }
  };

  addScoreType = () => {
    if (this.state.taskScoreType !== "") {
      let types = this.state.taskScoreTypeList;
      types.push(this.state.taskScoreType);
      this.setState({
        taskScoreTypeList: types,
        taskScoreType: ""
      });
    }
  };

  deleteScoreType = name => {
    console.info(`You clicked the delete '${name}'`);
    let type_list = this.state.taskScoreTypeList;
    let index = type_list.indexOf(name);
    if (index > -1) {
      type_list.splice(index, 1);
      // console.log(type_list);
      this.setState({
        taskScoreTypeList: type_list
      });
    }
  };

  render() {
    const { classes } = this.props;
    if (this.state.endSubmit) {
      return <Redirect to="/session" />;
    }
    return (
      <form onSubmit={this.handlingSubmit} className={classes.form}>
        <TextField
          // fullWidth
          label="Title"
          name="title"
          className={classes.textField}
          value={this.state.title}
          onChange={this.handlingChange}
          margin="normal"
          required
        />
        <Editor
          value={this.state.body}
          name="body"
          handlingChange={this.handlingEditorChange}
          className={classes.editor}
        />
        <hr />
        <FormControlLabel
          control={
            <Switch
              checked={this.state.checkedAssignment}
              onChange={this.handleCheck}
              name="checkedAssignment"
              color="secondary"
            />
          }
          label="과제여부"
        />
        <Box display={this.state.checkedAssignment ? "block" : "none"}>
          <TextField
            label="과제명"
            name="taskTitle"
            className={classes.textField}
            value={this.state.taskTitle}
            onChange={this.handlingChange}
            margin="normal"
          />
          <Editor
            value={this.state.taskBody}
            handlingChange={this.handlingTaskEditorChange}
            className={classes.editor}
          />
          <TextField
            label="마감일자"
            type="datetime-local"
            value={this.state.taskDeadline}
            onChange={event =>
              this.setState({
                taskDeadline: moment(event.target.value).format(
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
                name="taskScoreType"
                value={this.state.taskScoreType}
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
            {this.state.taskScoreTypeList.map(type => (
              <Chip
                key={`chip-${type}`}
                label={type}
                onDelete={event => this.deleteScoreType(type)}
                name={type}
                color="primary"
              />
            ))}
          </Paper>

          <Button
            // fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={this.addAssignment}
          >
            과제추가
          </Button>

          <hr />
          <Typography variant="h5">등록된 과제</Typography>
          {this.state.tasks.map(task => (
            <>
              {task.title} <hr />
            </>
          ))}
          <br />
        </Box>

        <div className={classes.submitWrap}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            작성
          </Button>
        </div>
      </form>
    );
  }
}

export default withStyles(useStyles)(LectureForm);
