import React, { Component } from "react";
// import api from "../../../api/BoardAPI";
import { Link } from "react-router-dom";
import moment from "moment";

import LikeView from "../LikeView";
import Viewer from "../../Viewer";

// @material-ui
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

class NoticeDetail extends Component {
  render() {
    const { postInfo, handlingDelete, post_id, board_name } = this.props;
    const pubDate = moment(postInfo.pub_date).format("YYYY-MM-DD HH:MM");
    // const noticeDate = moment(postInfo.notice_date).format("YYYY-MM-DD");
    return (
      <Table className={"post-table"}>
        <TableRow>
          <TableCell>
            <Typography component="h1" variant="h5">
              {postInfo.title}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <small>작성일 {pubDate}</small> /&nbsp;
          <small>작성자 {postInfo.author_name}</small>
        </TableRow>
        <TableRow>
          <TableCell className="post-body">
            <Typography color="textSecondary" component="pre">
              <Viewer value={String(postInfo.body)} />
            </Typography>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>
            <LikeView post_id={post_id} board_name={board_name} />
            <Button
              color="primary"
              size="small"
              onClick={event => handlingDelete(board_name, post_id)}
            >
              Delete
            </Button>
            <Button
              color="primary"
              size="small"
              component={Link}
              to={`/${board_name}/update/${post_id}`}
            >
              Update
            </Button>
            <Button
              color="primary"
              size="small"
              component={Link}
              to={`/${board_name}`}
            >
              Back
            </Button>
          </TableCell>
        </TableRow>
      </Table>
    );
  }
}

export default NoticeDetail;
