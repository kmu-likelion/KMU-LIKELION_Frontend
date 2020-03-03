import React, { Component } from "react";
import { getUser, updateUser } from "../../../api/AuthAPI";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export default class MyProfile extends Component {
  state = {
    userId: "",
    is_update: false,
    major: "",
    start_number: "",
    student_id: "",
    email: "",
    user_type: "",
    first_name: "",
    username: "",
    img: "",
    sns_id: "",
    password:""
  };
  componentDidMount() {
    this.getUserData(this.props.username);
  }

  getUserData = async username => {
    await getUser(username)
      .then(res => {
        console.log("업데이트 컴포넌트 용 유저데이터", res.data[0]);
        const userInfo = res.data[0];
        this.setState({
          userId: userInfo.id,
          username: userInfo.username,
          first_name: userInfo.first_name,
          img: userInfo.img,
          email: userInfo.email,
          major: userInfo.major,
          student_id: userInfo.student_id,
          user_type: userInfo.user_type,
          start_number: userInfo.start_number,
          sns_id: userInfo.sns_id,
        });
      })
      .catch(err => console.log(err));
  };

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handlingSubmit = (event, id) => {
    event.preventDefault();
    this.setState({ is_update: false });
    this.props.updateUser(id, {
      username: this.state.username,
      first_name: this.state.first_name,
      // img: this.state.img,
      id: this.state.userId,
      email: this.state.email,
      major: this.state.major,
      student_id: this.state.student_id,
      user_type: this.state.user_type,
      start_number: this.state.start_number,
      sns_id: this.state.sns_id,
    });
  };
  handlingpasswordSubmit = (event, id) => {
    event.preventDefault();
    this.setState({ is_update: false });
    this.props.updateUser(id, {
      username: this.state.username,
      first_name: this.state.first_name,
      // img: this.state.img,
      id: this.state.userId,
      email: this.state.email,
      major: this.state.major,
      student_id: this.state.student_id,
      user_type: this.state.user_type,
      start_number: this.state.start_number,
      sns_id: this.state.sns_id,
      password:this.state.password
    });
  };

  viewData = (key, value) => {
    return { key, value };
  };

  render() {
    const userData = [
      this.viewData("성명", this.state.first_name),
      this.viewData("E-mail", this.state.email),
      this.viewData("기수", this.state.start_number),
      this.viewData("학과", this.state.major),
      this.viewData("학번", this.state.student_id),
      this.viewData("SNS", this.state.sns_id)
    ];

    if (this.state.is_update === false ){
      return (
        <Paper
          elevation={10}
          className="MyProfile"
          style={{
            width: "100%",
            padding: 20
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "center",
            // textAlign: "center"
          }}
        >
          <TableContainer className="">
            <Table
              style={{
                width: "100%",
                borderCollapse: "seperate"
              }}
            >
              <TableHead>
                <TableRow>
                  <Typography variant="h4">My Profile</Typography>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData.map(col => (
                  <TableRow style={{ padding: 10 }}>
                    <TableCell>{col.key}</TableCell>
                    <TableCell>{col.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Button
              className="faked"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
              onClick={e => this.setState({ is_update: true })}
            >
              Update
            </Button>
          </TableContainer>
        </Paper>
      );
    } else{
      return (
        <Paper elevation={10} className="MyProfile">
          <Typography variant="h4">Update Profile</Typography>
          <hr />
          <form onSubmit={e => this.handlingSubmit(e, this.state.userId)}>
            <TextField
              className="standard-required"
              label="User Name"
              name="first_name"
              value={this.state.first_name}
              onChange={this.handlingChange}
            />
            <TextField
              className="standard-required"
              label="E-mail"
              name="email"
              value={this.state.email}
              onChange={this.handlingChange}
            />
            <TextField
              className="standard-required"
              label="기수"
              name="start_number"
              value={this.state.start_number}
              onChange={this.handlingChange}
            />
            <TextField
              className="standard-required"
              label="Major"
              name="major"
              value={this.state.major}
              onChange={this.handlingChange}
            />
            <TextField
              className="standard-required"
              label="Student_Num"
              name="student_id"
              value={this.state.student_id}
              onChange={this.handlingChange}
            />
            <TextField
              className="standard-required"
              label="sns_id"
              name="sns_id"
              value={this.state.sns_id}
              onChange={this.handlingChange}
            />
            <br />
            <Button
              className="faked"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
              onClick={null}
              type="button" data-toggle="modal" data-target="#exampleModal2"
            >
              password수정
            </Button>

            <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">패스워드 수정</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                <form onSubmit={e => this.handlingpasswordSubmit(e, this.state.userId)}>
                <TextField
                  className="standard-required"
                  label="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handlingChange}
                />
                </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" type="submit" onClick={this.refreshPage}>Save changes</button>
                </div>
              </div>
            </div>
          </div>

            <Button
              className="faked"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
              type="submit"
            >
              수정
            </Button>
          </form>
        </Paper>
      );
    }
  }
}
