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
class MentoringManage extends React.Component {
  state = {
    mentoring: [],
    mentors: [],
    mentees: [],
    allUser: [],
    selected_mentor: "",
    selected_mentee: "",
    mentorOpen: false,
    menteeOpen: false
  };

  componentDidMount() {
    this.getAllMentoring();
    this.getAllUser();
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getAllUser = async () => {
    await getAllUser().then(res => {
      console.log("모든 유저 받아옴", res.data);
      this.setState({
        allUser: res.data.results
      });
    });
  };

  getAllMentoring = async () => {
    await api
      .getAllMentoring()
      .then(res => {
        console.log("멘토링데이터 받아옴", res.data);
        this.setState({
          mentoring: res.data.results
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  createMentoring = async event => {
    event.preventDefault();
    await api
      .createMentoring({
        mentor: this.state.selected_mentor,
        mentee: this.state.selected_mentee
      })
      .then(res => {
        console.log("Add metoring:", res.data);
        this.getAllMentoring();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <>
        <TableContainer>
          <Table className={"mentoring-table"}>
            <TableHead>
              <TableRow>
                <TableCell>Mentor</TableCell>
                <TableCell>Mentee</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <List subheader={<li />} className={"mentoring-list"}>
                    {this.state.mentoring.map(row => (
                      <li key={`li-${row.mentor}`}>
                        <ul className={"mentoring-ul"}>
                          <ListItem button key={row.id}>
                            <ListItemText primary={row.mentor_name} />
                          </ListItem>
                        </ul>
                      </li>
                    ))}
                  </List>
                </TableCell>
                <TableCell>
                  <List subheader={<li />} className={"mentoring-list"}>
                    {this.state.mentoring.map(row => (
                      <li key={`li-${row.mentor}`}>
                        <ul className={"mentoring-ul"}>
                          <ListItem button key={row.id}>
                            <ListItemText primary={row.mentee_name} />
                          </ListItem>
                        </ul>
                      </li>
                    ))}
                  </List>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={2}>
                  <form
                    onSubmit={event => this.createMentoring(event)}
                    className={"mentoring-form"}
                  >
                    <Select
                      className={"mentoring-select"}
                      open={this.state.mentorOpen}
                      onClose={e => this.setState({ mentorOpen: false })}
                      name="selected_mentor"
                      onOpen={e => this.setState({ mentorOpen: true })}
                      value={this.state.selected_mentor}
                      onChange={e =>
                        this.setState({ selected_mentor: e.target.value })
                      }
                      displayEmpty
                    >
                      <MenuItem value="">
                        <small>Mentor</small>
                      </MenuItem>
                      {this.state.allUser.map(user => (
                        <MenuItem value={user.id}>{user.username}</MenuItem>
                      ))}
                    </Select>
                    <Select
                      className={"mentoring-select"}
                      open={this.state.menteeOpen}
                      onClose={e => this.setState({ menteeOpen: false })}
                      name="selected_mentee"
                      onOpen={e => this.setState({ menteeOpen: true })}
                      value={this.state.selected_mentee}
                      onChange={e =>
                        this.setState({ selected_mentee: e.target.value })
                      }
                      displayEmpty
                    >
                      <MenuItem value="">
                        <small>Mentee</small>
                      </MenuItem>
                      {this.state.allUser.map(user => (
                        <MenuItem value={user.id}>{user.username}</MenuItem>
                      ))}
                    </Select>
                    <Button type="submit">ADD</Button>
                  </form>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}

export default MentoringManage;
