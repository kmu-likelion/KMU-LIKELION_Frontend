import React from "react";

// import api from "../../api/SessionAPI";
import { Link } from "react-router-dom";
import { getAllUser } from "../../api/AuthAPI";
import Typography from "@material-ui/core/Typography";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";

class MemberList extends React.Component {
  render() {
    const { memberList, selectMember } = this.props;
    return (
      <>
        <List subheader={<li />}>
          {memberList.map(member => (
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
                    <ListItemSecondaryAction>100/100</ListItemSecondaryAction>
                  </ListItem>
                </ul>
              </li>
              <Divider variant="inset" />
            </>
          ))}
        </List>
      </>
    );
  }
}

export default MemberList;
