import React, { Component } from "react";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import api from "../../api/AdmissionAPI";
import CheckJoinView from "./CheckJoinView";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
class CheckJoin extends Component {
  state = {
    join_info: {},
    answers: [],
    email: "",
    password: "",
    is_accessed: false,
    ACCESS_DENIED: false,
    ERROR_MSG: ""
  };

  componentDidMount() {
    console.log("New ComponentDidMount");
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  accessJoin = async event => {
    event.preventDefault();
    console.log("Submit.");

    await api
      .getJoinData({
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        console.log(res);
        console.log("joinform : ", res.data.join_forms);
        console.log("answers : ", res.data.answers);

        this.setState({
          is_accessed: true,
          answers: res.data.answers,
          join_info: res.data.join_forms
        });
        console.log(this.state.join_info);
      })
      .catch(err => {
        console.log(err);
        // this.setState({
        //   ACCESS_DENIED: true,
        //   ERROR_MSG: "해당하는 입부내역이 존재하지 않습니다!"
        // });
        // alert(this.state.ERROR_MSG);
      });
  };

  render() {
    if (this.state.is_accessed && this.state.ACCESS_DENIED === false) {
      return (
        <CheckJoinView
          join_info={this.state.join_info}
          answers={this.state.answers}
        />
      );
    } else {
      return (
        <Container maxWidth="lg" className="PostingSection">
          <Paper className="PostingForm">
            <form onSubmit={this.accessJoin}>
              <TextField
                label="E-Mail"
                autoFocus
                // error={this.state.email === "" ? true : false}
                // helperText="This is Helper Text"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.handlingChange}
                margin="normal"
                placeholder="E-Mail"
                // variant="outlined"
                required
              />
              <br />
              <TextField
                label="Password"
                autoFocus
                // error={this.state.password === "" ? true : false}
                // helperText=""
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handlingChange}
                margin="normal"
                // placeholder="Password"
                required
              />
              {/* <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                type={values.showPassword ? "text" : "password"}
                value={this.state.password}
                onChange={this.handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              /> */}
              <br />
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
}

export default CheckJoin;
