import React from "react";
import api from "../../api/MentoringAPI";
import { getAllUser } from "../../api/AuthAPI";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// import { FixedSizeList } from "react-window";
import List from "@material-ui/core/List";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
class MentoringAdd extends React.Component {
  state = {
  };

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {allUser,selected_mentee,selected_mentor,mentorOpen,menteeOpen,mentorId,menteeId}=this.props;

    return (
      <>
        <Table>
          <TableBody>
          <TableRow>
                <TableCell colSpan={2}>
                  <form
                    onSubmit= {event=>this.props.createMentoring(event)}
                    className={"mentoring-form"}
                  >
                    <Select
                      className={"mentoring-select"}
                      open={mentorOpen}
                      onClose={e => this.props.onCloseMentor()}
                      name="selected_mentor"
                      onOpen={e => this.props.onOpenMentor()}
                      value={selected_mentor}
                      onChange={e =>
                        this.props.onChangeMentor(e)
                      }
                      displayEmpty
                    >
                      <MenuItem value="">
                        <small>Mentor</small>
                      </MenuItem>
                      {allUser.map(user => (
                        <MenuItem value={user.id}>{user.username}</MenuItem>
                      ))}

                    </Select>


                    <Select
                      className={"mentoring-select"}
                      open={menteeOpen}
                      onClose={e => this.props.onCloseMentee()}
                      name="selected_mentee"
                      onOpen={e => this.props.onOpenMentee()}
                      value={selected_mentee}
                      onChange={e =>
                        this.props.onChangeMentee(e)
                      }
                      displayEmpty
                    >
                      <MenuItem value="">
                        <small>Mentee</small>
                      </MenuItem>
                      {allUser.map(user => (
                        <MenuItem value={user.id}>{user.username}</MenuItem>
                      ))}

                    </Select>

                    <Button type="submit">ADD</Button>
                  </form>
                </TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </>
    );
  }
}

export default MentoringAdd;
