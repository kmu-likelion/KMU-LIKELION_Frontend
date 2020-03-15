import React from "react";
import { Link } from "react-router-dom";

import GroupAPI from "../../../api/GroupAPI";
import BoardAPI from "../../../api/BoardAPI";
import { getAllUser } from "../../../api/AuthAPI";

import PostView from "../container/PostView";
import _ from 'lodash';

/* @material-ui */
import {Container, Paper, Grid, Typography, Button, IconButton } from "@material-ui/core"
import {List, ListItem, ListItemText, ListItemAvatar, MenuItem, Select, Avatar} from "@material-ui/core"
import {Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';



class GroupDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group_name: "",
      group_id: "",
      group_body: "",
      group_img: "",
      group_captain: {},
      group_members: [],
      noticePosts: [],
      studyPosts: [],
      visit_id: "",
      allUser: [],
      selected_user: "",
      userOpen: false,
      userId: "",
      userNow: "",
      NcurrentPage: 1,
      ScurrentPage: 1,
      Plength: "2",
      NpostCount: 0,
      SpostCount: 0,

    };
  }

  componentDidMount() {
    this.setState({
      userNow: window.sessionStorage.getItem("username"),
      userId: window.sessionStorage.getItem("id"),
    });
    this.getGroup();
    this.getAllUser();
  }
  NgetPage = async (currentPage) => {
    await BoardAPI
      .getNPage("study", currentPage)
      .then(res => {
        this.setState({
          noticePosts: res.data.results,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  SgetPage = async (currentPage) => {
    await BoardAPI
      .getSPage("study", currentPage)
      .then(res => {
        this.setState({
          studyPosts: res.data.results,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }


  getAllUser = async () => {
    await getAllUser().then(res => {
      // console.log("모든 유저 받아옴", res.data);
      this.setState({
        allUser: res.data
      });
    });
  }

  //그룹데이터 가져옴
  getGroup = async () => {
    let group_name = this.props.match.params.group;
    await GroupAPI
      .getGroupWithName(group_name)
      .then(res => {
        const group_info = res.data;
        this.setState({
          group_name: group_info[0].name,
          group_id: group_info[0].id,
          group_body: group_info[0].introduction,
          group_img: group_info[0].img
        });
        this.getGroupPostNotice();
        this.getGroupPostStudy();
        this.getGroupMember();
        this.getGroupCaptain();
      })
      .catch(err => {
        console.log(err);
      });
  };

  addGroupUser = async event => {
    event.preventDefault();
    await GroupAPI
      .addGroupUser({
        "is_captain": false,
        "user_id": this.state.selected_user,
        "group_id": this.state.group_id
      })
      .then(res => {
        this.getGroupMember();
      })
      .catch(err => {
        console.log(err);
      });
  };
  deleteGroupUser = async (event, id) => {
    event.preventDefault();
    await GroupAPI
      .deleteGroupUser(id)
      .then(res => {
        this.getGroupMember();
      })
      .catch(err => {
        console.log(err);
      });
  }
  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //해당 그룹의 게시물들을 가져옴
  getGroupPostNotice = async () => {
    await GroupAPI
      .getPostWithGroupIdNotice(this.state.group_id)
      .then(res => {
        this.setState({
          noticePosts: res.data.results,
          NpostCount: res.data.count,
        })
      })
      .catch(err => console.log(err));
  };

  NhandlePageChange = (e, page) => {
    e.preventDefault();
    this.setState({ NcurrentPage: page });
    this.NgetPage(page);
  };
  ShandlePageChange = (e, page) => {
    e.preventDefault();
    this.setState({ ScurrentPage: page });
    this.SgetPage(page);
  };

  getGroupPostStudy = async () => {
    await GroupAPI
      .getPostWithGroupIdStudy(this.state.group_id)
      .then(res => {
        this.setState({
          studyPosts: res.data.results,
          SpostCount: res.data.count,
        });
      })
      .catch(err => console.log(err));
  };

  getGroupMember = async () => {
    await GroupAPI
      .getMemberWithGroupId(this.state.group_id)
      .then(res => {
        // console.log("group member : ", res.data);
        this.setState({
          group_members: res.data
        });
      })
      .catch(err => console.log(err));
  };

  getGroupCaptain = async () => {
    await GroupAPI
      .getCaptainWithGroupId(this.state.group_id)
      .then(res => {
        this.setState({
          group_captain: res.data
        });
      })
      .catch(err => console.log(err));
  };

  //그룹 삭제
  groupDelete = async () => {
    await GroupAPI.deleteGroup(this.state.group_id);
    console.log("delete post 성공.");
    document.location.href = "/study";
  };


  render() {
    const NpageCount = Math.ceil(this.state.NpostCount / this.state.Plength);
    const Npages = _.range(1, NpageCount + 1);
    const SpageCount = Math.ceil(this.state.SpostCount / this.state.Plength);
    const Spages = _.range(1, SpageCount + 1);

    return (
      <Container maxWidth="lg" className="main-container">
        <Paper className="Paper">
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={7}
              style={{ alignItems: "center", textAlign: "center" }}
            >
              <img src={this.state.group_img} alt="group_image" />

              <Typography component="h4" variant="h4">
                [{this.state.group_name}]
              </Typography>
              <br/>
              <Typography component="pre" className="preTag" style={{overflow:'auto'}}>
                {this.state.group_body}
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sm={5}
              style={{ alignItems: "center", textAlign: "center" }}
            >
              <Typography variant="h6">
                스터디장
              </Typography>
              <IconButton component={Link} to={`/Mypage/${this.state.group_captain.captain_username}`}>
                <Avatar alt="Recomment-writer" src={this.state.group_captain.user_img} />
              </IconButton>
              {this.state.group_captain.full_name}
              <hr/>
              <Typography variant="h6">
                그룹멤버
              </Typography>
              {this.state.group_members.length === 1 ? (
                <>
                  <br/>
                  <Typography variant="body2" style={{ textAlign:"center", color:"#D5D5D5" }}>현재 소속된 멤버가 없습니다.</Typography>
                </>
              ):(<></>)}
              <Typography component="pre" className="preTag">
                <List subheader={<li />} className={"mentoring-list"}>
                  {this.state.group_members.map(member => (
                    <div key={member.id}>
                      {
                        (this.state.group_captain.captain_username) === member.user.username
                          ? (
                            <>
                            </>
                          )
                          : (
                            <li>
                              <ul className={"mentoring-ul"}>
                                <ListItem button key={member.id}>
                                  <ListItemAvatar>
                                    <IconButton component={Link} to={`/Mypage/${member.user.username}`}>
                                      <Avatar alt="Recomment-writer" src={member.user.img} />
                                    </IconButton>
                                  </ListItemAvatar>
                                  <ListItemText primary={member.user.first_name} />
                                  {this.state.userNow === this.state.group_captain.captain_username
                                    ? (
                                      <CancelIcon className="Cancle" onClick={event => this.deleteGroupUser(event, member.id)} />
                                    )
                                    : (
                                      <></>
                                    )

                                  }
                                </ListItem>
                              </ul>
                            </li>
                          )
                      }
                    </div>
                  ))}
                </List>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              style={{ alignItems: "center", textAlign: "right" }}
            >
              <div>
                {
                  String(this.state.group_captain.user_id) === window.sessionStorage.getItem("id")
                    ? (
                      <Table>
                        <TableBody>
                          <TableRow className="alluser">
                            <TableCell colSpan={2}>
                              <form
                                onSubmit={event => this.addGroupUser(event)}
                                className={"mentoring-form"}
                              >
                                <Select
                                  className={"mentoring-select"}
                                  open={this.state.userOpen}
                                  onClose={e => this.setState({ userOpen: false })}
                                  name="selected_user"
                                  onOpen={e => this.setState({ userOpen: true })}
                                  value={this.state.selected_user}
                                  onChange={e =>
                                    this.setState({ selected_user: e.target.value })
                                  }
                                  displayEmpty
                                >
                                  <MenuItem value="">
                                    <small>All User</small>
                                  </MenuItem>
                                  {this.state.allUser.map(user => (
                                    <MenuItem key={user.id} value={user.id}>{user.first_name}</MenuItem>
                                  ))}

                                </Select>

                                <Button type="submit">멤버추가</Button>
                              </form>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    )
                    : (
                      <></>
                    )
                }
              </div>
              {this.state.userNow === this.state.group_captain.captain_username
                ? (
                  <Link to={`/study/${this.state.group_name}/update`}>
                    <Button
                      color="secondary"
                      size="small"
                    >
                      그룹수정
                  </Button>
                  </Link>
                )
                : (
                  <></>
                )

              }
              <Button
                color="primary"
                size="small"
                component={Link}
                to={"/study"}
              >
                뒤로가기
              </Button>
              <Typography component="hr" />
              <br />
            </Grid>

            <Grid item xs={12} sm={12}>
              {
                this.state.userId > 0
                  ? (
                    <Link
                      to={{
                        pathname: `/study/${this.state.group_name}/post/new`,
                        state: {
                          group_name: this.state.group_name,
                          group_id: this.state.group_id
                        }
                      }}
                    >
                      새 글 작성
                  </Link>
                  )
                  : (
                    <></>
                  )
              }

            </Grid>
            <>
              <Grid item xs={12} sm={12}>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      공지사항
                  </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="profile-tab"
                      data-toggle="tab"
                      href="#profile"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      스터디
                  </a>
                  </li>
                </ul>
              </Grid>
              <Grid item xs={12} sm={12}>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    {this.state.noticePosts.map(post => (
                      <PostView key={post.id} postInfo={post} board_name="study" />
                    ))}
                    {this.state.NpostCount === 0 ? (
                    <>
                      <br/>
                      <Typography variant="h5" style={{ textAlign:"center", color:"#D5D5D5" }}>작성된 게시물이 없습니다.</Typography>
                      <br/>
                    </>
                    ):(<></>)}
                    <nav>
                      <ul className="pagination">
                        {Npages.map(page => (
                          <li
                            key={page}
                            className={page === this.state.NcurrentPage ? "page-item active" : "page-item"} // Bootstrap을 이용하여 현재 페이지를 시각적으로 표시
                            style={{ cursor: "pointer" }}
                          >
                            <a className="page-link" href="#!" onClick={e => this.NhandlePageChange(e, page)}>{page}</a> {/* 페이지 번호 클릭 이벤트 처리기 지정 */}
                          </li>

                        ))}
                      </ul>
                    </nav>
                  </div>
                  <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    {this.state.studyPosts.map(post => (
                      <PostView key={post.id} postInfo={post} board_name="study" />
                    ))}
                    {this.state.SpostCount === 0 ? (
                    <>
                      <br/>
                      <Typography variant="h5" style={{ textAlign:"center", color:"#D5D5D5" }}>작성된 게시물이 없습니다.</Typography>
                      <br/>
                    </>
                    ):(<></>)}
                    <nav>
                      <ul className="pagination">
                        {Spages.map(page => (
                          <li
                            key={page}
                            className={page === this.state.ScurrentPage ? "page-item active" : "page-item"} // Bootstrap을 이용하여 현재 페이지를 시각적으로 표시
                            style={{ cursor: "pointer" }}
                          >
                            <a className="page-link" href="#!" onClick={e => this.ShandlePageChange(e, page)}>{page}</a> {/* 페이지 번호 클릭 이벤트 처리기 지정 */}
                          </li>

                        ))}
                      </ul>
                    </nav>
                  </div>
                </div>
              </Grid>
            </>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

export default GroupDetail;
