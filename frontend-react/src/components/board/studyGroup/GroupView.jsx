import React, { Component } from "react";
import { Link } from "react-router-dom";

import Card from "@material-ui/core/Card";
// import CardActions from '@material-ui/core/CardActions';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default class GroupView extends Component {
  render() {
    const { id, title } = this.props;
    return (
      <Card className={"card"}>
        <CardContent>
          <Typography>
            <Link to={`/study/${title}`}>{title}</Link>
          </Typography>
        </CardContent>
      </Card>
    );
  }
}
