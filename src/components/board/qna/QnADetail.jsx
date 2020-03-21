import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import LikeView from "../LikeView";
import Viewer from "../../Viewer";
import AuthButton from "../../common/AuthButton";

// @material-ui
import { Button, Typography } from "@material-ui/core";
import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead
} from "@material-ui/core";

class QnADetail extends Component {
  render() {
    const {
      postInfo,
      author,
      handlingDelete,
      post_id,
      board_name
    } = this.props;
    const pubDate = moment(postInfo.pub_date).format("YYYY-MM-DD HH:MM");
    return (
      <Table className={"post-table"}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography component="h1" variant="h5">
                [{postInfo.subject}] {postInfo.title}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="caption" color="textSecondary">
                작성일 {pubDate} /&nbsp; 작성자 {author.name}(
                <Link to={`/mypage/${author.username}`}>{author.username}</Link>
                )
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell className="post-body">
              <Viewer value={String(postInfo.body)} />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <LikeView post_id={post_id} board_name={board_name} />
              <AuthButton
                authType="isWriter"
                info={post_id}
                boardName={board_name}
                button={
                  <>
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
                  </>
                }
              />

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
        </TableBody>
      </Table>
    );
  }
}

export default QnADetail;
