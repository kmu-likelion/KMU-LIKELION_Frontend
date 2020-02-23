import React, { Component } from "react";
import api from "../../../api/BoardAPI";
import { Link, Redirect } from "react-router-dom";

// material-ui
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import Editor from "../../Editor";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = theme => ({
  form: {
    width: "100%",
    alignItems: "center",
    marginTop: theme.spacing(5)
  },
  formContent: {
    alignItems: "center"
  },
  textarea: {
    width: "100%"
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class QnAForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      username: "",
      title: "",
      body: "",
      subject: "",
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

  //update page 일 시 해당 post의 정보를 가져옴
  getPostInfo = async () => {
    let post_id = this.props.editId;
    await api.getPost("qna", post_id).then(res => {
      console.log(res.data);
      this.setState({
        title: res.data.title,
        body: res.data.body,
        subject: res.data.subject
      });
    });
  };

  //Submit 핸들링
  handlingSubmit = async event => {
    event.preventDefault();

    switch (this.props.isEdit) {
      case true: //edit function
        await api
          .updatePost("qna", this.props.editId, {
            title: this.state.title,
            body: this.state.body,
            subject: this.state.subject,
            user_id: this.state.id
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
          .createPost("qna", {
            title: this.state.title,
            body: this.state.body,
            subject: this.state.subject,
            user_id: this.state.userId
          })
          .then(res => {
            console.log("정상적으로 생성됨. ", res);
            this.setState({
              endSubmit: true
            });
          })
          .catch(err => console.log(err));
        break;
    }
  };

  render() {
    const { classes } = this.props;
    if (this.state.endSubmit) {
      return <Redirect to="/qna" />;
    }
    return (
      <form onSubmit={this.handlingSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={1} sm={1}></Grid>
          <Grid item xs={10} sm={10} className={classes.formContent}>
            <TextField
              label="분야"
              name="subject"
              value={this.state.subject}
              onChange={this.handlingChange}
              margin="normal"
              required
            />
            <TextField
              className={classes.textarea}
              label="질문 명"
              name="title"
              value={this.state.title}
              onChange={this.handlingChange}
              margin="normal"
              required
            />
            <br />
            <br />
            <TextareaAutosize
              className={classes.textarea}
              name="body"
              rowsMin={3}
              rowsMax={7}
              placeholder="질문 내용"
              value={this.state.body}
              onChange={this.handlingChange}
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={1} sm={1}></Grid>
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          작성
        </Button>
      </form>
    );
  }
}

export default withStyles(useStyles)(QnAForm);
