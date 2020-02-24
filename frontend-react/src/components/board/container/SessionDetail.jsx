import React, { Component } from "react";
// import api from "../../../api/BoardAPI";
import { Link } from "react-router-dom";
import moment from "moment";
import api from "../../../api/BoardAPI";

import LikeView from "../LikeView";
import Viewer from "../../Viewer";

// @material-ui
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

//bootstrap
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
class SessionDetail extends Component {
  state = {
    title: "",
    body: "",
    pub_date: "",
    author_name: "",
    assignments: []
  };

  componentDidMount() {
    this.getAssignments(this.props.post_id);
  }

  getAssignments = async id => {
    console.log("post id:", id);
    await api.getPost("session", id).then(res => {
      console.log("detail에서 받은 데이터 ?", res.data);
      console.log(res.data.assignments.length);
      this.setState({
        title: res.data.title,
        body: res.data.body,
        pub_date: moment(res.data.pub_date).format("YYYY-MM-DD HH:MM"),
        author_name: res.data.author_name,
        assignments: res.data.assignments
      });
    });
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
            {this.state.assignments.length > 0 ? (
              <>
                <Typography color="textSecondary" variant="h5">
                  과제
                  <hr />
                </Typography>
                <Paper
                  style={{
                    padding: 10,
                    margin: 10
                  }}
                >
                  <Tab.Container defaultActiveKey={0}>
                    <Row>
                      <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                          {this.state.assignments.map((task, index) => (
                            <Nav.Item>
                              <Nav.Link eventKey={index}>{task.title}</Nav.Link>
                            </Nav.Item>
                          ))}
                        </Nav>
                      </Col>
                      <Col sm={9}>
                        <Tab.Content>
                          {this.state.assignments.map((task, index) => (
                            <Tab.Pane eventKey={index}>
                              {task.body}
                              <br />
                              <Button color="primary">과제제출</Button>
                            </Tab.Pane>
                          ))}
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                </Paper>
              </>
            ) : (
              <Typography color="textSecondary" variant="h5">
                과제 없음.
                <hr />
              </Typography>
            )}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>
            <LikeView post_id={post_id} board_name={board_name} />
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
