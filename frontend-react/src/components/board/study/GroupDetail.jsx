import React from "react";
import Container from "@material-ui/core/Container";

import { Link } from "react-router-dom";
import api from "../../../api/api_group";
import PostView from "./PostView";
import Button from "@material-ui/core/Button";

class GroupDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group_name: "",
      group_id: "",
      group_body: "",
      group_img: "",
      posts: []
    };
  }

  componentDidMount() {
    this.getGroup();
    this.getGroupPost();
  }

  getGroup = async () => {
    let group_name = this.props.match.params.group;
    await api
      .getGroupWithName(group_name)
      .then(res => {
        console.log("결과 : ", res);
        this.setState({
          group_name: res.data[0].name,
          group_id: res.data[0].id,
          group_body: res.data[0].introduction,
          group_img: res.data[0].img
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getGroupPost = async () => {
    await api
      .getPostWithGroupId(this.state.group_id)
      .then(res => {
        console.log("그룹의 posts 가져오기 성공.", res.data);
        this.setState({
          posts: res.data.results
        });
      })
      .catch(err => console.log(err));
  };

  groupDelete = async () => {
    await api.deleteGroup(this.state.group_id);
    console.log("delete post 성공.");
    document.location.href = "/study";
  };

  render() {
    return (
      <div>
        <Container maxWidth="lg" className="main-container">
          <br />
          <img src={this.state.group_img} alt="" />
          <h3>{this.state.group_name}</h3>
          <h6>{this.state.group_body}</h6>
          <Button
            color="secondary"
            size="small"
            onClick={event => this.groupDelete()}
          >
            Group Delete
          </Button>
          <hr />
          <Link
            to={{
              pathname: `/study/${this.state.group_name}/new`,
              state: {
                group_name: this.state.group_name,
                group_id: this.state.group_id
              }
            }}
          >
            New Post
          </Link>
          {this.state.posts.map(post => (
            <PostView
              post_id={post.id}
              author_id={post.user_id}
              author_name={post.author_name}
              title={post.title}
              body={post.body}
              study_type={post.study_type}
              group_name={this.state.group_name}
            />
          ))}
        </Container>
      </div>
    );
  }
}

export default GroupDetail;
