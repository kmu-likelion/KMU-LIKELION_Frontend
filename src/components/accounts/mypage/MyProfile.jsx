import React, { Component } from "react";
import { getUser } from "../../../api/AuthAPI";

// @material-ui
import { TextField, Button, Typography} from "@material-ui/core";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

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
    password:"",
  };

  componentDidMount() {
    this.setState({userNow:window.sessionStorage.getItem("id")});
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
    const username= this.props.username;

    if (this.state.is_update === false ){
      return (
        
          <TableContainer>
            <Table
              style={{
                width: "100%",
                padding: 20,
                borderCollapse: "seperate"
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell colSpan={2}>
                    <Typography variant="h4">My Profile</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData.map((col, index) => (
                  <TableRow key={index} style={{ padding: 10 }}>
                    <TableCell>{col.key}</TableCell>
                    <TableCell>{col.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {username === window.sessionStorage.getItem("username")
              ? (
                <Button
                  className="faked"
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<SaveIcon />}
                  onClick={e => this.setState({ is_update: true })}
                  style={{marginTop : 20}}
                >
                  정보수정
                </Button>
              ) : (
                <></>
              )
            }
          </TableContainer>
      );
    } else{
      return (
        <div >
          <Typography variant="h4">Update Profile</Typography>
          <hr />
          <form onSubmit={e => this.handlingSubmit(e, this.state.userId)} style={{ textAlign: 'center', lineHeight: 4}}>
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

            {/* <div className="modal fade" id="exampleModal2" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">패스워드 수정</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
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
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" onClick={this.refreshPage}>Save changes</button>
                </div>
              </div>
            </div>
          </div> */}

          <Button
              className="faked"
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<SaveIcon />}
              type="submit"
              onClick={this.refreshPage}
            >
              저장
            </Button>
          </form>
        </div>
      );
    }
  }
}
