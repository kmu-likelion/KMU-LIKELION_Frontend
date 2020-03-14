import React from "react";
import { Link } from "react-router-dom";

class RecentPost extends React.Component {
  render() {
    const { id, title, body, board_name } = this.props;
    return (
      <div className={"RecentForm"}>
        <Link to={`/${board_name}/detail/${id}`} className={"main-postTitle"}>
          {title}
        </Link>
        <p>{body}</p>
        <hr />
      </div>
    );
  }
}

export default RecentPost;
