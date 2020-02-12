import React, { Component } from "react";
import { getUser } from "../../api/api_auth";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import api from "../../api/api_board";
import VirtualizedList from "./likedPostView";
import { Link } from "react-router-dom";



class Mypage extends Component {
  state = {
    id: "",
    username: "",
    password: "",
    major: "",
    student_id: "",
    start_num: "",
    sns_id: "",
    email: "",
    token: "",
    likeNotice:[],
    likeQnA:[],
    likeStudy:[],
    likeRecruit:[]
  };

  componentDidMount() {
    console.log("New ComponentDidMount");
    // const _id = window.sessionStorage.getItem("id");
    const _id = this.props.match.params.id;
    this.getUser(_id);
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

  async getUser(userId) {
    await getUser(userId)
      .then(res => {
        const userData = res.data;
        console.log(userData);
        this.setState({
          id: userData.id,
          username: userData.username,
          major: userData.major,
          student_id: userData.student_id,
          start_num: userData.start_number,
          sns_id: userData.sns_id,
          email: userData.email
        });
      })
      .catch(err => console.log(err));
  }
  

  render() {
    return (
      <Container maxWidth="lg" className="PostingSection">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Paper elevation={10} className="PostingPaper">
              Mypage <br />
              <br />
              ID {this.state.id} <br />
              Username {this.state.username} <br />
              Email {this.state.email} <br />
              학과 {this.state.major} <br />
              멋쟁이사자 {this.state.start_num} <br />
              학번 {this.state.student_id} <br />
              SNS {this.state.sns_id} <br />
              <br />

              
            </Paper>
          </Grid>
          <Grid item xs={12} sm ={4}>
          <Paper elevation={10} className="PostingPaper">
          <h1>Liked Post</h1>
          {this.state.likeNotice.map(liked_post => (
            <div>
              <h4>notice board</h4>
              <Link to={`/notice/detail/${liked_post.id}`} className={"main-postTitle"}>
              -{liked_post.title}
              </Link>
              
            </div>
          ))}
          <br/>
          {this.state.likeQnA.map(liked_post => (
            <div>
              <h4>QnA board</h4>
              <Link to={`/QnA/detail/${liked_post.id}`} className={"main-postTitle"}>
              -{liked_post.title}
              </Link>
            </div>
          ))}
          <br/>
          {this.state.likeStudy.map(liked_post => (
            <div>
              <h4>study board</h4>
              <Link to={`/study/detail/${liked_post.id}`} className={"main-postTitle"}>
              -{liked_post.title}
              </Link>
              
            </div>
          ))}
          <br/>
          {this.state.likeRecruit.map(liked_post => (
            <div>
              <h4>recruit board</h4>
              <Link to={`/recruit/detail/${liked_post.id}`} className={"main-postTitle"}>
              -{liked_post.title}
              </Link>
              
            </div>
          ))}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default Mypage;
