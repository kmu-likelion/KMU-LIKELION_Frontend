import React, { Component } from "react";
import api from "../../../api/BoardAPI";
import { Redirect } from "react-router-dom";
import Editor from "../../Editor";

// material-ui
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { withStyles } from "@material-ui/core/styles";

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

class CareerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      username: "",
      title: "",
      body: "",
      link: "",

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

  handleCheck = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  handlingEditorChange = ({ html, text }) => {
    this.setState({ body: text });
  };

  getPostInfo = async () => {
    let post_id = this.props.editId;
    await api.getPost("career", post_id).then(res => {
      console.log(res.data);
      this.setState({
        title: res.data.title,
        body: res.data.body,
        link: res.data.link
      });
    });
  };

  handlingSubmit = async event => {
    event.preventDefault();

    switch (this.props.isEdit) {
      case true: //edit function
        await api
          .updatePost("career", this.props.editId, {
            title: this.state.title,
            body: this.state.body,
            user_id: this.state.id,
            link: this.state.link
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
          .createPost("career", {
            title: this.state.title,
            body: this.state.body,
            user_id: this.state.userId,
            link: this.state.link
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
      return <Redirect to="/career" />;
    }
    return (
      <form onSubmit={this.handlingSubmit} classes={classes.form}>
        <TextField
          label="Title"
          name="title"
          value={this.state.title}
          onChange={this.handlingChange}
          margin="normal"
          className={classes.textField}
          required
        />
        <Editor
          value={this.state.body}
          handlingChange={this.handlingEditorChange}
          className={classes.editor}
        />
        <TextField
          label="관련된 URL"
          name="link"
          value={this.state.link}
          onChange={this.handlingChange}
          margin="normal"
          className={classes.textField}
          placeholder="https://github.com/example/project"
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

export default withStyles(useStyles)(CareerForm);
