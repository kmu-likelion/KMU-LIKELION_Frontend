import "date-fns";
import React, { useState } from "react";
import api from "../../api/auth_admission";

import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2)
  }
}));

export default function RadioButtonsGroup() {
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [major, setMajor] = useState("");
  const [studentId, setStudentId] = useState("");
  const [birth, setBirth] = useState(new Date());
  const [sex, setSex] = useState("female");
  const [email, setEmail] = useState("");

  const classes = useStyles();

  //   const handleChange = event => {
  //     setValue(event.target.value);
  //   };
  const handlingSubmit = async event => {
    event.preventDefault(); //event의 디폴트 기능(새로고침 되는 것 등..) -> 막는다.

    await api
      .submitJoinForm({
        name: name,
        phone_number: phoneNum,
        student_id: studentId,
        birth: "2020-12-31",
        sex: sex,
        major: major,
        email: email
      })
      .then(res => {
        console.log("정상적으로 제출됨", res);
        document.location.href = "/";
      })
      .catch(err => {
        console.log(err);
      });
    // await api
    //   .createPost("QnA", {
    //     title: this.state.title,
    //     body: this.state.body,
    //     subject: this.state.subject,
    //     writer: this.state.id
    //   })
    //   .then(result => {
    //     console.log("정상적으로 생성됨.", result);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    // this.getPosts()

    // this.props.history.push("/");
  };

  return (
    <div>
      <InputLabel className={classes.formControl}>
        <h2>Join Form</h2>
        <hr />
      </InputLabel>
      <form onSubmit={handlingSubmit} className="PostingForm">
        <FormControl className={classes.formControl}>
          <InputLabel>Name</InputLabel>
          <Input
            id="component-simple"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </FormControl>
        <br />
        <FormControl className={classes.formControl}>
          <InputLabel>Phone Number</InputLabel>
          <Input
            id="component-simple"
            value={phoneNum}
            onChange={e => setPhoneNum(e.target.value)}
            required
          />
        </FormControl>
        <br />
        <FormControl className={classes.formControl}>
          <InputLabel>Major</InputLabel>
          <Input
            id="component-simple"
            value={major}
            onChange={e => setMajor(e.target.value)}
            required
          />
        </FormControl>
        <br />
        <FormControl className={classes.formControl}>
          <InputLabel>Student ID</InputLabel>
          <Input
            id="component-simple"
            value={studentId}
            onChange={e => setStudentId(e.target.value)}
            required
          />
        </FormControl>
        <br />
        <FormControl className={classes.formControl}>
          <InputLabel>E-Mail</InputLabel>
          <Input
            type="email"
            id="component-simple"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </FormControl>
        <br />
        <FormControl>
          <InputLabel>Birth Date</InputLabel>
          <br />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              // id="date-picker-dialog"
              // label="Date picker dialog"
              format="MM/dd/yyyy"
              value={birth}
              onChange={e => setBirth(e)}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </MuiPickersUtilsProvider>
        </FormControl>

        <br />

        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender"
            value={sex}
            onChange={e => setSex(e.target.value)}
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
        </FormControl>
        <br />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        <br />
      </form>

      <hr />
    </div>
  );
}
