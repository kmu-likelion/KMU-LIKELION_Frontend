import React, { Component } from "react";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import api from "../../../api/AdmissionAPI";
import { Link } from "react-router-dom";

import Input from "@material-ui/core/Input";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ManageQuestionForm from "./ManageQuestionForm";

class CheckJoin extends Component {
  state = {
    joindata: [],
    questions: [],
    question_input: ""
  };

  componentDidMount() {
    console.log("New ComponentDidMount");
    this.getAllJoinDatas();
    this.getAllQuestions();
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getAllJoinDatas = async () => {
    await api.getAllJoinData().then(res => {
      console.log(res);
      this.setState({
        joindata: res.data
      });
    });
  };

  getAllQuestions = async () => {
    await api.getAllQuestions().then(res => {
      console.log(res);
      this.setState({
        questions: res.data
      });
    });
  };

  addQuestion = async event => {
    event.preventDefault();
    await api
      .createQuestion({
        body: this.state.question_input
      })
      .then(res => {
        console.log("질문생성 성공!", res);
        this.getAllQuestions();
        this.setState({
          question_input: ""
        });
      });
  };

  deleteQuestion = async id => {
    // console.log("지우려는 질문 id :", id);
    await api.deleteQuestion(id).then(res => {
      console.log("질문삭제 성공!", res);
      this.getAllQuestions();
    });
  };

  render() {
    const qus_num = this.state.questions.length + 2;
    console.log(qus_num);
    const useStyles = makeStyles({
      table: {
        // minWidth: 650
      }
    });
    return (
      <Container maxWidth="lg" className="PostingSection">
        <Paper className="PostingPaper" elevation={0}>
          <Typography variant="h4">지원자 관리 페이지</Typography>
          <hr />
          <br />
          <TableContainer>
            <Table className={useStyles.table}>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={4}>모집정보</TableCell>
                  <TableCell>모집상태 [모집중]</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>지원기간 </TableCell>
                  <TableCell colSpan={3}>20.02.12 ~ 20.03.10</TableCell>
                  <TableCell>
                    <Button>기간수정</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell rowSpan={qus_num}>질문 항목</TableCell>
                  <TableCell>Num</TableCell>
                  <TableCell colSpan={3}>Question</TableCell>
                </TableRow>
                {this.state.questions.map((qus, index) => {
                  return (
                    <ManageQuestionForm
                      index={index}
                      id={qus.id}
                      body={qus.body}
                      deleteQuestion={this.deleteQuestion}
                      getAllQuestions={this.getAllQuestions}
                    />
                  );
                })}
                <TableRow>
                  <TableCell colSpan={4}>
                    <form onSubmit={event => this.addQuestion(event)}>
                      +&nbsp;
                      <Input
                        name="question_input"
                        value={this.state.question_input}
                        onChange={this.handlingChange}
                        required
                      ></Input>
                      <Button type="submit">질문추가</Button>
                    </form>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <br />

          <Typography variant="h5">지원 현황</Typography>

          <TableContainer>
            <Table className={useStyles.table}>
              <TableHead>
                <TableRow>
                  <TableCell>지원번호</TableCell>
                  <TableCell>이름</TableCell>
                  <TableCell>학과</TableCell>
                  <TableCell>점수</TableCell>
                  <TableCell colSpan={2}>현황</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.joindata.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.major}</TableCell>
                    <TableCell>0.0</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>
                      <Link to={`/admission/management/${row.id}`}>
                        보러가기
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <br />
      </Container>
    );
  }
}

export default CheckJoin;
