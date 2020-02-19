import React from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import api from "../../../api/BoardAPI";
import PostView from "./PostView";

class BoardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postList: []
    };
  }

  componentDidMount() { 
    this.getPosts();
  }

  async getPosts() {
    await api.getAllPosts("notice").then(res => {
      console.log("posts 가져오기 성공! ", res.data);
      this.setState({ postList: res.data.results });
    }).catch(err => {
      console.log(err);
    });
  }


  render() {
    return (
      <div>
        <Container maxWidth="lg" className="main-container">
            <Paper>
              <Typography component="h1" variant="h4">
                OOO Board
              </Typography>
              <hr/>
              <Grid container spacing={2}>
                <Grid item xs={0} sm={1}></Grid>
                <Grid item xs={12} sm={10}>
                  {this.state.postList.map(post => (
                    <>
                      <PostView
                        key={post.id}
                        postInfo={post}
                      />
                    </>
                  ))}
                </Grid>
                <Grid item xs={0} sm={1}></Grid>
              </Grid>
            </Paper>
          {/* <h1>Notice List</h1>
          <h4>
            <Link to={"/notice/new"}>New Notice</Link>
          </h4>
          <br />
          {this.state.noticeList.map(post => (
            <PostView
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
              noticeDate={post.notice_date}
            />
          ))} */}
        </Container>
      </div>
    );
  }
}

export default BoardContainer;
