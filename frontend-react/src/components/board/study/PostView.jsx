import React, { Component } from "react";
import { Link } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default class PostView extends Component {
  render() {
    const { id, title, body } = this.props;
    return (
      <Card className={"card"}>
        <CardContent>
          <Typography>
            <h4>
              <Link to={`/study/detail/${id}`}>{title}</Link>
            </h4>
            <p>{body}</p>
            <small>참여인원 : </small>
          </Typography>
        </CardContent>
      </Card>
    );
  }
}
