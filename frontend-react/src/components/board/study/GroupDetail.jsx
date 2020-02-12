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
      group_info: []
    };
  }

  componentDidMount() {
    // console.log("파라미터:", this.props.match.params.group);
    // await this.setState({
    //   group_name: this.props.match.params.group,
    //   group_id: this.props.location.state.group_id
    // });
    this.getGroup();
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
          group_body: res.data[0].introduction
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getGroupPost = async () => {
    await api.getGroupPost;
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
          <h6>
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
          </h6>
        </Container>
      </div>
    );
  }
}

export default GroupDetail;
