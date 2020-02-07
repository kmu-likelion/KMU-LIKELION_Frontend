import React, { Component } from "react";
import Button from "@material-ui/core/Button";
// import CardActions from '@material-ui/core/CardActions';
import api from "../../../api/api_board";
import { tokenConfig } from "../../../action/auth";

export default class ScarpView extends Component {
  state = {
    board_id: "",
    is_scraped: ""
  };

  componentDidMount() {
    console.log("ScrapView ComponentDidMount");
    const { board_id } = this.props;
    this.getScrapStatus(board_id);
  }

  getScrapStatus = async id => {
    await api
      .getScrap("study", id, tokenConfig())
      .then(status => {
        this.changeScrapStatus(status.data.status);
        console.log("현재 스크랩 상태 : ", status.data.status);
      })
      .catch(err => console.log(err));
    console.log("get scrap 성공.");
  };

  handlingScrap = async id => {
    await api
      .changeScrap("study", id, tokenConfig())
      .then(status => {
        this.changeScrapStatus(status.data.status);
        console.log("변경된 스크랩 상태 : ", status.data.status);
      })
      .catch(err => console.log(err));
    console.log("change scrap 성공.");
    // document.location.href = "/study";
  };

  changeScrapStatus = status => {
    if (status === true) {
      this.setState({
        is_scraped: "true"
      });
    } else if (status === false) {
      this.setState({
        is_scraped: "false"
      });
    }
  };

  render() {
    const { board_id } = this.props;

    if (this.state.is_scraped === "true") {
      console.log("true값이며 id는 : ", board_id);
      return (
        <Button
          color="primary"
          size="small"
          onClick={event => this.handlingScrap(board_id)}
        >
          Scraped
        </Button>
      );
    } else {
      console.log("false값이며 id는 : ", board_id);
      return (
        <Button
          color="secondary"
          size="small"
          onClick={event => this.handlingScrap(board_id)}
        >
          Scrap
        </Button>
      );
    }
  }
}
