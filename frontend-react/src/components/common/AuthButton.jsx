import React from "react";
import api from "../../api/BoardAPI";
import { isThursday } from "date-fns/esm";

class AuthButton extends React.Component {
  state = {
    userType: "",
    userId: "",
    writerId: "",
    logged: ""
  };
  componentWillMount() {
    this.getWriter();
    console.log("시발???", window.sessionStorage.getItem("username"));
    if (window.sessionStorage.getItem("username") !== null) {
      this.setState({
        userType: Number(window.sessionStorage.getItem("user_type")),
        userId: Number(window.sessionStorage.getItem("id")),
        logged: true
      });
    }
  }

  getWriter = async () => {
    await api
      .getPost(this.props.boardName, this.props.info)
      .then(res => {
        console.log("data: ", res.data);
        this.setState({
          writerId: res.data.user_id
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    /* {authType}
       isWriter : 작성자 본인인지 확인
        (info=postid -> post id값으로 작성자 id를 가져옴)
       logged : 로그인 상태인지 확인
        (info="")
       permission : 유저권한 제한
        (info=permission usertype)
    */
    const { authType, info, button } = this.props;
    let renderButton = <></>;

    if (this.state.logged) {
      switch (authType) {
        case "isWriter":
          console.log("렌더된 작성자 ", this.state.writerId);
          console.log("렌더된 현재유저 ", this.state.userId);
          if (this.state.writerId === this.state.userId) {
            renderButton = button;
          }
          break;
        case "logged":
          if (this.state.logged) {
            renderButton = button;
          }
          break;

        case "permission":
          console.log("인포 시발 ", info);
          console.log("유저타입 ", this.state.userType);
          if (info >= this.state.userType) {
            console.log("실행 시발 ");
            renderButton = button;
          }
          break;

        default:
          break;
      }
    }

    return renderButton;
  }
}
export default AuthButton;
