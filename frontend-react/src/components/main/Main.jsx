import React from "react";
import api from "../../api/BoardAPI";
import RecentPost from "./RecentPost";

import logo from "./logo.png";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Carousel from "react-bootstrap/Carousel";
import { ClubCalendar } from "../calendar/ClubCalendar";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recentNotices: [],
      recentQnA: []
    };
  }
  componentDidMount() {
    this.getRecentPosts("notice");
    this.getRecentPosts("qna");
  }

  async getRecentPosts(target) {
    await api
      .getAllPosts(target)
      .then(recentPosts => {
        console.log(recentPosts);
        var posts = recentPosts.data.results;
        var slicePosts = posts.slice(0, 4);
        switch (target) {
          case "notice":
            this.setState({ recentNotices: slicePosts });
            break;
          case "qna":
            this.setState({ recentQnA: slicePosts });
            break;
          default:
            break;
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <Container maxWidth="lg" className="main-container">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Carousel>
                <Carousel.Item>
                  <img className="d-block w-100" src={logo} alt="logo" />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={logo}
                    alt="Second slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src={logo} alt="Third slide" />
                  {/* <Carousel.Caption>
                    <h3>Third slide label</h3>
                  </Carousel.Caption> */}
                </Carousel.Item>
              </Carousel>
            </Grid>
          </Grid>
          <hr />
          <div>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <h4 className={"main-recentTitle"}>최근 공지사항</h4>
                <Paper>
                  {this.state.recentNotices.map(notice_post => (
                    <RecentPost
                      key={notice_post.id}
                      id={notice_post.id}
                      title={notice_post.title}
                      body={notice_post.body}
                      board_name="notice"
                    />
                  ))}
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <h4 className={"main-recentTitle"}>최근 QnA</h4>
                <Paper>
                  {this.state.recentQnA.map(qna_post => (
                    <RecentPost
                      key={qna_post.id}
                      id={qna_post.id}
                      title={qna_post.title}
                      body={qna_post.body}
                      board_name="QnA"
                    />
                  ))}
                </Paper>
              </Grid>
            </Grid>
          </div>
          <hr />
          <div>
            <ClubCalendar />
          </div>
          <hr />
          <div>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                What We Made!
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    );
  }
}

export default Main;
