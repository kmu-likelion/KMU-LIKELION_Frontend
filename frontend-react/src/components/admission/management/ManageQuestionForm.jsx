import React, { Component } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import api from "../../../api/AdmissionAPI";
import Input from "@material-ui/core/Input";

export default class ManageQuestionForm extends Component {
  state = {
    update_flag: false,
    id: "",
    body: "",
    update_input: ""
  };

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  updateQuestion = async (event, id) => {
    event.preventDefault();
    await api
      .updateQuestion(id, {
        body: this.state.update_input
      })
      .then(res => {
        console.log("질문 update 성공! ", res.data);
        this.setState({
          update_flag: false,
          update_input: ""
        });
        this.props.getAllQuestions();
      })
      .catch(err => console.log(err));
  };

  render() {
    const { index, id, body, deleteQuestion } = this.props;

    if (this.state.update_flag) {
      return (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell colSpan={4}>
            <form onSubmit={event => this.updateQuestion(event, id)}>
              <Input
                name="update_input"
                value={this.state.update_input}
                onChange={this.handlingChange}
                required
              ></Input>
              <Button type="submit">Submit</Button>
            </form>
          </TableCell>
        </TableRow>
      );
    } else {
      return (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell colSpan={2}>{body}</TableCell>
          <TableCell>
            <Button
              onClick={event =>
                this.setState({ update_flag: true, update_input: body })
              }
            >
              수정
            </Button>
            <Button onClick={event => deleteQuestion(id)}>삭제</Button>
          </TableCell>
        </TableRow>
      );
    }
  }
}
