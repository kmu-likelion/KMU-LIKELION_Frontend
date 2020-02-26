import React, { Component } from "react";
import api from "../../../api/AdmissionAPI";
//@material-ui
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = theme => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  textField: {
    display: "flex",
    paddingBottom: "1rem"
  }
});

class CheckBasicForm extends Component {
  state = {
    // joinInfo: {},
    editFlag: false
  };

  componentDidMount() {
    // const { joinInfo } = this.props;
    // this.setState({
    //   joinInfo: joinInfo
    // });
  }

  //   handlingSubmit = async event => {
  //     event.preventDefault();
  //     await api
  //       .updateAnswer(this.props.answerInfo.id, {
  //         body: this.state.body,
  //         application_id: this.props.answerInfo.application_id,
  //         question_id: this.props.answerInfo.question_id
  //       })
  //       .then(res => {
  //         console.log("성공적으로 수정됨.", res.data);
  //         this.closeModal();
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   };

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  changeMode = (event, body) => {
    this.setState(prevState => ({
      editFlag: !prevState.editFlag,
      body: body
    }));
  };

  viewData = (key, value) => {
    return { key, value };
  };

  render() {
    const { joinInfo } = this.props;
    console.log("베이직폼 컴포넌트 렌더 : ", joinInfo);
    const joinData = [
      this.viewData("지원번호", joinInfo.id),
      this.viewData("성명", joinInfo.name),
      this.viewData("전화번호", joinInfo.phone_number),
      this.viewData("학번", joinInfo.student_id),
      this.viewData("학과", joinInfo.major),
      this.viewData("성별", joinInfo.sex),
      this.viewData("생년월일", joinInfo.birth)
    ];
    const status_type = {
      R: "심사중",
      F: "불합격",
      P: "합격"
    };
    const { classes } = this.props;
    // const { open, handlingClose, answerInfo } = this.props;
    if (!this.state.editFlag) {
      return (
        <>
          <TableContainer className="join-table-section">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>지원상태</TableCell>
                  <TableCell>{status_type[joinInfo.status]}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {joinData.map(col => (
                  <TableRow>
                    <TableCell>{col.key}</TableCell>
                    <TableCell>{col.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button color="primary" size="small">
              인적정보 수정
            </Button>
          </TableContainer>
        </>
      );
    } else {
      return <></>;
    }
  }
}

export default withStyles(useStyles)(CheckBasicForm);
