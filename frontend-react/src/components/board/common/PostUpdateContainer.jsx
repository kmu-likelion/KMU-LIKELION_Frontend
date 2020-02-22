import React, { Component } from "react";
import { Link } from "react-router-dom";

//component
import NoticeForm from "./NoticeForm";
import LectureForm from "./LectureForm";
import QnAForm from "./QnAForm";

// material-ui
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
// import CreateIcon from "@material-ui/icons/Create";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    height: "100%",
    alignItems: "center"
  },
  editIcon: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  createIcon: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  }
});

class PostUpdateContainer extends Component {
  state = {
    isEdit: false,
    editId: "",
    boardType: ""
  };

  componentDidMount() {
    // console.log("props.match.path : ", this.props.match.path.split("/"));
    this.setState({
      boardType: this.props.match.path.split("/")[1]
    });

    if (this.props.match.params.id) {
      this.setState({
        isEdit: true,
        editId: this.props.match.params.id
      });
    }
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  renderConponent = (boardType, isEdit, editId) => {
    const { classes } = this.props;
    let component = "";
    let header = "";
    if (isEdit) {
      header = (
        <>
          <Avatar className={classes.editIcon}>
            <EditIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Your Post!
          </Typography>
        </>
      );
    } else {
      header = (
        <>
          <Avatar className={classes.createIcon}>
            <EditIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Your Post!
          </Typography>
        </>
      );
    }

    switch (boardType) {
      case "notice":
        component = (
          <>
            {header}
            <NoticeForm isEdit={isEdit} editId={editId} />
          </>
        );
        break;

      case "lecture":
        component = (
          <>
            {header}
            <LectureForm isEdit={isEdit} editId={editId} />
          </>
        );
        break;
      case "qna":
        component = (
          <>
            {header}
            <QnAForm isEdit={isEdit} editId={editId} />
          </>
        );
        break;
    }
    return component;
  };

  render() {
    const { classes } = this.props;

    return (
      <Container maxWidth="lg">
        <Paper className={classes.paper} elevation={0}>
          {this.renderConponent(
            this.state.boardType,
            this.state.isEdit,
            this.state.editId
          )}
          <Link to={`/${this.state.boardType}`}>Cancel</Link>
        </Paper>
      </Container>
    );
  }
}

export default withStyles(useStyles)(PostUpdateContainer);
