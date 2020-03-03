import React, { Component } from "react";
import api from "../../../api/BoardAPI";
// import sessionApi from "../../../api/SessionAPI";
import { Redirect } from "react-router-dom";
import Editor from "../../Editor";
// import moment from "moment";

// material-ui
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

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
      startNumber: "",
      selectOpen: false,

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
    if (this.props.isEdit) {
      this.getPostInfo();
    }
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handlingEditorChange = ({ html, text }) => {
    this.setState({ body: text });
  };

  getPostInfo = async () => {
    let post_id = this.props.editId;
    await api.getPost("session", post_id).then(res => {
      console.log("세션데이터", res.data);
      this.setState({
        title: res.data.title,
        body: res.data.body,
        session_type: res.data.session_type,
        start_number: res.data.start_number
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
            start_number: this.state.startNumber,
            session_type: "L"
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
            start_number: this.state.startNumber,
            session_type: "L"
          })
          .then(res => {
            console.log("정상적으로 생성됨. ", res);
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

  render() {
    const { classes } = this.props;
    if (this.state.endSubmit) {
      return <Redirect to="/session" />;
    }
    return (
      <form onSubmit={this.handlingSubmit} className={classes.form}>
        <InputLabel id="startnum-select-label">기수</InputLabel>
        <Select
          style={{ minWidth: 50 }}
          labelId="startnum-select-label"
          id="startnum-controlled-open-select"
          open={this.state.selectOpen}
          onClose={e => this.setState({ selectOpen: false })}
          name="userType"
          onOpen={e => this.setState({ selectOpen: true })}
          value={this.state.startNumber}
          onChange={e => this.setState({ startNumber: e.target.value })}
        >
          <MenuItem value="8th">8기</MenuItem>
          <MenuItem value="7.5th">7.5기</MenuItem>
          <MenuItem value="7th">7기</MenuItem>
        </Select>

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
