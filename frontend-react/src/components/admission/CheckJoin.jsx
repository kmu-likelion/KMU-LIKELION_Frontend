import React, { Component } from "react";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import api from "../../api/api_admission";

// import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";

class CheckJoin extends Component {
  state = {
    joinform: {},
    answers: [],
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
    await api
      .getJoinInfo({
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
          joinform: res.data.join_forms
        });
        console.log(this.state.joinform);
      });
  };

  render() {
    return (
      <Container maxWidth="lg" className="PostingSection">
        <Paper className="PostingPaper">
          <h3>지원내역 확인</h3>
          <br />
          {this.state.is_accessed ? (
            <>
              <h5>지원 상태 : {this.state.joinform.status}</h5>
              지원번호 : {this.state.joinform.id} <br />
              이름 : {this.state.joinform.name} <br />
              전화번호 : {this.state.joinform.phone_number} <br />
              학번 : {this.state.joinform.student_id} <br />
              학과 : {this.state.joinform.major} <br />
              성별 : {this.state.joinform.sex} <br />
              생일 :{this.state.joinform.birth} <br />
              <hr />
              {this.state.answers.map(ans => {
                return (
                  <>
                    Answer{ans.question_id}. &nbsp;
                    {ans.body}
                    <hr />
                  </>
                );
              })}
            </>
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
        </Paper>
      </Container>
    );
  }
}

export default CheckJoin;
