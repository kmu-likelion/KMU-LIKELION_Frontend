import React from "react";
import { Link } from "react-router-dom";
import api from "../../../api/GroupAPI";
import PostView from "../container/PostView";
import { getAllUser } from "../../../api/AuthAPI";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CancelIcon from '@material-ui/icons/Cancel';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// import { FixedSizeList } from "react-window";
import List from "@material-ui/core/List";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Avatar from "@material-ui/core/Avatar";

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
      visit_id:"",
      allUser:[],
      selected_user: "",
      userOpen: false,
      userId:"",

    };
  }

  componentDidMount() {
    this.getGroup();
    this.getAllUser();
  }

  getAllUser = async () => {
    await getAllUser().then(res => {
      console.log("모든 유저 받아옴", res.data);
      this.setState({
        allUser: res.data
      });
    });
  }

  //그룹데이터 가져옴
  getGroup = async () => {
    let group_name = this.props.match.params.group;
    await api
      .getGroupWithName(group_name)
      .then(res => {
        // console.log("결과 : ", res.data);
        const group_info = res.data;
        console.log("결과 : ", group_info);
        this.setState({
          group_name: group_info[0].name,
          group_id: group_info[0].id,
          group_body: group_info[0].introduction,
          group_img: group_info[0].img
        });
        this.getGroupPost();
        this.getGroupMember();
        this.getGroupCaptain();
        // this.getGroupCaptain();
      })
      .catch(err => {
        console.log(err);
      });
  };
  addGroupUser = async event => {
    event.preventDefault();
    console.log("유저아이디",this.state.selected_user);
    await api
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
  deleteGroupUser = async (event,id) => {
    event.preventDefault();
    await api
      .deleteGroupUser(id)
      .then(res=>{
        this.getGroupMember();
      })
      .catch(err=>{
        console.log(err);
      });
  }
  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //해당 그룹의 게시물들을 가져옴
  getGroupPost = async () => {
    // console.log("그룹 ID : ", this.state.group_id);
    await api
      .getPostWithGroupId(this.state.group_id)
      .then(res => {
        console.log("그룹의 posts 가져오기 성공.", res.data);
        let notice = [];
        let study = [];
        res.data.map(post => {
          if (post.study_type === 0) {
            notice.push(post);
          } else {
            study.push(post);
          }
        });
        this.setState({
          noticePosts: notice,
          studyPosts: study
        });
      })
      .catch(err => console.log(err));
  };

  getGroupMember = async () => {
    await api
      .getMemberWithGroupId(this.state.group_id)
      .then(res => {
        console.log("그룹멤버",res.data);

        this.setState({
          group_members: res.data
        });
      })
      .catch(err => console.log(err));
  };

  getGroupCaptain = async () => {
    await api
      .getCaptainWithGroupId(this.state.group_id)
      .then(res => {
        console.log("후 이즈 캡틴?", res.data);
        this.setState({
          group_captain: res.data[0]
        });
        
      })
      .catch(err => console.log(err));
  };

  //그룹 삭제
  groupDelete = async () => {
    await api.deleteGroup(this.state.group_id);
    console.log("delete post 성공.");
    document.location.href = "/study";
  };

  
 

  render() {
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

              <Typography component="pre" className="preTag">
                {this.state.group_body}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={5}
              style={{ alignItems: "center", textAlign: "center" }}
            >
              <Typography>
                스터디장 {this.state.group_captain.user_id}
              </Typography>
              <Typography component="h5" variant="h5">
                그룹멤버
              </Typography>
              <Typography component="pre" className="preTag">
                <List subheader={<li />} className={"mentoring-list"}>
                  {this.state.group_members.map(member => (
                    <li key={`li-${member.id}`}>
                      <ul className={"mentoring-ul"}>
                        <ListItem button key={member.id}>
                          <ListItemAvatar>
                            <IconButton component={Link} to={`/Mypage/${member.user.username}`}>
                              <Avatar alt="Recomment-writer" src={member.user.img} />
                            </IconButton>
                          </ListItemAvatar>
                          <ListItemText primary={member.user.username} /><CancelIcon className="Cancle" onClick={event => this.deleteGroupUser(event,member.id)}/>
                        </ListItem>
                      </ul>
                    </li>
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
                                      <MenuItem value={user.id}>{user.username}</MenuItem>
                                    ))}

                                  </Select>

                                  <Button type="submit">ADD</Button>
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

              <Link to={`/study/${this.state.group_name}/update`}>
              <Button
                color="secondary"
                size="small"
              >
                그룹수정
              </Button>
              </Link>

              <Button
                color="secondary"
                size="small"
                onClick={event => this.groupDelete()}
              >
                그룹삭제
              </Button>
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
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography component="h6" variant="h6">
                * 공지사항
              </Typography>
              {this.state.noticePosts.map(post => (
                <PostView key={post.id} postInfo={post} board_name="study" />
              ))}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography component="h6" variant="h6">
                * 스터디
              </Typography>
              {this.state.studyPosts.map(post => (
                <PostView key={post.id} postInfo={post} board_name="study" />
              ))}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

export default GroupDetail;
