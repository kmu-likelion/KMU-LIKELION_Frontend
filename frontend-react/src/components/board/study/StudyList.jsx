import React from "react";
import Container from "@material-ui/core/Container";
// import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import api from "../../../api/api_board";
import StudyView from "./StudyView";
import { tokenConfig } from "../../../action/auth";

class StudyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studyList: []
    };
  }

  componentDidMount() {
    this.getStudy();
  }

  async getStudy() {
    const _studyList = await api.getAllPosts("study", tokenConfig());
    console.log("getStudy 메서드 실행.");
    console.log(_studyList);
    this.setState({ studyList: _studyList.data.results });
    // console.log('postList의 타입은 : ' , typeof(this.state.postList))
  }

  render() {
    return (
      <div>
        <Container maxWidth="lg" className="main-container">
          <h1>Study List</h1>
          <h4>
            <Link to={"/study/new"}>New Study</Link>
          </h4>
          <br />
          {this.state.studyList.map(post => (
            <StudyView
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
              how_many_people={post.how_many_people}
            />
          ))}
        </Container>
      </div>
    );
  }
}

export default StudyList;
