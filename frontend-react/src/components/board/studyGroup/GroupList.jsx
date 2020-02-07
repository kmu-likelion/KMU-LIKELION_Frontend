import React from "react";
import Container from "@material-ui/core/Container";

import { Link } from "react-router-dom";
import api from "../../../api/api_group";
// import StudyView from "./StudyView";
import { tokenConfig } from "../../../action/auth";
import GroupView from "./GroupView";
class GroupList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupList: []
    };
  }

  componentDidMount() {
    this.getAllGroup();
    // console.log("fdsfdsfdsa");
  }

  async getAllGroup() {
    await api.getAllGroups(tokenConfig()).then(results => {
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
            <Link to={"/study/new"}>New Group</Link>
          </h4>
          <br />
          {this.state.groupList.map(group => (
            <GroupView
              key={group.id}
              id={group.id}
              title={group.title}
              introduction={group.introduction}
            />
          ))}
        </Container>
      </div>
    );
  }
}

export default GroupList;
