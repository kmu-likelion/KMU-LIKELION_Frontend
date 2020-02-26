import React, { Component } from "react";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import api from "../../../api/AdmissionAPI";
import ConfirmAnswerForm from "./ConfirmAnswerForm";
import ConfirmBasicView from "./ConfirmBasicView";
import AdmissionStore from "../../../store/AdmissionStore";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
// import Avatar from "@material-ui/core/Avatar";

class ConfirmApplication extends Component {
  static contextType = AdmissionStore;

  state = {
    joinInfo: {},
    answers: [],
    showAnswerInfo: {},
    questions: [],
    basicUpdateFlag: false,
    answerUpdateFlag: false,
    modalFlag: false
  };

  componentDidMount() {
    this.getAllQuestions();
    this.getJoinDataWithId(this.context.state.applicationId);
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getAllQuestions = async () => {
    await api
      .getAllQuestions()
      .then(res => {
        console.log("모든 질문사항 가져옴", res);
        this.setState({
          questions: res.data
        });
      })
      .catch(err => console.log(err));
  };

  getJoinDataWithId = async join_id => {
    await api.getJoinDatawithId(join_id).then(res => {
      console.log("id로 지원내역 가져오기 !", res.data);
      this.setState({
        joinInfo: res.data,
        answers: res.data.answer
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
    this.getJoinDataWithId(this.context.state.applicationId);
  };

  showAnswer = (event, question_id) => {
    event.preventDefault();
    let answers = this.state.answers;
    let ans_index = answers.findIndex(ans => ans.question_id === question_id);
    this.setState({ showAnswerInfo: answers[ans_index] });
    this.modalOpen();
  };

  render() {
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
                <ConfirmBasicView joinInfo={this.state.joinInfo} />
              </Grid>
              <Grid item xs={12} sm={12}>
                <br />
                <hr />
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
                <ConfirmAnswerForm
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

export default ConfirmApplication;
