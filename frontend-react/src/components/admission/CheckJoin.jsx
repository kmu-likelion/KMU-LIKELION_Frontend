import React, { Component } from "react";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

// import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";

class CheckJoin extends Component {
  state = {
    // name: "",
    // phoneNum: "",
    // major: "",
    // studentId: "",
    // birth: "",
    // sex: "",
    // email: "",
    email: "",
    password: "",
    is_accessed: false
  };

  componentDidMount() {
    console.log("New ComponentDidMount");
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  accessJoin = async event => {
    event.preventDefault();
    console.log("서브밋!");
    await this.setState({
      is_accessed: true
    });
  };

  render() {
    return (
      <Container maxWidth="lg" className="PostingSection">
        <Paper className="PostingPaper">이력서 검토 페이지.</Paper>
        <br />
        {this.state.is_accessed ? (
          <>access댐.</>
        ) : (
          <form onSubmit={this.accessJoin}>
            <InputLabel>Email</InputLabel>
            <Input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handlingChange}
              required
            />

            <InputLabel>Password</InputLabel>
            <Input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handlingChange}
              required
            />
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              // onClick={props.setFlag}
              type="submit"
            >
              confirm
            </Button>
          </form>
        )}
      </Container>
    );
  }
}

export default CheckJoin;
