import React from "react";
// import api from "../../api/SessionAPI";
import api from "../../api/SessionAPI";
import GradingContainer from "./GradingContainer";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

class AssignmentDetail extends React.Component {
  state = { assignmentId: "", tabValue: 0, assignmentInfo: {} };

  componentDidMount() {
    this.setState({
      assignmentId: this.props.match.params.id
    });
    this.getAssignmentData(this.props.match.params.id);

    // console.log(this.props.match.params.id);
  }

  getAssignmentData = async id => {
    await api
      .getAssignment(id)
      .then(res => {
        console.log("과제 가져오기 성공", res.data);
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
                  value={this.state.tabValue}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={this.handleTab}
                >
                  <Tab label="Detail" />
                  <Tab label="Submission" />
                </Tabs>
                <div>
                  {this.state.tabValue === 0 ? (
                    <Card variant="outlined">
                      <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                          {this.state.assignmentInfo.title}
                        </Typography>
                        <Typography variant="h5" component="h2"></Typography>
                        <Typography color="textSecondary">
                          {this.state.assignmentInfo.update_date}
                        </Typography>
                        <Typography variant="body2" component="p">
                          {this.state.assignmentInfo.body}
                        </Typography>
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
