import React, { Component } from "react";
import Button from "@material-ui/core/Button";
// import CardActions from '@material-ui/core/CardActions';
import api from "../../../api/api_board";
import { tokenConfig } from "../../../action/auth";
import { changeScrapStatus } from "./StudyDetail";
export default class ScarpView extends Component {
  handlingScrap = async id => {
    await api
      .scrapPost("study", id, tokenConfig())
      .then(status => {
        this.changeScrapStatus(status.data.status);
        console.log("현재 스크랩 상태 : ", status.data.status);
      })
      .catch(err => console.log(err));
    console.log("post scrap 성공.");
    // document.location.href = "/study";
  };

  render() {
    const { is_scraped, id, changeStatus } = this.props;

    if (is_scraped) {
      return (
        <Button
          color="primary"
          size="small"
          onClick={event => this.handlingScrap(id)}
        >
          Scraped
        </Button>
      );
    } else {
      return (
        <Button
          color="primary"
          size="small"
          onClick={event => this.handlingScrap(this.state.id)}
        >
          Scrap
        </Button>
      );
    }
  }
}
