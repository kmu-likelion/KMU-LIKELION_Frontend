import React from "react";
import moment from "moment";
import api from "../../../api/SessionAPI";
import GradingContainer from "./GradingContainer";
import Viewer from "../../Viewer";

import {
  Container,
  Paper,
  Typography,
  Grid,
  Tabs,
  Tab,
  Button
} from "@material-ui/core";

import { Card, CardActions, CardContent } from "@material-ui/core";

class AssignmentDetail extends React.Component {
  state = { assignmentId: "", tabValue: 0, assignmentInfo: {} };

  componentDidMount() {
    this.setState({
      assignmentId: this.props.match.params.id
    });
    this.getAssignmentData(this.props.match.params.id);
  }

  getAssignmentData = async id => {
    await api
      .getAssignment(id)
      .then(res => {
        // console.log("과제 가져오기 성공", res.data);
        this.setState({ assignmentInfo: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleTab = (event, newValue) => {
    this.setState({ tabValue: newValue });
  };

  render() {
    const deadline = moment(this.state.assignmentInfo.update_date).format(
      "YY/MM/DD hh:mm"
    );

    return (
      <>
        <Container className="main-container">
          <Paper elevation={1} style={{ width: "100%", padding: 20 }}>
            <Grid container spacing={2}>
              <Grid item sm={1}></Grid>
              <Grid item sm={10} style={{ flexGrow: 1 }}>
                <Typography variant="h4" style={{ padding: 30 }}>
                  과제 상세관리 페이지
                </Typography>
                <Tabs
                  style={{ width: "100%" }}
                  variant="fullWidth"
                  value={this.state.tabValue}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={this.handleTab}
                >
                  <Tab label="Detail" />
                  <Tab label="Submission" />
                </Tabs>
                <br />

                <div>
                  {this.state.tabValue === 0 ? (
                    <Card variant="outlined">
                      <CardContent style={{ margin: 25 }}>
                        <Typography variant="h5" gutterBottom>
                          {this.state.assignmentInfo.title}
                        </Typography>
                        <Typography variant="body2" color="primary">
                          제출기한 : {deadline}
                        </Typography>
                        <hr />

                        <Viewer
                          value={String(this.state.assignmentInfo.body)}
                        />
                      </CardContent>
                      <CardActions>
                        <Button size="small">Learn More</Button>
                      </CardActions>
                    </Card>
                  ) : (
                    <GradingContainer
                      assignmentId={this.props.match.params.id}
                    />
                  )}
                </div>
              </Grid>
              <Grid item sm={1}></Grid>
            </Grid>
          </Paper>
        </Container>
      </>
    );
  }
}

export default AssignmentDetail;
