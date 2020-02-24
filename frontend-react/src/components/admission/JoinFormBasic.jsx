import "date-fns";
import React from "react";
import JoinStore from "./joinStore";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

class JoinFormBasic extends React.Component {
  static contextType = JoinStore;
  state = {
    name: "",
    phoneNum: "",
    major: "",
    studentId: "",
    birth: new Date(),
    sex: "female",
    email: "",
    password: ""
  };

  handlingContext = async event => {
    event.preventDefault();
    await this.saveContent();
  };

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  saveContent = () => {
    //contextAPI 전역상태에 form데이터를 저장.
    this.context.name = this.state.name;
    this.context.phoneNum = this.state.phoneNum;
    this.context.major = this.state.major;
    this.context.studentId = this.state.studentId;
    this.context.birth = this.state.birth;
    this.context.sex = this.state.sex;
    this.context.email = this.state.email;
    this.context.pw = this.state.password;
  };

  render() {
    return (
      <>
        <form
          onSubmit={event => {
            this.props.setFlag();
            this.handlingContext(event);
          }}
          className="PostingForm"
        >
          <h2>Join Form</h2>
          <TextField
            label="Name"
            name="name"
            value={this.state.name}
            onChange={this.handlingChange}
            margin="normal"
            required
          />
          <br />
          <TextField
            label="Phone Number"
            name="phoneNum"
            value={this.state.phoneNum}
            onChange={this.handlingChange}
            margin="normal"
            required
          />
          <br />
          <TextField
            label="Major"
            name="major"
            value={this.state.major}
            onChange={this.handlingChange}
            margin="normal"
            required
          />
          <br />
          <TextField
            label="Student ID"
            name="studentId"
            value={this.state.studentId}
            onChange={this.handlingChange}
            margin="normal"
            required
          />
          <br />
          <TextField
            label="E-Mail"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handlingChange}
            margin="normal"
            required
          />

          <br />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              label="birth Date"
              margin="normal"
              format="yyyy/MM/dd"
              name="birth"
              value={this.state.birth}
              onChange={event => this.setState({ birth: event })}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </MuiPickersUtilsProvider>
          <br />
          <br />

          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="sex"
            name="sex"
            value={this.state.sex}
            onChange={this.handlingChange}
          >
            <FormControlLabel
              value="female"
              control={<Radio color="primary" />}
              label="Female"
            />
            <FormControlLabel
              value="male"
              control={<Radio color="primary" />}
              label="Male"
            />
            <FormControlLabel
              value="other"
              control={<Radio color="primary" />}
              label="Other"
            />
          </RadioGroup>

          <TextField
            label="Password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handlingChange}
            margin="normal"
            required
          />
          <br />
          <small>*지원내역 열람/수정을 위한 임시 비밀번호입니다.*</small>
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            // onClick={props.setFlag}
            type="submit"
          >
            Next
          </Button>
        </form>

        <br />
      </>
    );
  }
}

export default JoinFormBasic;
