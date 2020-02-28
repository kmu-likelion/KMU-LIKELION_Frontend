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
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Box from "@material-ui/core/Box";
// import Switch from "@material-ui/core/Switch";
// import Typography from "@material-ui/core/Typography";

// import Chip from "@material-ui/core/Chip";
// import Paper from "@material-ui/core/Paper";
// import AddCircleIcon from "@material-ui/icons/AddCircle";
// import InputBase from "@material-ui/core/InputBase";
// import IconButton from "@material-ui/core/IconButton";

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
            user_id: this.state.userId
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
