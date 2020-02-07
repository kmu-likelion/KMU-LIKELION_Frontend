import React from "react";
import Container from "@material-ui/core/Container";
// import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import api_group from "../../../api/api_group";
// import StudyView from "./StudyView";
import { tokenConfig } from "../../../action/auth";
import Button from "@material-ui/core/Button";

class StudyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group_name: "",
      group_id: "",
      group_info: []
    };
  }

  async componentDidMount() {
    // console.log("파라미터:", this.props.match.params.group);
    await this.setState({
      group_name: this.props.location.state.group_name,
      group_id: this.props.location.state.group_id
    });

    this.getGroup();
  }

  async getGroup() {
    await api_group
      .getGroup(this.state.group_id, tokenConfig())
      .then(result => {
        console.log("getGroup 메서드 실행.");
        console.log("결과값임", result);
        this.setState({ group_info: result.data });
      })
      .catch(err => {
        console.log(err);
      });

    // console.log('postList의 타입은 : ' , typeof(this.state.postList))
  }

  groupDelete = async () => {
    await api_group.deleteGroup(this.state.group_id, tokenConfig());
    console.log("delete post 성공.");
    document.location.href = "/study";
  };

  render() {
    return (
      <div>
        <Container maxWidth="lg" className="main-container">
          {/* <h1>Study List</h1> */}

          <br />
          <h3>{this.state.group_info.title}</h3>
          <h6>{this.state.group_info.introduction}</h6>
          <Button
            color="secondary"
            size="small"
            onClick={event => this.groupDelete()}
          >
            Group Delete
          </Button>
          <hr />
          <h6>
            <Link to={`/study/group/${this.state.group_name}/new`}>New</Link>
          </h6>
          {/* {this.state.studyList.map(post => (
            <StudyView
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
            />
          ))} */}
        </Container>
      </div>
    );
  }
}

export default StudyList;
