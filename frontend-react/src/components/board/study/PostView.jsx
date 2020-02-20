import React, { Component } from "react";
import { Link } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
// import SwitchBase from "@material-ui/core/internal/SwitchBase";

export default class PostView extends Component {
  render() {
    const {
      post_id,
      author_id,
      author_name,
      title,
      body,
      study_type,
      group_name
    } = this.props;

    const post_type = {
      0: "공식모임",
      1: "정보공유",
      2: "기타"
    };
    return (
      <Card className={"card"}>
        <CardContent>
          <Typography>
            <h4>
              <Link to={`/study/${group_name}/detail/${post_id}`}>
                [{post_type[study_type]}]{title}
              </Link>
            </h4>
            <p>{body}</p>
            <small>Writer : {author_name}</small>
          </Typography>
        </CardContent>
      </Card>
    );
  }
}
