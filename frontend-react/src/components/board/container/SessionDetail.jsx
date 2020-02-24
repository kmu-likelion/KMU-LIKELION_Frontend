import React, { Component } from "react";
// import api from "../../../api/BoardAPI";
import { Link } from "react-router-dom";
import moment from "moment";

import LikeView from "../LikeView";
import Viewer from "../../Viewer";

// @material-ui
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

//bootstrap
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
class SessionDetail extends Component {
  render() {
    const { postInfo, handlingDelete, post_id, board_name } = this.props;
    const pubDate = moment(postInfo.pub_date).format("YYYY-MM-DD HH:MM");
    return (
      <Table className={"post-table"}>
        <TableRow>
          <TableCell>
            <Typography component="h1" variant="h5">
              {postInfo.title}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <Typography variant="caption" color="textSecondary">
            작성일 {pubDate} /&nbsp; 작성자 {postInfo.author_name}
          </Typography>
        </TableRow>
        <TableRow>
          <TableCell className="post-body">
            <Typography color="textSecondary" component="pre">
              <Viewer value={String(postInfo.body)} />
            </Typography>
            <Typography color="textSecondary" variant="h5">
              과제
              <hr />
            </Typography>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Tab 1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Tab 2</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">djdjdjdjdjd</Tab.Pane>
                    <Tab.Pane eventKey="second">dssdacdVDVDS</Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
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
