import "date-fns";
import React, { useState, useContext, useEffect } from "react";
import JoinStore from "./joinStore";

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

export default function RadioButtonsGroup(props) {
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [major, setMajor] = useState("");
  const [studentId, setStudentId] = useState("");
  const [birth, setBirth] = useState(new Date());
  const [sex, setSex] = useState("female");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  useEffect(() => {
    handlingContext();
  });

  const classes = useStyles();
  const appli_info = useContext(JoinStore);

  const handlingContext = async () => {
    await saveContent();
  };

  const saveContent = () => {
    // let infos = [];
    // let info = {
    //   name: name,
    //   phoneNum: phoneNum,
    //   major: major,
    //   studentId: studentId,
    //   birth: birth,
    //   sex: sex,
    //   email: email
    // };
    // infos.push(info);

    appli_info.name = name;
    appli_info.phoneNum = phoneNum;
    appli_info.major = major;
    appli_info.studentId = studentId;
    appli_info.birth = birth;
    appli_info.sex = sex;
    appli_info.email = email;
    appli_info.pw = pw;
  };

  return (
    <div>
      <InputLabel className={classes.formControl}>
        <h2>Join Form</h2>
        <hr />
      </InputLabel>
      <form onSubmit={props.setFlag} className="PostingForm">
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
        <FormControl className={classes.formControl}>
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
        <FormControl className={classes.formControl}>
          <small>*지원내역 열람/수정을 위한 임시 비밀번호입니다.*</small>
          <InputLabel>Password</InputLabel>
          <Input
            id="component-simple"
            value={pw}
            onChange={e => setPw(e.target.value)}
            required
          />
        </FormControl>
        <br />
        <Button
          variant="contained"
          color="primary"
          // onClick={props.setFlag}
          type="submit"
          className={classes.formControl}
        >
          Next
        </Button>
      </form>

      <br />

      <hr />
    </div>
  );
}
