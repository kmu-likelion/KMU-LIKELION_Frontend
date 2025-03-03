import React from "react";

import EvaluationView from "./EvaluationView";
import ScoreNew from "./ScoreNew";
import ScoreView from "./ScoreView";

import {Typography, Card, CardActions, CardContent} from "@material-ui/core";
import moment from "moment";


class GradingView extends React.Component {
  state = { isLoading: true };

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      memberId,
      member,
      submissionInfo,
      assignmentId,
      getSubmission
    } = this.props;


    if (memberId === "") {
      return <>...</>;
    } else {
      return (
        <>
          {submissionInfo.length === 0 ? (
            <>
              <Card variant="outlined">
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    ID :: {memberId}
                  </Typography>
                  <Typography variant="h5">
                    {member.first_name}({member.username})
                  </Typography>
                  <Typography color="textSecondary">제출기록 :: --</Typography>
                  <Typography variant="body2">
                    제출물이 없습니다.
                  </Typography>
                </CardContent>
                <CardActions></CardActions>
              </Card>
            </>
          ) : (
            <>
              <Card variant="outlined">
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    ID :: {memberId}
                  </Typography>
                  <Typography variant="h5">
                    {member.first_name}({member.username})
                  </Typography>
                  <Typography color="textSecondary">
                    제출기록 :: {moment(submissionInfo[0].update_date).format("YY/MM/DD hh:mm")}
                  </Typography>
                  <Typography variant="body2">
                    {submissionInfo[0].body}
                  </Typography>
                  <Typography variant="body2">
                    URL ::
                    <a href={submissionInfo[0].url}>{submissionInfo[0].url}</a>
                  </Typography>
                </CardContent>
                <CardActions></CardActions>
              </Card>

              <ScoreView
                submissionId={submissionInfo[0].id}
                scores={submissionInfo[0].scores}
                totalScore={submissionInfo[0].total_score.score__sum}
              />
              {submissionInfo[0].evaluator ? (
                <>
                  <EvaluationView
                    evaluator={submissionInfo[0].evaluator}
                    evaluator_name={submissionInfo[0].evaluator_name}
                    evaluation={submissionInfo[0].evaluation}
                    evaluation_pub_date={submissionInfo[0].evaluation_pub_date}
                  />
                </>
              ) : (
                <></>
              )}
              <br />
              <ScoreNew
                submissionId={submissionInfo[0].id}
                assignmentId={assignmentId}
                scoreTypes={submissionInfo[0].scores}
                getSubmission={getSubmission}
                memberId={memberId}
              />
            </>
          )}
        </>
      );
    }
  }
}

export default GradingView;
