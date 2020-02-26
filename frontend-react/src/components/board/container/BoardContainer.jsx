import React from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import api from "../../../api/BoardAPI";
import PostView from "./PostView";

class BoardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardType: "",
      postList: []
    };
  }

  componentDidMount() {
    console.log("해당 보드는? ", this.props.match.path);
    let board_name = this.props.match.path;
    this.setState({
      boardType: board_name.split("/")[1]
    });
    this.getPosts(board_name.split("/")[1]);
  }

  async getPosts(boardType) {
    await api
      .getAllPosts(boardType.toLowerCase())
      .then(res => {
        console.log("posts 가져오기 성공! ", res.data);
        this.setState({ postList: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <Container maxWidth="lg" className="main-container">
          <Paper className="Paper">
            <Typography component="h1" variant="h4">
              {this.state.boardType.toUpperCase()}
            </Typography>
            <Link to={`/${this.state.boardType}/new`}>새 글 작성</Link>
            <hr />
            <Grid container spacing={2}>
              <Grid item sm={1}></Grid>
              <Grid item xs={12} sm={10}>
                {this.state.postList.map((post, index) => (
                  <PostView
                    key={index}
                    postInfo={post}
                    board_name={this.state.boardType}
                  />
                ))}
              </Grid>
              <Grid item sm={1}></Grid>
            </Grid>
          </Paper>
        </Container>
      </div>
    );
  }
}

export default BoardContainer;
