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

  async getGroup() {
    let group_name = this.props.match.params.group;
    await api
      .getGroupWithName(group_name)
      .then(res => {
        console.log("getGroup 메서드 실행.");
        console.log("결과 : ", res);
        this.setState({ group_info: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

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
          <h3>{this.state.group_info.name}</h3>
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
            <Link
              to={{
                pathname: `/study/${this.state.group_name}/new`,
                state: {
                  group_name: this.state.group_name,
                  group_id: this.state.group_id
                }
              }}
            >
              New
            </Link>
          </h6>
        </Container>
      </div>
    );
  }
}

export default GroupDetail;
