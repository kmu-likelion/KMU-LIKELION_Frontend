import React from "react";
import api from "../../api/BoardAPI";

class AuthButton extends React.Component {
  state = {
    userType: "",
    userId: "",
    writerId: "",
    logged: ""
  };
  componentWillMount() {
    this.getWriter();
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
        this.setState({
          writerId: res.data.user_id
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { authType, info, button } = this.props;
    let renderButton = <></>;

    if (this.state.logged) {
      switch (authType) {
        case "isWriter":
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
          if (info >= this.state.userType) {
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
