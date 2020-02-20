import React, { Component } from "react";
import { getUser } from "../../../api/AuthAPI";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
// import Paper from "@material-ui/core/Paper";
// import api from "../../api/api_board";
// import VirtualizedList from "./likedPostView";
// import { Link } from "react-router-dom";


import MyLike from "./MyLike";
import LeftProfileView from "./LeftProfileView";
import MyProfile from "./MyProfile";
import MyPost from "./MyPost";
import MyComment from "./MyComment";

class Mypage extends Component {
  constructor(props){
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
      type: "Myprofile",
      authname:"",
    };

  }
  

  componentDidMount() {
    console.log("New ComponentDidMount");
    const _id = this.props.match.params.id;
    this.getUser(_id);
    console.log(this.state.type);
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
  handlingSubmit = async (event, typename) => {
    event.preventDefault(); //event의 디폴트 기능(새로고침 되는 것 등..) -> 막는다.
    this.setState({ type: typename });
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
          case 'MyPost':
            return (
              <Container maxWidth="lg" className="PostingSection">
                <Grid container spacing={2} className ="firstbox">
                  <Grid item xs={12} sm={4}>
                    <LeftProfileView 
                        username ={this.state.username} 
                        sns_id={this.state.sns_id} 
                        handlingSubmit= {this.handlingSubmit}
                        />
                      
                  </Grid>
                  <Grid item xs={12} sm ={8}>
                    <MyPost
                    id={this.state.id}
                      />
                  </Grid>
                </Grid>
                
              </Container>
            );
          case 'MyComment':
            return (
              <Container maxWidth="lg" className="PostingSection">
                <Grid container spacing={2} className ="firstbox">
                  <Grid item xs={12} sm={4}>
                    <LeftProfileView 
                        username ={this.state.username} 
                        sns_id={this.state.sns_id} 
                        handlingSubmit= {this.handlingSubmit}
                        />
                      
                  </Grid>
                  <Grid item xs={12} sm ={8}>
                    <MyComment
                    id={this.state.id}
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
