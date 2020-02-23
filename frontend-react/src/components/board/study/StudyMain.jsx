import React from "react";
import { Link } from "react-router-dom";
import api from "../../../api/GroupAPI";
//component
import GroupView from "./GroupView";

//@material-ui
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

class StudyMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupList: []
    };
  }

  componentDidMount() {
    this.getAllGroup();
  }

  async getAllGroup() {
    await api
      .getAllGroups()
      .then(res => {
        console.log("getAllGroups 메서드 실행.");
        console.log(res);
        this.setState({ groupList: res.data.results });
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
            <Typography component="h1" variant="h4">
              스터디그룹
            </Typography>
            <Link to={"/study/group/new"}>새로운 그룹 생성하기</Link>
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
            </Grid>
          </Paper>
        </Container>
      </div>
    );
  }
}

export default StudyMain;
