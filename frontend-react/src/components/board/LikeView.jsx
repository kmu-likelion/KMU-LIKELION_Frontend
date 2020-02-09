import React, { Component } from "react";
import Button from "@material-ui/core/Button";
// import CardActions from '@material-ui/core/CardActions';
import api from "../../api/api_board";

export default class LikeView extends Component {
  state = {
    board_id: "",
    is_liked: ""
  };

  componentDidMount() {
    console.log("LikeView ComponentDidMount");
    const { board_id } = this.props;
    this.setState({
      board_id: board_id
    });
    this.getLikeStatus(board_id);
  }

  getLikeStatus = async id => {
    await api
      .getLike("recruit", id)
      .then(status => {
        console.log("return : ", status);
        console.log("현재 스크랩 상태 : ", status.data.status);
        this.changeLikeStatus(status.data.state);
      })
      .catch(err => console.log(err));
    console.log("get Like 성공.");
  };

  handlingLike = async id => {
    await api
      .changeLike("recruit", id)
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
    // const { board_id } = this.props;

    if (this.state.is_liked === "true") {
      console.log("true값이며 id는 : ", this.state.board_id);
      return (
        <Button
          color="primary"
          size="small"
          onClick={event => this.handlingLike(this.state.board_id)}
        >
          Liked
        </Button>
      );
    } else {
      console.log("false값이며 id는 : ", this.state.board_id);
      return (
        <Button
          color="secondary"
          size="small"
          onClick={event => this.handlingLike(this.state.board_id)}
        >
          Like
        </Button>
      );
    }
  }
}
