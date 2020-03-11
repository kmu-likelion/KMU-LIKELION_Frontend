import React from "react";
import api from "../../api/BoardAPI";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

import AssignmentView from "./AssignmentView";

class AssignmentContainer extends React.Component {
  state = { selectNumber: "", sessionList: [] };

  componentDidMount() {
    this.getAssignmentList();
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getAssignmentList = async () => {
    await api.getAllPosts("session").then(res => {
      this.setState({ sessionList: res.data.results });
    });
  };

  render() {
    return (
      <>
        <Container className="main-container">
          <Paper elevation={1} style={{ width: "100%", padding: 10 }}>
            <Grid container spacing={3}>
              <Grid item style={{ display: "flex" }}>
                <Typography variant="h4">과제관리</Typography>
                <FormControl style={{ minWidth: 80, marginLeft: 15 }}>
                  <InputLabel id="demo-simple-select-label">기수</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={this.state.selectNumber}
                    onChange={this.handlingChange}
                  >
                    <MenuItem value={"7"}>7기</MenuItem>
                    <MenuItem value={"7.5"}>7.5기</MenuItem>
                    <MenuItem value={"8"}>8기</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item sm={1}></Grid>
              <Grid item sm={10}>
                {this.state.sessionList.map((session, index) => (
                  <AssignmentView
                    key={index}
                    index={index}
                    title={session.title}
                    assignmentList={session.assignments}
                  />
                ))}
              </Grid>
              <Grid item sm={1}></Grid>
            </Grid>
          </Paper>
        </Container>
      </>
    );
  }
}

export default AssignmentContainer;
