import React, { Component } from "react";
import { Link } from "react-router-dom";

import Card from "@material-ui/core/Card";
// import CardActions from '@material-ui/core/CardActions';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default class GroupView extends Component {
  render() {
    const { id, name , introduction} = this.props;
    return (
      <Card className={"card"}>
        <CardContent>
          <Typography>
            <Link
              to={{
                pathname: `/study/group/${name}`,
                state: {
                  group_id: id,
                  group_name: name
                }
              }}
            >
              {name}
            </Link>
          </Typography>
        </CardContent>
      </Card>
    );
  }
}
