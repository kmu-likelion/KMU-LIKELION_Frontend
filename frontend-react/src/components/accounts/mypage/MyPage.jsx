import React, { Component } from "react";
import { getUser, updateUser } from "../../../api/AuthAPI";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
// import api from "../../../api/GroupAPI";
import MyLike from "./MyLike";
import LeftProfileView from "./LeftProfileView";
import MyProfile from "./MyProfile";
import MyPost from "./MyPost";
import MyComment from "./MyComment";
import MyMentoring from "./MyMentoring";
import MyStudyGroup from "./MyStudyGroup";

class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      img: "",
      username: "",
      password: "",
      major: "",
      student_id: "",
      start_num: "",
      sns_id: "",
      email: "",
      token: "",
      type: "",
      authname: "",
      last_login:"",
      user_type:"",
      full_name:"",
    };
  }

  componentDidMount() {
    console.log("New ComponentDidMount");
    const _username = this.props.match.params.username;
    this.getUser(_username);
  }

  async getUser(username) {
    await getUser(username)
      .then(res => {
        const userData = res.data;
        console.log("User Data",userData);
        this.setState({
          id: userData[0].id,
          img: userData[0].img,
          username: userData[0].username,
          full_name: userData[0].first_name,
          major: userData[0].major,
          student_id: userData[0].student_id,
          start_num: userData[0].start_number,
          sns_id: userData[0].sns_id,
          email: userData[0].email,
          last_login: userData[0].last_login,
          user_type:userData[0].user_type,
          type:"Myprofile",
        });
      })
      .catch(err => console.log(err));
  }

  updateUser = async (id,data) => {
    await updateUser(id,data)
      .then(res => {
        const userData = res.data;
        console.log("UpdateUser Data",userData);

      })
      .catch(err => console.log(err));
  }

  handlingSubmit = async (event, typename) => {
    event.preventDefault(); //event의 디폴트 기능(새로고침 되는 것 등..) -> 막는다.
    this.setState({ type: typename });
  };

  render() {
    switch (this.state.type) {
      case "Myprofile":
        return (
          <Container maxWidth="lg" className="PostingSection">
            <Grid container spacing={2} className="firstbox">
              <Grid item xs={12} sm={4}>
                <LeftProfileView
                  username={this.state.username}
                  sns_id={this.state.sns_id}
                  user_img={this.state.img}
                  handlingSubmit={this.handlingSubmit}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <MyProfile
                  username={this.state.username}
                  full_name={this.state.full_name}
                  img={this.state.img}
                  id={this.state.id}
                  email={this.state.email}
                  major={this.state.major}
                  start_num={this.state.start_num}
                  student_id={this.state.student_id}
                  user_type={this.state.user_type}
                  sns_id={this.state.sns_id}
                  updateUser={this.updateUser}
                />
              </Grid>
            </Grid>
          </Container>
        );
      case "MyLike":
        return (
          <Container maxWidth="lg" className="PostingSection">
            <Grid container spacing={2} className="firstbox">
              <Grid item xs={12} sm={4}>
                <LeftProfileView
                  username={this.state.username}
                  sns_id={this.state.sns_id}
                  user_img={this.state.img}
                  handlingSubmit={this.handlingSubmit}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <MyLike />
              </Grid>
            </Grid>
          </Container>
        );
      case "MyPost":
        return (
          <Container maxWidth="lg" className="PostingSection">
            <Grid container spacing={2} className="firstbox">
              <Grid item xs={12} sm={4}>
                <LeftProfileView
                  username={this.state.username}
                  sns_id={this.state.sns_id}
                  user_img={this.state.img}
                  handlingSubmit={this.handlingSubmit}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <MyPost id={this.state.id} />
              </Grid>
            </Grid>
          </Container>
        );
      case "MyComment":
        return (
          <Container maxWidth="lg" className="PostingSection">
            <Grid container spacing={2} className="firstbox">
              <Grid item xs={12} sm={4}>
                <LeftProfileView
                  username={this.state.username}
                  sns_id={this.state.sns_id}
                  user_img={this.state.img}
                  handlingSubmit={this.handlingSubmit}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <MyComment id={this.state.id} />
              </Grid>
            </Grid>
          </Container>
        );
      case "MyMentoring":
        return (
          <Container maxWidth="lg" className="PostingSection">
            <Grid container spacing={2} className="firstbox">
              <Grid item xs={12} sm={4}>
                <LeftProfileView
                  username={this.state.username}
                  sns_id={this.state.sns_id}
                  user_img={this.state.img}
                  handlingSubmit={this.handlingSubmit}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <MyMentoring id={this.state.id}/>
              </Grid>
            </Grid>
          </Container>
        );
      case "MyStudyGroup":
        return (
          <Container maxWidth="lg" className="PostingSection">
            <Grid container spacing={2} className="firstbox">
              <Grid item xs={12} sm={4}>
                <LeftProfileView
                  username={this.state.username}
                  sns_id={this.state.sns_id}
                  user_img={this.state.img}
                  handlingSubmit={this.handlingSubmit}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <MyStudyGroup id={this.state.id}/>
              </Grid>
            </Grid>
          </Container>
        );
      default:
        return null;
    }
  }
}

export default MyPage;
