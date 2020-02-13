import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Card from "@material-ui/core/Card";
// import CardActions from '@material-ui/core/CardActions';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default class PostView extends Component {
  render() {
    const { id, title, body, noticeDate } = this.props;
    const date = moment(noticeDate).format("YYYY-MM-DD");
    return (
      <Card className={"card"}>
        <CardContent>
          <Typography>
            <h4>
              <Link to={`/notice/detail/${id}`}>{title}</Link>
            </h4>
            <p>{body}</p>
            <small>Notice-Date : {date}</small>
          </Typography>
        </CardContent>
      </Card>
    );
  }
}
