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
    selected_mentor: "",
    selected_mentee: "",
    mentorOpen: false,
    menteeOpen: false,
    mentorId:"",
    menteeId:"",
  };

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
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
        this.props.getAllMentor();
        this.props.getAllMentee();
        console.log("id값",this.state.mentorId);
        console.log("id값",this.state.menteeId);

        this.props.getLinkedMentor(this.state.menteeId);
        this.props.getLinkedMentee(this.state.mentorId);
        
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const {allUser}=this.props;
    


    return (
      <>
        <Table>
          <TableBody>
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
                      {allUser.map(user => (
                        <MenuItem value={user.id} onclick={e => this.setState({mentorId:user.id})}>{user.username}</MenuItem>
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
                      {allUser.map(user => (
                        <MenuItem value={user.id} onclick={e => this.setState({menteeId:user.id})}>{user.username}</MenuItem>
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
