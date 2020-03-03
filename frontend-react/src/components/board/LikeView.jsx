import React, { Component } from "react";
// import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import api from "../../api/BoardAPI";

export default class LikeView extends Component {
  state = {
    post_id: "",
    board_name: "",
    is_liked: ""
  };

  componentWillMount() {
    console.log("LikeView ComponentWillMount");
    const { post_id, board_name } = this.props;
    this.setState({
      post_id: post_id,
      board_name: board_name
    });
    this.getLikeStatus(board_name, post_id);
  }

  // componentDidMount() {
  //   console.log("LikeView ComponentDidMount");
  // }

  getLikeStatus = async (url, id) => {
    await api
      .getLike(url, id)
      .then(status => {
        console.log("return : ", status);
        console.log("현재 스크랩 상태 : ", status.data.status);
        this.changeLikeStatus(status.data.state);
      })
      .catch(err => console.log(err));
    console.log("get Like 성공.");
  };

  handlingLike = async (url, id) => {
    await api
      .changeLike(url, id)
      .then(status => {
        console.log("변경된 스크랩 상태 : ", status);
        this.changeLikeStatus(status.data.state);
      })
      .catch(err => console.log(err));
    console.log("change scrap 성공.");
  };

  changeLikeStatus = status => {
    if (status === true) {
      this.setState({
        is_liked: "true"
      });
    } else if (status === false) {
      this.setState({
        is_liked: "false"
      });
    }
  };

  render() {
    if (window.sessionStorage.getItem("username") !== null) {
      if (this.state.is_liked === "true") {
        return (
          <IconButton
            color="secondary"
            size="medium"
            onClick={event =>
              this.handlingLike(this.state.board_name, this.state.post_id)
            }
          >
            <FavoriteIcon />
          </IconButton>
        );
      } else {
        return (
          <IconButton
            color="secondary"
            size="medium"
            onClick={event =>
              this.handlingLike(this.state.board_name, this.state.post_id)
            }
          >
            <FavoriteBorderIcon />
          </IconButton>
        );
      }
    } else {
      return <></>;
    }
  }
}
