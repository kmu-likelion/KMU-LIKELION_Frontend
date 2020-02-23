import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import api from "../../api/BoardAPI";

export default class LikeView extends Component {
  state = {
    post_id: "",
    board_name: "",
    is_liked: ""
  };

  componentDidMount() {
    console.log("LikeView ComponentDidMount");
    const { post_id, board_name } = this.props;
    this.setState({
      post_id: post_id,
      board_name: board_name
    });
    this.getLikeStatus(board_name, post_id);
  }

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
    // document.location.href = "/study";
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
    if (this.state.is_liked === "true") {
      console.log("true값이며 id는 : ", this.state.post_id);
      return (
        <Button
          color="primary"
          size="small"
          onClick={event =>
            this.handlingLike(this.state.board_name, this.state.post_id)
          }
        >
          Liked
        </Button>
      );
    } else {
      console.log("false값이며 id는 : ", this.state.post_id);
      return (
        <Button
          color="secondary"
          size="small"
          onClick={event =>
            this.handlingLike(this.state.board_name, this.state.post_id)
          }
        >
          Like
        </Button>
      );
    }
  }
}
