import React, { Component } from "react";
import api from "../../../api/BoardAPI";
import { Redirect } from "react-router-dom";
import Editor from "../../Editor";

// material-ui
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
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
      lecture_type: 0,
      userId: "",
      username: "",
      title: "",
      body: "",

      open: false,
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

  getPostInfo = async () => {
    let post_id = this.props.editId;
    await api.getPost("lecture", post_id).then(res => {
      console.log(res.data);
      this.setState({
        title: res.data.title,
        body: res.data.body,
        lecture_type: res.data.lecture_type
      });
    });
  };

  handlingSubmit = async event => {
    event.preventDefault();

    switch (this.props.isEdit) {
      case true: //edit function
        await api
          .updatePost("lecture", this.props.editId, {
            title: this.state.title,
            body: this.state.body,
            user_id: this.state.userId,
            lecture_type: this.state.lecture_type
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
          .createPost("lecture", {
            title: this.state.title,
            body: this.state.body,
            user_id: this.state.userId,
            lecture_type: this.state.lecture_type
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
      return <Redirect to="/career" />;
    }
    return (
      <form onSubmit={this.handlingSubmit} className={classes.form}>
        <Select
          className={classes.selectBox}
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={this.state.open}
          onClose={e => this.setState({ open: false })}
          name="study_type"
          onOpen={e => this.setState({ open: true })}
          value={this.state.lecture_type}
          onChange={e => this.setState({ lecture_type: e.target.value })}
        >
          <MenuItem value={0}>정규세션</MenuItem>
          <MenuItem value={1}>과제</MenuItem>
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
          handlingChange={this.handlingEditorChange}
          className={classes.editor}
        />
        <br />
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
