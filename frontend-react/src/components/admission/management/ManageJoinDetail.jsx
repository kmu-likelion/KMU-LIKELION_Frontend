import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/AdmissionAPI";
import EvaluationView from "./EvaluationView";
import EvaluationNew from "./EvaluationNew";

//@material-ui
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import Button from "@material-ui/core/Button";

import Modal from "react-bootstrap/Modal";

export default class ManageJoinDetail extends Component {
  state = {
    joindata: {},
    questions: [],
    answers: [],
    evaluations: [],
    showAnswerInfo: {},
    modalFlag: false
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
        console.log("모든 질문사항 가져옴", res);
        this.setState({
          questions: res.data
        });
      })
      .catch(err => console.log(err));
  };

  getJoinData = async () => {
    await api.getJoinDatawithId(this.props.match.params.id).then(res => {
      console.log("유저지원데이터 가져오기 성공. ", res.data);
      this.setState({
        joindata: res.data,
        answers: res.data.answer
      });
    });
  };

  getEvaluations = async () => {
    await api
      .getEvaluationsWithApplyId(this.props.match.params.id)
      .then(res => {
        console.log("성공적으로 평가데이터 가져옴", res.data);
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
    let ans_index = answers.findIndex(ans => ans.question_id === question_id);
    console.log(answers[ans_index]);
    this.setState({ showAnswerInfo: answers[ans_index] });
    this.modalOpen();
  };

  render() {
    // const { index, id, body, deleteQuestion } = this.props;
    const status_type = {
      R: "심사중",
      F: "불합격",
      P: "합격"
    };
    return (
      <Container maxWidth="lg" className="PostingSection">
        <h2>상세 지원내역</h2>
        <Grid container spacing={2}>
          <Grid item sm={2}></Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4">지원자 상세정보</Typography>
            <Table>
              <TableBody>
                {this.createRow("지원번호", this.state.joindata.id)}
                {this.createRow("성명", this.state.joindata.name)}
                {this.createRow("전화번호", this.state.joindata.phone_number)}
                {this.createRow("학번", this.state.joindata.student_id)}
                {this.createRow("생년월일", this.state.joindata.birth)}
                {this.createRow("성별", this.state.joindata.sex)}
                {this.createRow("전공", this.state.joindata.major)}
                {this.createRow("E-Mail", this.state.joindata.email)}
                {this.createRow(
                  "지원상태",
                  status_type[this.state.joindata.status]
                )}
              </TableBody>
              <br />
              <Link to={"/admission/management/"}>Back</Link>
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
              show={this.state.modalFlag}
              onHide={this.modalClose}
            >
              <Modal.Header closeButton>
                <Modal.Title>Answer</Modal.Title>
              </Modal.Header>
              <Modal.Body>{this.state.showAnswerInfo.body}</Modal.Body>
              <Modal.Footer>
                <Button onClick={this.modalClose}>Close</Button>
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
                user_img={elem.id}
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
