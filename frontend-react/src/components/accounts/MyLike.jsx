import React, { Component } from "react";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import api from "../../api/api_board";
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import {FixedSizeList} from 'react-window';

export default class MyLike extends Component {
  state = {
    likeNotice: [],
    likeQnA: [],
    likeStudy: [],
    likeRecruit: []
  };
  componentDidMount() {
    this.getLikePosts("notice");
    this.getLikePosts("QnA");
    this.getLikePosts("study");
    this.getLikePosts("recruit");
  }

  async getLikePosts(target) {
    await api
      .getUserLikePost(target)
      .then(likePosts => {
        console.log(likePosts);
        var posts = likePosts.data.board_contents;
        switch (target) {
          case "notice":
            this.setState({ likeNotice: posts });
            break;
          case "QnA":
            this.setState({ likeQnA: posts });
            break;
          case "study":
            this.setState({ likeStudy: posts });
            break;
          case "recruit":
            this.setState({ likeRecruit: posts });
            break;
          default:
            break;
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { id, title, body, purpose } = this.props;

    return (
      <Paper elevation={10} className="MyLike">
        <>
          <h1>Liked Post</h1>
          <br />
          {this.state.likeNotice.map(liked_post => (
            <div>
              <h4>Notice board</h4>

              <Link
                to={`/notice/detail/${liked_post.id}`}
                className={"main-postTitle"}
              >
                -{liked_post.title}
              </Link>
            </div>
          ))}
          <br />
          {this.state.likeQnA.map(liked_post => (
            <div>
              <h4>QnA board</h4>
              <Link
                to={`/QnA/detail/${liked_post.id}`}
                className={"main-postTitle"}
              >
                -{liked_post.title}
              </Link>
            </div>
          ))}
          <br />
          {this.state.likeStudy.map(liked_post => (
            <div>
              <h4>study board</h4>
              <Link
                to={`/study/detail/${liked_post.id}`}
                className={"main-postTitle"}
              >
                -{liked_post.title}
              </Link>
            </div>
          ))}
          <br />
          {this.state.likeRecruit.map(liked_post => (
            <div>
              <h4>recruit board</h4>
              <Link
                to={`/recruit/detail/${liked_post.id}`}
                className={"main-postTitle"}
              >
                -{liked_post.title}
              </Link>
            </div>
          ))}
        </>
      </Paper>
    );
  }
}
