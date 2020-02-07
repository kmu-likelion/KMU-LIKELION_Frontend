import React from "react";
import Container from "@material-ui/core/Container";

import { Link } from "react-router-dom";
import api from "../../../api/api_studygroup";
// import StudyView from "./StudyView";
import { tokenConfig } from "../../../action/auth";

class GroupList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupList: []
    };
  }

  componentDidMount() {
    // this.getStudy();
  }

  async getAllGroup() {
    const _groupList = await api.getAllGroups(tokenConfig());
    console.log("getStudy 메서드 실행.");
    console.log(_groupList);
    this.setState({ groupList: _groupList.data.results });
    // console.log('postList의 타입은 : ' , typeof(this.state.postList))
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
          {/* {this.state.groupList.map(post => (
            <StudyView
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
              how_many_people={post.how_many_people}
            />
          ))} */}
        </Container>
      </div>
    );
  }
}

export default GroupList;
