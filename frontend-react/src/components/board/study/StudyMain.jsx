import React from "react";
import { Link } from "react-router-dom";
import api from "../../../api/api_group";

import GroupView from "./GroupView";

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
    await api.getAllGroups().then(results => {
      console.log("getAllGroups 메서드 실행.");
      console.log(results);
      this.setState({ groupList: results.data });
    });
  }

  render() {
    return (
      <div>
        <Container maxWidth="lg" className="main-container">
          <h1>StudyGroup List</h1>
          <h4>
            <Link to={"/study/group/new"}>New Group</Link>
          </h4>
          <br />
          <Grid container spacing={2}>
            {this.state.groupList.map(group => (
              <Grid item xs={6} sm={3} key={group.id}>
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
        </Container>
      </div>
    );
  }
}

export default StudyMain;
