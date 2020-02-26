import React, { Component } from "react";
import api from "../../../api/AdmissionAPI";
import AdmissionStore from "../../../store/AdmissionStore";
import moment from "moment";
//@material-ui
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

//bootstrap
import Modal from "react-bootstrap/Modal";

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

class CheckAnswerForm extends Component {
  static contextType = AdmissionStore;
  state = {
    name: "",
    phoneNum: "",
    major: "",
    studentId: "",
    birth: "",
    sex: "female",
    email: "",
    password: ""
  };

  componentDidMount() {
    this.getApplicationData(this.context.state.applicationId);
  }

  getApplicationData = async id => {
    await api
      .getJoinDatawithId(id)
      .then(res => {
        console.log("업데이트 모달을 위한 데이터 가져옴 ", res.data);
        this.setState({
          name: res.data.name,
          phoneNum: res.data.phone_number,
          major: res.data.major,
          studentId: res.data.student_id,
          birth: res.data.birth,
          sex: res.data.sex,
          email: res.data.email,
          password: res.data.pw
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handlingSubmit = async event => {
    event.preventDefault();
    await api
      .updateJoinData(this.context.state.applicationId, {
        name: this.state.name,
        phone_number: this.state.phoneNum,
        student_id: this.state.studentId,
        birth: moment(this.state.birth).format("YYYY-MM-DD"),
        sex: this.state.sex,
        major: this.state.major,
        email: this.state.email,
        pw: this.state.password
      })
      .then(res => {
        console.log("정상적으로 업데이트 됨", res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state.name);
  };

  render() {
    const { classes } = this.props;
    const { open, handlingClose } = this.props;

    return (
      <>
        <Modal size="lg" show={open} onHide={handlingClose}>
          <Modal.Header closeButton>
            <Modal.Title>기본정보 수정</Modal.Title>
          </Modal.Header>
          <form onSubmit={e => this.handlingSubmit(e)}>
            <Modal.Body>
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
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit">수정제출</Button>
              <Button onClick={handlingClose}>Close</Button>
            </Modal.Footer>
          </form>
        </Modal>
      </>
    );
  }
}

export default withStyles(useStyles)(CheckAnswerForm);
