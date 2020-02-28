import React, { Component } from "react";
import ConfirmBasicForm from "./ConfirmBasicForm";
import AdmissionStore from "../../../store/AdmissionStore";

//@material-ui

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
  static contextType = AdmissionStore;
  state = {
    joinUpdate: [],
    modalFlag: false
  };

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
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
    // this.getJoinDataWithId(this.context.state.applicationId);
  };

  showUpdateForm = event => {
    event.preventDefault();
    this.modalOpen();
  };

  viewData = (key, value) => {
    return { key, value };
  };

  render() {
    const { classes } = this.props;
    const { joinInfo, getJoinData } = this.props;
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
          <Button
            color="primary"
            size="small"
            onClick={event => this.showUpdateForm(event)}
          >
            인적정보 수정
          </Button>
        </TableContainer>
        <ConfirmBasicForm
          open={this.state.modalFlag}
          handlingClose={this.modalClose}
          getJoinData={getJoinData}
        />
      </>
    );
  }
}

export default withStyles(useStyles)(CheckBasicForm);
