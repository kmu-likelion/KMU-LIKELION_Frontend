import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "@material-ui/core/Button";
import api from "../../../api/AdmissionAPI";
import { registerUser } from "../../../api/AuthAPI";

import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

class AccountGrantForm extends React.Component {
  state = {
    joinData: {},
    selectOpen: false,
    userType: "3",
    startNumber: "8기"
  };
  componentDidMount() {
    console.log("아이디!!! ", this.props.joinId);

    this.getJoinData();
  }

  getJoinData = async () => {
    await api
      .getJoinDatawithId(this.props.joinId)
      .then(res => {
        console.log("[Modal] get joinData", res.data);
        this.setState({
          joinData: res.data
        });

        // let username = res.data.email;
        // username = username.split("@")[0];
        // console.log(username);
      })
      .catch(err => console.log(err));
  };

  grantUser = async event => {
    event.preventDefault();
    if (window.confirm("해당 권한으로 계정을 생성하시겠습니까?") === true) {
      let username = this.state.joinData.email;
      username = username.split("@")[0];
      console.log("회원가입될 유저네임!", username);

      registerUser({
        username: username,
        password: `kmu${this.state.joinData.student_id}`,
        first_name: this.state.joinData.name,
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
    const { joinId, open, handlingClose } = this.props;

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
              <TextField
                label="입부기수"
                defaultValue="8기" //나중에 수정때리던가.. 아 귀찮아 죽겠오
                disabled
              />
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
