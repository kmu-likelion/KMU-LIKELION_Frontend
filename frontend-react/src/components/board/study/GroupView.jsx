import React, { Component } from "react";
import { Link } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default class GroupView extends Component {
  render() {
    const { name, introduction } = this.props;
    return (
      <Card className={"card"}>
        <CardContent>
          <Typography>
            <Link to={`/study/${name}`}>{name}</Link>
            <hr />
            {introduction}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}
