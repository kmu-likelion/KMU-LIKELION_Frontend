import React, { Component } from "react";
import { getUser } from "../../api/api_auth";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
// import api from "../../api/api_board";
// import VirtualizedList from "./likedPostView";
// import { Link } from "react-router-dom";
import MyLike from "./MyLike";
import Button from "@material-ui/core/Button";

class Mypage extends Component {
  state = {
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
    type: "Myprofile"
  };

  componentDidMount() {
    console.log("New ComponentDidMount");
    // const _id = window.sessionStorage.getItem("id");
    const _id = this.props.match.params.id;
    this.getUser(_id);

    console.log(this.state.type);
    // this.getLikePosts("notice");
    // this.getLikePosts("QnA");
    // this.getLikePosts("study");
    // this.getLikePosts("recruit");
  }

  async getUser(userId) {
    await getUser(userId)
      .then(res => {
        const userData = res.data;
        console.log(userData);
        this.setState({
          id: userData.id,
          img: userData.img,
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
  handlingSubmit1 = async event => {
    event.preventDefault(); //event의 디폴트 기능(새로고침 되는 것 등..) -> 막는다.
    this.setState({ type: "Myprofile" });
  };
  handlingSubmit = async event => {
    event.preventDefault(); //event의 디폴트 기능(새로고침 되는 것 등..) -> 막는다.
    this.setState({ type: "MyLike" });
  };

  render() {
    switch (this.state.type) {
      case "Myprofile":
        return (
          <Container maxWidth="lg" className="PostingSection">
            <Grid container spacing={2} className="firstbox">
              <Grid item xs={12} sm={4}>
                <Paper elevation={10} className="PostingPaper">
                  Mypage <br />
                  <br />
                  <img src={this.state.img} alt="" />
                  ID {this.state.id} <br />
                  Username {this.state.username} <br />
                  Email {this.state.email} <br />
                  <form
                    onSubmit={event => this.handlingSubmit1(event)}
                    className="commentForm"
                  >
                    <Button type="submit" variant="contained" color="primary">
                      myProfile
                    </Button>
                  </form>
                  <br />
                  <form
                    onSubmit={event => this.handlingSubmit(event)}
                    className="commentForm"
                  >
                    <Button type="submit" variant="contained" color="primary">
                      mylike
                    </Button>
                  </form>
                </Paper>
              </Grid>
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
                </Paper>
              </Grid>
            </Grid>
          </Container>
        );
      case "MyLike":
        return (
          <Container maxWidth="lg" className="PostingSection">
            <Grid container spacing={2} className="firstbox">
              <Grid item xs={12} sm={4}>
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
                  <form
                    onSubmit={event => this.handlingSubmit1(event)}
                    className="commentForm"
                  >
                    <Button type="submit" variant="contained" color="primary">
                      myProfile
                    </Button>
                  </form>
                  <br />
                  <form
                    onSubmit={event => this.handlingSubmit(event)}
                    className="commentForm"
                  >
                    <Button type="submit" variant="contained" color="primary">
                      mylike
                    </Button>
                  </form>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={8}>
                <MyLike />
              </Grid>
            </Grid>
          </Container>
        );
      default:
        return null;
    }
  }
}

export default Mypage;
