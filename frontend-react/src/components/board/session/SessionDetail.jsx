import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import api from "../../../api/BoardAPI";
import { getUser } from "../../../api/AuthAPI";
import LikeView from "../LikeView";
import Viewer from "../../Viewer";
import AssignmentView from "./AssignmentView";
import AssignmentForm from "./AssignmentForm";
import AuthButton from "../../common/AuthButton";

// @material-ui
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

class SessionDetail extends Component {
  state = {
    title: "",
    body: "",
    pub_date: "",
    author_name: "",
    assignments: [],
    modalFlag: false,
    user_type: ""
  };

  componentDidMount() {
    this.getAssignments(this.props.post_id);
    this.getUser(window.sessionStorage.getItem("username"));
  }

  getUser = async username => {
    await getUser(username)
      .then(res => {
        this.setState({
          user_type: res.data[0].user_type
        });
      })
      .catch(err => console.log(err));
  };

  getAssignments = async id => {
    await api.getPost("session", id).then(res => {
      this.setState({
        title: res.data.title,
        body: res.data.body,
        pub_date: moment(res.data.pub_date).format("YYYY-MM-DD HH:MM"),
        author_name: res.data.author_name,
        assignments: res.data.assignments
      });
    });
  };

  callGetAssignments = () => {
    this.getAssignments(this.props.post_id);
  };

  modalOpen = () => {
    this.setState({
      modalFlag: true
    });
  };

  modalClose = () => {
    this.setState({
      modalFlag: false
    });
  };

  addAssignment = event => {
    event.preventDefault();
    this.modalOpen();
  };

  render() {
    const { handlingDelete, post_id, board_name } = this.props;

    return (
      <Table className={"post-table"}>
        <TableRow>
          <TableCell>
            <Typography component="h1" variant="h5">
              {this.state.title}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <Typography variant="caption" color="textSecondary">
            작성일 {this.state.pub_date} /&nbsp; 작성자 {this.state.author_name}
          </Typography>
        </TableRow>
        <TableRow>
          <TableCell className="post-body">
            <Typography color="textSecondary" component="pre">
              <Viewer value={String(this.state.body)} />
            </Typography>
            <hr />

            <AuthButton
              authType="permission"
              info={2}
              boardName={board_name}
              button={
                <>
                  <Button
                    color="secondary"
                    size="small"
                    variant="contained"
                    onClick={event => this.addAssignment(event)}
                  >
                    과제추가
                  </Button>
                </>
              }
            />

            <br />

            <AssignmentForm
              open={this.state.modalFlag}
              handlingOpen={this.modalOpen}
              handlingClose={this.modalClose}
              getAssignments={this.getAssignments}
              sessionId={this.props.post_id}
            />
            {this.state.assignments.map((task, index) => (
              <AssignmentView
                key={index}
                index={index}
                assignment={task}
                getAssignments={this.callGetAssignments}
                sessionId={this.props.post_id}
                user_type={this.props.user_type}
              />
            ))}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>
            <LikeView post_id={post_id} board_name={board_name} />
            <AuthButton
              authType="isWriter"
              info={post_id}
              boardName={board_name}
              button={
                <>
                  <Button
                    color="primary"
                    size="small"
                    onClick={event => handlingDelete(board_name, post_id)}
                  >
                    Delete
                  </Button>
                  <Button
                    color="primary"
                    size="small"
                    component={Link}
                    to={`/${board_name}/update/${post_id}`}
                  >
                    Update
                  </Button>
                </>
              }
            />

            <Button
              color="primary"
              size="small"
              component={Link}
              to={`/${board_name}`}
            >
              Back
            </Button>
          </TableCell>
        </TableRow>
      </Table>
    );
  }
}

export default SessionDetail;
