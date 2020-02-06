import React from "react";
import Container from "@material-ui/core/Container";
// import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import api from "../../../api/api_board";
import RecruitView from "./RecruitView";
import { tokenConfig } from "../../../action/auth";

class RecruitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recruitList: []
    };
  }

  componentDidMount() {
    this.getRecruit();
  }

  async getRecruit() {
    const _recruitList = await api.getAllPosts("recruit", tokenConfig());
    console.log("getRecruit 메서드 실행.");
    console.log(_recruitList);
    this.setState({ recruitList: _recruitList.data.results });
    // console.log('postList의 타입은 : ' , typeof(this.state.postList))
  }

  render() {
    return (
      <div>
        <Container maxWidth="lg" className="main-container">
          <h1>Recruit List</h1>
          <h4>
            <Link to={"/recruit/new"}>New Recruit</Link>
          </h4>
          <br />
          {this.state.recruitList.map(post => (
            <RecruitView
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
              purpose={post.purpose}
            />
          ))}
        </Container>
      </div>
    );
  }
}

export default RecruitList;
