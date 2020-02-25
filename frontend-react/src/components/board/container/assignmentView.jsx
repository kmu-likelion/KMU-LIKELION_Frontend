import React, { Component } from "react";

//@material-ui
// import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

//bootstrap
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class AssignmentView extends Component {
  //   handlingChange = event => {
  //     this.setState({ [event.target.name]: event.target.value });
  //   };

  handlingDelete = taskId => {
    console.log("과제삭제 실행.");
  };

  render() {
    const { assignments } = this.props;
    console.log(assignments);
    return (
      <>
        <Tab.Container defaultActiveKey={0}>
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                {assignments.map((task, index) => (
                  <Nav.Item>
                    <Nav.Link eventKey={index}>{task.title}</Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                {assignments.map((task, index) => (
                  <Tab.Pane eventKey={index}>
                    {task.body}
                    <br />
                    <Button color="primary">과제제출</Button>
                    <Button color="secondary" onClick={this.handlingDelete}>
                      과제삭제
                    </Button>
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </>
    );
  }
}
