import React, { Component } from "react";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import api from "../../api/AdmissionAPI";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

class CheckJoinView extends Component {
  state = {
    joinform: {},
    answers: [],
    basicUpdateFlag: false,
    answerUpdateFlag: false
  };

  componentDidMount() {
    console.log("New ComponentDidMount");
    const { join_info, answers } = this.props;
    this.setState({
      joinform: join_info,
      answers: answers
    });
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  viewData = (key, value) => {
    return { key, value };
  };

  render() {
    const joinInfo = [
      this.viewData("지원번호", this.state.joinform.id),
      this.viewData("성명", this.state.joinform.name),
      this.viewData("전화번호", this.state.joinform.phone_number),
      this.viewData("학번", this.state.joinform.student_id),
      this.viewData("학과", this.state.joinform.major),
      this.viewData("성별", this.state.joinform.sex),
      this.viewData("생년월일", this.state.joinform.birth)
    ];
    const status_type = {
      R: "심사중",
      F: "불합격",
      P: "합격"
    };
    return (
      <Container maxWidth="lg" className="PostingSection">
        <Paper className="PostingForm">
          <Typography component="h1" variant="h5">
            지원내역 확인
          </Typography>
          <br />
          {/* User Info Section */}
          <Grid container spacing={1}>
            <Grid item xs={1} sm={2}></Grid>
            <Grid item xs={10} sm={8}>
              <TableContainer className="join-table-section">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>지원상태</TableCell>
                      <TableCell>
                        {status_type[this.state.joinform.status]}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {joinInfo.map(col => (
                      <TableRow>
                        <TableCell>{col.key}</TableCell>
                        <TableCell>{col.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={1} sm={2}></Grid>
          </Grid>

          {/* Answer Section */}
          <hr />
          <Typography component="h1" variant="h5">
            질의응답
          </Typography>

          <TableContainer>
            <Table>
              {this.state.answers.map(ans => {
                return (
                  <>
                    <TableRow>
                      <TableCell colSpan={2}>
                        Qustion{ans.question_id}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Answer</TableCell>
                      <TableCell>{ans.body}</TableCell>
                    </TableRow>
                  </>
                );
              })}
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    );
  }
}

export default CheckJoinView;
