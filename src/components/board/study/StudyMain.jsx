import React from "react";
import { Link } from "react-router-dom";
import api from "../../../api/GroupAPI";

import GroupView from "./GroupView";

//@material-ui
import {Typography, Paper, Container, Grid } from "@material-ui/core";

class StudyMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupList: [],
      isEmpty: false,
      userId:"",
    };
  }

  componentDidMount() {
    this.getAllGroup();
    this.setState({userId:window.sessionStorage.getItem("id")});
  }

  async getAllGroup() {
    await api
      .getAllGroups()
      .then(res => {
        if(res.data.length === 0) {
          this.setState({ groupList: [], isEmpty: true });
        } else {
          this.setState({ groupList: res.data, isEmpty: false });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <Container
          maxWidth="lg"
          className="main-container"
          style={{
            flexGrow: 1,
            overflow: "hidden"
          }}
        >
          <Paper className="Paper">
            <Typography component="h1" variant="h4" style={{paddingBottom: 15}}>
              스터디그룹
            </Typography>
            {this.state.userId > 0
            ?(
              
              <Link to={"/study/group/new"}>새 스터디그룹 생성</Link>
            )
            :(
              <></>
            )
            }
            <hr />
            <Grid container spacing={2}>
              {this.state.groupList.map(group => (
                <Grid item xs={6} sm={2} key={group.id}>
                  <GroupView
                    key={group.id}
                    id={group.id}
                    name={group.name}
                    introduction={group.introduction}
                    img={group.img}
                  />
                </Grid>
              ))}
              {this.state.isEmpty ? (
              <>
              <br/>
              <Typography variant="h4" style={{ textAlign:"center", color:"#D5D5D5" }}>진행 중인 스터디가 없습니다.</Typography>
              <br/>
              </>):(<></>)}

            </Grid>
          </Paper>
        </Container>
      </div>
    );
  }
}

export default StudyMain;
