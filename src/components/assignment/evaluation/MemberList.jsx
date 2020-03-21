import React from "react";
import { Link } from "react-router-dom";

import api from "../../../api/SessionAPI";

import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction
} from "@material-ui/core";
import { Divider, IconButton, Avatar } from "@material-ui/core";

class MemberList extends React.Component {
  state = {
    submitStatus: ""
  };
  componentDidMount() {
    this.getSubmitStatus(this.props.member.id, this.props.assignmentId);
  }
  getSubmitStatus = async (user_id, assignment_id) => {
    await api.getSubmitStatusWithUser(user_id, assignment_id).then(res => {
      this.setState({
        submitStatus: res.data.status
      });
    });
  };
  render() {
    const { member, selectMember } = this.props;
    const status = {
      COMPLETE: "제출됨",
      UNQUALIFIED: "권한이 없습니다.",
      NOT_SUBMIT: "미제출",
      LATE: "마감 후 제출"
    };
    return (
      <>
        <li key={`li-${member.id}`}>
          <ul className={"mentoring-ul"}>
            <ListItem button onClick={e => selectMember(member.id)}>
              <ListItemAvatar>
                <IconButton component={Link} to={``}>
                  <Avatar alt="Recomment-writer" src={member.img} />
                </IconButton>
              </ListItemAvatar>
              <ListItemText primary={member.username} secondary={""} />
              <ListItemSecondaryAction>
                {status[this.state.submitStatus]}
              </ListItemSecondaryAction>
            </ListItem>
          </ul>
        </li>
        <Divider variant="inset" />
      </>
    );
  }
}

export default MemberList;
