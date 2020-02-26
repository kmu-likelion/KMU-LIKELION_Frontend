import React, { Component } from "react";
import AdmissionStore from "../../../store/AdmissionStore";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import api from "../../../api/AdmissionAPI";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class CheckJoin extends Component {
  static contextType = AdmissionStore;
  state = {
    email: "",
    password: ""
  };

  componentDidMount() {
    console.log("New ComponentDidMount");
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  accessApplication = async event => {
    event.preventDefault();
    await api
      .getJoinData({
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        console.log("Access Application", res.data);

        this.context.updateValue("applicationId", res.data.join_forms.id);
        this.context.updateValue("isAccessed", true);
      })
      .catch(err => {
        console.log(err);
        this.context.updateValue("ACCESS_DENIED", true);
        this.context.updateValue(
          "ERROR_MSG",
          "해당하는 입부내역이 존재하지 않습니다!"
        );

        // alert(this.context.state.ERROR_MSG);
      });
  };

  render() {
    return (
      <Container maxWidth="lg" className="PostingSection">
        <Paper className="PostingForm">
          {this.context.state.ACCESS_DENIED ? (
            <>{this.context.state.ERROR_MSG}</>
          ) : (
            <></>
          )}
          <form onSubmit={this.accessApplication}>
            <TextField
              label="E-Mail"
              autoFocus
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handlingChange}
              margin="normal"
              placeholder="E-Mail"
              // variant="outlined"
              required
              autoFocus
            />
            <br />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handlingChange}
              margin="normal"
              required
            />
            <br />
            <Button variant="contained" color="primary" type="submit">
              confirm
            </Button>
          </form>
        </Paper>
      </Container>
    );
  }
}

export default CheckJoin;
