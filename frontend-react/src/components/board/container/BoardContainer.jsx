import React from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import api from "../../../api/BoardAPI";
import PostView from "./PostView";
//import Pagination from "../Pagination";
import _ from "lodash";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

class BoardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardType: "",
      postList: [],
      userId: "",
      selectOpen: false,
      startNumber: "8th",
      postCount: {},
      currentPage: 1,
      Plength: "2"
    };
  }
  componentWillMount() {
    console.log("해당 보드는? ", this.props.match.path);
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
        console.log("posts 가져오기 성공! ", res.data);
        this.setState({
          postCount: res.data.count,
          postList: res.data.results
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
    this.getPage(this.state.boardType, page);
  };

  getPage = async (boardType, currentPage) => {
    await api
      .getPage(boardType, currentPage)
      .then(res => {
        console.log("page 가져오기 성공! ", res.data);
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
        console.log("session posts 가져오기 성공! ", res.data);
        this.setState({ postList: res.data.results });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    // console.log("시발", this.state.postCount, "시발", this.state.Plength)
    const pageCount = Math.ceil(this.state.postCount / this.state.Plength);
    // console.log("페이지 몇페이지?!!",pageCount);
    const pages = _.range(1, pageCount + 1);
    const board_name = this.props.match.path.split("/")[1];

    return (
      <div>
        <Container maxWidth="lg" className="main-container">
          <Paper className="Paper">
            <Typography component="h1" variant="h4">
              {this.state.boardType.toUpperCase()}
            </Typography>
            {this.state.userId > 0 ? (
              <Link to={`/${this.state.boardType}/new`}>새 글 작성</Link>
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
              </Grid>
              <Grid item sm={1}></Grid>

              <Grid className="paginator" item xs={12} sm={12}>
                {/* <Pagination
                  itemsCount={this.state.post.count}
                  pageSize={this.state.postList.length}
                  handlePageChange={this.handlePageChange}
                  currentPage={this.state.currentPage}
                /> */}
                <nav>
                  <ul className="pagination">
                    {pages.map(page => (
                      <li
                        key={page}
                        className={
                          page === this.state.currentPage
                            ? "page-item active"
                            : "page-item"
                        } // Bootstrap을 이용하여 현재 페이지를 시각적으로 표시
                        style={{ cursor: "pointer" }}
                      >
                        <a
                          className="page-link"
                          onClick={e => this.handlePageChange(page)}
                        >
                          {page}
                        </a>{" "}
                        {/* 페이지 번호 클릭 이벤트 처리기 지정 */}
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
