import React from "react";
import { registerUser } from "../../../api/AuthAPI";
import api from "../../../api/AdmissionAPI";

import Modal from "react-bootstrap/Modal";
import {
  Button,
  TextField,
  Select,
  InputLabel,
  MenuItem
} from "@material-ui/core";

class AccountGrantForm extends React.Component {
  state = {
    joinData: {},
    selectOpen: false,
    userType: "3",
    startNumber: "8th"
  };
  componentDidMount() {
    this.getJoinData();
  }

  getJoinData = async () => {
    await api
      .getJoinDatawithId(this.props.joinId)
      .then(res => {
        // console.log("[Modal] get joinData", res.data);
        this.setState({
          joinData: res.data
        });
      })
      .catch(err => console.log(err));
  };

  grantUser = async event => {
    event.preventDefault();
    if (window.confirm("해당 권한으로 계정을 생성하시겠습니까?") === true) {
      let username = this.state.joinData.email;
      username = username.split("@")[0];
      console.log("부여된 username : ", username);

      registerUser({
        username: username,
        password: `kmu${this.state.joinData.student_id}`, //password는 (kmu + 지원자학번)
        first_name: this.state.joinData.name, //fistname 만을 사용하도록 함.
        last_name: "",
        email: this.state.joinData.email,
        major: this.state.joinData.major,
        is_active: true,
        student_id: this.state.joinData.student_id,
        user_type: Number(this.state.userType),
        sns_id: "",
        is_staff: false,
        is_superuser: false,
        start_number: this.state.startNumber
      })
        .then(res => {
          console.log("계정생성 성공", res.data);
          this.props.handlingClose("accountModal");
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    const { open, handlingClose } = this.props;

    return (
      <div>
        <Modal show={open} onHide={e => handlingClose("accountModal")}>
          <Modal.Header closeButton>
            <Modal.Title>계정 부여설정</Modal.Title>
          </Modal.Header>
          <form onSubmit={e => this.grantUser(e)}>
            <Modal.Body>
              <InputLabel id="usertype-select-label">유저 권한</InputLabel>
              <Select
                labelId="usertype-select-label"
                id="usertype-controlled-open-select"
                open={this.state.selectOpen}
                onClose={e => this.setState({ selectOpen: false })}
                name="userType"
                onOpen={e => this.setState({ selectOpen: true })}
                value={this.state.userType}
                onChange={e => this.setState({ userType: e.target.value })}
              >
                <MenuItem value={1}>회장</MenuItem>
                <MenuItem value={2}>운영진</MenuItem>
                <MenuItem value={3}>부원</MenuItem>
              </Select>
              <br />
              <br />
              <TextField label="입부기수" defaultValue="8기" disabled />
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit">계정생성 </Button>
              <Button onClick={e => handlingClose("accountModal")}>
                Close
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}

export default AccountGrantForm;
