import React from "react";
import { Link } from "react-router-dom";

import Card from "@material-ui/core/Card";
// // import CardActions from '@material-ui/core/CardActions';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

class RecentPost extends React.Component {
  render() {
    const { id, title, body } = this.props;
    return (
      <div className={"RecentForm"}>
        <Link to={`/notice/detail/${id}`} className={"main-postTitle"}>
          {title}
        </Link>
        <p>{body}</p>
        <hr />
      </div>
    );
  }
}

export default RecentPost;
