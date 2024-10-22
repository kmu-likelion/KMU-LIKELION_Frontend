import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/AdmissionAPI";
import EvaluationView from "./EvaluationView";
import EvaluationNew from "./EvaluationNew";
import AccountGrantForm from "./AccountGrantForm";
import AuthButton from "../../common/AuthButton";

import moment from "moment";

//@material-ui
import { Table, TableBody, TableCell, TableRow, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import { Container, Grid, Typography, Divider, Button } from "@material-ui/core";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";

import Modal from "react-bootstrap/Modal";

export default class ManageJoinDetail extends Component {
  state = {
    joindata: {},
    questions: [],
    answers: [],
    evaluations: [],
    showAnswerInfo: {},
    answerModal: false,
    accountModal: false
  };

  componentDidMount() {
    this.getJoinData();
    this.getAllQuestions();
    this.getEvaluations();
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getAllQuestions = async () => {
    await api
      .getAllQuestions()
      .then(res => {
        this.setState({
          questions: res.data
        });
      })
      .catch(err => console.log(err));
  };

  getJoinData = async () => {
    await api
      .getJoinDatawithId(this.props.match.params.id)
      .then(res => {
        this.setState({
          joindata: res.data,
          answers: res.data.answer
        });
      })
      .catch(err => console.log(err));
  };

  getEvaluations = async () => {
    await api
      .getEvaluationsWithApplyId(this.props.match.params.id)
      .then(res => {
        this.setState({
          evaluations: res.data
        });
      });
  };

  createRow = (key, value) => {
    return (
      <TableRow>
        <TableCell>{key}</TableCell>
        <TableCell>{value}</TableCell>
      </TableRow>
    );
  };

  modalOpen = modalName => {
    this.setState({
      [modalName]: true
    });
  };

  modalClose = modalName => {
    this.setState({
      [modalName]: false
    });
  };

  showAnswer = (event, question_id) => {
    event.preventDefault();
    let answers = this.state.answers;
    let ans_index = answers.findIndex(ans => ans.question_id === question_id);
    // console.log(answers[ans_index]);
    this.setState({ showAnswerInfo: answers[ans_index] });
    this.modalOpen("answerModal");
  };

  render() {
    const status_type = {
      R: "심사중",
      F: "불합격",
      P: "합격"
    };

    return (
      <Container maxWidth="lg" className="PostingSection">
        <Typography
          variant="h4"
          style={{ alignItems: "flex-start", float: "left" }}
        >
          지원자 상세정보
        </Typography>

        <Grid container spacing={2}>
          <Grid item sm={2}></Grid>
          <Grid item xs={12} sm={8}>
            <AuthButton
              authType="permission"
              info={1}
              boardName=""
              button={
                <>
                  <Button
                    color="secondary"
                    size="large"
                    style={{ alignItems: "flex-end", float: "right" }}
                    onClick={e => this.modalOpen("accountModal")}
                  >
                    계정부여
                  </Button>
                </>
              }
            />

            <AccountGrantForm
              getJoinData={this.getJoinData}
              joinId={this.props.match.params.id}
              open={this.state.accountModal}
              handlingClose={this.modalClose}
            />

            <Table>
              <TableBody>
                {this.createRow("지원번호", this.state.joindata.id)}
                {this.createRow(
                  "지원일자(최종제출일)",
                  moment(this.state.joindata.update_date).format(
                    "YYYY/MM/DD hh:mm"
                  )
                )}
                {this.createRow("성명", this.state.joindata.name)}
                {this.createRow("전화번호", this.state.joindata.phone_number)}
                {this.createRow("학번", this.state.joindata.student_id)}
                {this.createRow(
                  "생년월일",
                  moment(this.state.joindata.birth).format("YYYY/MM/DD")
                )}
                {this.createRow("성별", this.state.joindata.sex)}
                {this.createRow("전공", this.state.joindata.major)}
                {this.createRow("E-Mail", this.state.joindata.email)}
                {this.createRow(
                  "지원상태",
                  status_type[this.state.joindata.status]
                )}
              </TableBody>
              <br />
            </Table>
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
                          답변보기
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider variant="inset" />
                  </>
                );
              })}
            </List>
            <Modal
              size="lg"
              show={this.state.answerModal}
              onHide={e => this.modalClose("answerModal")}
            >
              <Modal.Header closeButton>
                <Modal.Title>Answer</Modal.Title>
              </Modal.Header>
              <Modal.Body>{this.state.showAnswerInfo.body}</Modal.Body>
              <Modal.Footer>
                <Button onClick={e => this.modalClose("answerModal")}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            <br />
            <Link to={"/admission/management/"}>Back</Link>
            <hr />
          </Grid>
          <Grid item sm={2}></Grid>

          {/* Evaluation */}
          <Grid item sm={1}></Grid>
          <Grid item xs={12} sm={10}>
            <Typography variant="h5">Evaluation</Typography>
            <hr />
            {this.state.evaluations.map(elem => (
              <EvaluationView
                key={elem.id}
                user_id={elem.user_id}
                author_name={elem.user_name}
                body={elem.body}
                score={elem.score}
                comment_id={elem.id}
                application_id={elem.application_id}
                user_img={elem.user_img}
                getEvaluations={this.getEvaluations}
              />
            ))}

            <EvaluationNew
              applicationId={this.state.joindata.id}
              getEvaluations={this.getEvaluations}
            />
          </Grid>
          <Grid item sm={2}></Grid>
        </Grid>
      </Container>
    );
  }
}
