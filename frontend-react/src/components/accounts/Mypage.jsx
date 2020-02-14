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
import TextField from '@material-ui/core/TextField';
import LeftProfileView from "./LeftProfileView";
import MyProfile from "./MyProfile";

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
      switch(this.state.type) {
          case 'Myprofile':
              return (
                <Container maxWidth="lg" className="PostingSection">
                  <Grid container spacing={2} className ="firstbox">
                    <Grid item xs={12} sm={4} >
                      <LeftProfileView 
                        username ={this.state.username} 
                        sns_id={this.state.sns_id} 
                        handlingSubmit1={this.handlingSubmit1}
                        handlingSubmit= {this.handlingSubmit}
                        />
                    </Grid>
                    <Grid item xs={12} sm ={8} >
                      <MyProfile 
                        id={this.state.id}
                        major ={this.state.major}
                        start_num={this.state.start_num}
                        student_id={this.state.student_id}
                        email={this.state.email}
                      
                      />
                    </Grid>
                  </Grid>
                  
                </Container>
              );
          case 'MyLike':
              return (
                <Container maxWidth="lg" className="PostingSection">
                  <Grid container spacing={2} className ="firstbox">
                    <Grid item xs={12} sm={4}>
                      <LeftProfileView 
                          username ={this.state.username} 
                          sns_id={this.state.sns_id} 
                          handlingSubmit1={this.handlingSubmit1}
                          handlingSubmit= {this.handlingSubmit}
                          />
                        
                    </Grid>
                    <Grid item xs={12} sm ={8}>
                      <MyLike
                        />
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
