import React, { Component } from "react";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import api from "../../api/AdmissionAPI";

import CheckAnswerForm from "./CheckAnswerForm";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
// import Avatar from "@material-ui/core/Avatar";

class CheckJoinView extends Component {
  state = {
    joinform: {},
    answers: [],
    showAnswerInfo: {},
    questions: [],
    basicUpdateFlag: false,
    answerUpdateFlag: false,
    modalFlag: false
  };

  componentDidMount() {
    console.log("New ComponentDidMount");
    const { join_info, answers } = this.props;
    this.setState({
      joinform: join_info,
      answers: answers
    });
    this.getAllQuestions();
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getAllQuestions = async () => {
    await api.getAllQuestions().then(res => {
      console.log(res);
      this.setState({
        questions: res.data.results
      });
    });
  };

  modalOpen = () => {
    this.setState({
      modalFlag: true
    });
  };

  modalClose = () => {
    this.setState({
      modalFlag: false
    });
  };

  showAnswer = (event, question_id) => {
    event.preventDefault();
    let answers = this.state.answers;
    // console.log(
    //   "dd",
    //   answers.findIndex(ans => ans.question_id === question_id)
    // );
    let ans_index = answers.findIndex(ans => ans.question_id === question_id);
    // console.log(answers[ans_index]);
    this.setState({ showAnswerInfo: answers[ans_index] });
    // showAnswerInfo
    this.modalOpen();
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
        <Paper className="PostingForm" elevation={0}>
          <Typography component="h1" variant="h5">
            지원내역 확인
          </Typography>
          <br />
          {/* User Info Section */}
          <Grid container spacing={1}>
            <Grid item xs={1} sm={2}></Grid>
            <Grid item xs={10} sm={8}>
              <Grid item xs={12} sm={12}>
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
              <Grid item xs={12} sm={12}>
                <br />
                <hr />
                <br />
                <List component="nav" aria-label="contacts">
                  {this.state.questions.map(qus => {
                    return (
                      <>
                        <ListItem>
                          <ListItemAvatar>
                            <QuestionAnswerIcon color="primary" />
                          </ListItemAvatar>
                          <ListItemText
                            primary={`Qustion${qus.id}`}
                            secondary={qus.body}
                          />
                          <ListItemSecondaryAction>
                            <Button
                              color="primary"
                              size="small"
                              onClick={event => this.showAnswer(event, qus.id)}
                            >
                              나의답변
                            </Button>
                          </ListItemSecondaryAction>
                        </ListItem>
                        <Divider variant="inset" />
                      </>
                    );
                  })}
                </List>
                <CheckAnswerForm
                  open={this.state.modalFlag}
                  handlingClose={this.modalClose}
                  answerInfo={this.state.showAnswerInfo}
                />
              </Grid>
            </Grid>
            <Grid item xs={1} sm={2}></Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

export default CheckJoinView;
