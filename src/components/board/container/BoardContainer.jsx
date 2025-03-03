import React from "react";
import { Link } from "react-router-dom";
import api from "../../../api/BoardAPI";
import PostView from "./PostView";
import _ from "lodash";

import {
  Container,
  Paper,
  Typography,
  Grid,
  Select,
  MenuItem
} from "@material-ui/core";

class BoardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardType: "",
      postList: [],
      userId: "",
      selectOpen: false,
      startNumber: "8th",
      postCount: -1,
      currentPage: 1,
      Plength: "2"
    };
  }
  UNSAFE_componentWillMount() {
    let board_name = this.props.match.path.split("/")[1];
    this.setState({
      boardType: board_name,
      userId: window.sessionStorage.getItem("id")
    });
    if (board_name === "session") {
      this.getSessions(board_name, "8th");
    } else {
      this.getPosts(board_name);
    }
  }

  getPosts = async boardType => {
    await api
      .getAllPosts(boardType)
      .then(res => {
        this.setState({
          postCount: res.data.count,
          postList: res.data.results
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handlePageChange = (e, page) => {
    e.preventDefault();
    this.setState({ currentPage: page });
    this.getPage(this.state.boardType, page);
  };

  getPage = async (boardType, currentPage) => {
    await api
      .getPage(boardType, currentPage)
      .then(res => {
        this.setState({
          postList: res.data.results
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getSessions = async (boardType, start_number) => {
    await api
      .getMyAlumPosts(boardType, start_number)
      .then(res => {
        this.setState({
          postList: res.data.results,
          postCount: res.data.results.length
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  //user permission check
  confirmCreateAuth = tag => {
    if (window.sessionStorage.getItem("user_type") < 3) {
      return tag;
    } else {
      return <></>;
    }
  };

  //board check
  checkCreateAuth = (board_name, tag) => {
    switch (board_name) {
      case "notice":
        return this.confirmCreateAuth(tag);
      case "session":
        return this.confirmCreateAuth(tag);
      case "career":
        return this.confirmCreateAuth(tag);
      default:
        return tag;
    }
  };

  render() {
    const pageCount = Math.ceil(this.state.postCount / this.state.Plength);

    const pages = _.range(1, pageCount + 1);
    const board_name = this.props.match.path.split("/")[1];
    // const header = {}
    const header = {
      notice: "공지사항",
      session: "세션",
      study: "스터디그룹",
      qna: "Q&A",
      career: "커리어"
    };

    return (
      <div>
        <Container maxWidth="lg" className="main-container">
          <Paper className="Paper" elevation={0}>
            <Typography variant="h4" style={{ fontWeight: "500" }}>
              {header[this.state.boardType]}
            </Typography>
            <br />
            {this.state.userId > 0 ? (
              this.checkCreateAuth(
                board_name,
                <Link to={`/${this.state.boardType}/new`}>새 글 작성</Link>
              )
            ) : (
              <></>
            )}
            <hr />
            <Grid container spacing={2}>
              <Grid item sm={1}></Grid>
              <Grid item xs={12} sm={10}>
                {board_name === "session" ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        marginLeft: 20
                      }}
                    >
                      <Typography variant="caption">기수</Typography>
                      <Select
                        style={{ minWidth: 50 }}
                        labelId="startnum-select-label"
                        id="startnum-controlled-open-select"
                        open={this.state.selectOpen}
                        onClose={e => this.setState({ selectOpen: false })}
                        name="userType"
                        onOpen={e => this.setState({ selectOpen: true })}
                        value={this.state.startNumber}
                        onChange={e => {
                          this.setState({ startNumber: e.target.value });
                          this.getSessions("session", e.target.value);
                        }}
                      >
                        <MenuItem value="8th">8기</MenuItem>
                        <MenuItem value="7.5th">7.5기</MenuItem>
                        <MenuItem value="7th">7기</MenuItem>
                      </Select>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {this.state.postList.map((post, index) => (
                  <PostView
                    key={index}
                    postInfo={post}
                    board_name={this.state.boardType}
                  />
                ))}
                {this.state.postCount === 0 ? (
                  <>
                    <br />
                    <Typography
                      variant="h4"
                      style={{ textAlign: "center", color: "#D5D5D5" }}
                    >
                      작성된 게시물이 없습니다.
                    </Typography>
                    <br />
                  </>
                ) : (
                  <></>
                )}
              </Grid>
              <Grid item sm={1}></Grid>

              <Grid className="paginator" item xs={12} sm={12}>
                <nav>
                  <ul className="pagination">
                    {pages.map(page => (
                      <li
                        key={page}
                        className={
                          page === this.state.currentPage
                            ? "page-item active"
                            : "page-item"
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <a
                          href="#!"
                          className="page-link"
                          onClick={e => this.handlePageChange(e, page)}
                        >
                          {page}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </div>
    );
  }
}

export default BoardContainer;
