import React, { Component } from "react";

import api from "../../api/SessionAPI";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export default class CommentView extends Component {
  state = {
    userId: "",
    username: "",
    userImg: "",
    body: "",
    submissionId: "",
    score_list: []
  };

  componentDidMount() {
    console.log("현재 유저아이디", window.sessionStorage.getItem("id"));
    this.setState({
      userId: window.sessionStorage.getItem("id"),
      username: window.sessionStorage.getItem("username")
      // userImg: window.sessionStorage.getItem("user_img")
    });

    const { scoreTypes } = this.props;
    this.setScoreDict(scoreTypes);
  }

  //score type을 위한 state 값 세팅.
  setScoreDict = scoreTypes => {
    let score_list = [];
    scoreTypes.map(() => score_list.push(""));
    this.setState({ score_list: score_list });
  };

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handlingChangeScore = (event, idx) => {
    var scoreInfo = this.state.score_list.slice();
    scoreInfo[idx] = event.target.value;
    this.setState({ score_list: scoreInfo });
  };

  handlingSubmit = async event => {
    event.preventDefault();
    const { scoreTypes } = this.props;

    var score_info = {};
    scoreTypes.map(
      (score, index) =>
        (score_info[score.score_type] = Number(this.state.score_list[index]))
    );

    await api
      .createScore(this.props.submissionId, {
        score_info: score_info,
        evaluation_info: {
          evaluator: Number(this.state.userId),
          evaluation: this.state.body
        }
      })
      .then(() => {
        this.setState({
          body: "",
          score_list: []
        });

        this.props.getSubmission(this.props.memberId, this.props.assignmentId);
      });
  };

  render() {
    const { scoreTypes } = this.props;

    return (
      <>
        <Grid container spacing={2}>
          <Grid item sm={1}></Grid>
          <Grid item xs={12} sm={10}>
            <Typography color="body1" style={{ textAlign: "left" }}>
              과제 채점
            </Typography>
            <List>
              <form
                onSubmit={event => this.handlingSubmit(event)}
                style={{ width: "auto" }}
              >
                <ListItem
                  alignItems="flex-start"
                  style={{ verticalAlign: "middle" }}
                ></ListItem>
                {scoreTypes.map((score, index) => (
                  <ListItem
                    alignItems="middle"
                    style={{ verticalAlign: "middle" }}
                  >
                    <ListItemText
                      primary={
                        <TextField
                          label={`${score.score_type} 점수`}
                          type="number"
                          value={this.state.value}
                          InputLabelProps={{
                            shrink: true
                          }}
                          onChange={event =>
                            this.handlingChangeScore(event, index)
                          }
                          placeholder="0 ~ 100"
                          inputProps={{ min: "0", max: "100", step: "1" }}
                          style={{ width: "100%" }}
                        />
                      }
                    />
                  </ListItem>
                ))}
                <ListItem
                  alignItems="middle"
                  style={{ verticalAlign: "middle" }}
                >
                  <ListItemText
                    primary={
                      <TextareaAutosize
                        name="body"
                        rowsMin={3}
                        rowsMax={7}
                        placeholder="comment"
                        value={this.state.body}
                        onChange={this.handlingChange}
                        style={{ width: "100%" }}
                        required
                      />
                    }
                  />
                </ListItem>
                <ListItem
                  alignItems="middle"
                  style={{ verticalAlign: "middle" }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    채점하기
                  </Button>
                </ListItem>
              </form>
            </List>
          </Grid>
          <Grid item sm={1}></Grid>
        </Grid>
      </>
    );
  }
}
