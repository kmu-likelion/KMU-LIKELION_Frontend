import React, { Component } from "react";
import { Link } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default class GroupView extends Component {
  render() {
    const { name, introduction, img } = this.props;
    return (
      <Card className={"card"}>
        <CardContent>
          <Typography>
            <img src={img} alt="" />
            <br />
            <Link to={`/study/${name}`}>{name}</Link>
            <hr />
            {introduction}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}
