import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import api from "../../api/api_admission";
import Input from "@material-ui/core/Input";
import { Link } from "react-router-dom";

export default class ManageJoinDetail extends Component {
  state = {
    joindata: {}
  };

  componentDidMount() {
    this.getJoinData();
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getJoinData = async () => {
    await api.getJoinData(this.props.match.params.id).then(res => {
      console.log("유저지원데이터 가져오기 성공. ", res.data);
      this.setState({
        joindata: res.data
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

  render() {
    // const { index, id, body, deleteQuestion } = this.props;
    return (
      <Container maxWidth="lg" className="PostingSection">
        <h2>상세 지원내역</h2>
        <Grid container spacing={2}>
          <Grid item xs={1} sm={2}></Grid>
          <Grid item xs={10} sm={8}>
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
                {this.createRow("지원상태", this.state.joindata.status)}
              </TableBody>
              <br />
              <Link to={"/admission/management/"}>Back</Link>
            </Table>
          </Grid>
          <Grid item xs={1} sm={2}></Grid>
        </Grid>
        <hr />
        평가
      </Container>
    );
  }
}
