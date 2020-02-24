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
import CancelIcon from '@material-ui/icons/Cancel';
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
class MenteeManage extends React.Component {
  state = {
    mentoring: [],
    mentors: [],
    mentees: [],
    allUser: [],
    allMentee:[],
    linkedMentor:[],
    selected_mentor: "",
    selected_mentee: "",
    mentorOpen: false,
    menteeOpen: false
  };

  componentDidMount() {
    this.getAllMentoring();
    this.getAllUser();
    this.getAllMentee();
    this.setState({linkedMentor:[]});
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
  getAllMentee = async () => {
    await api
      .getAllMentee()
      .then(res => {
        console.log("멘티데이터 받아옴", res.data);
        this.setState({
          allMentee: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getLinkedMentor = async (event,id) => {
    await api
      .getLinkedMentor(id)
      .then(res => {

        this.setState({
            linkedMentee : []
        });
        console.log("연결된 멘토데이터 받아옴", res.data);
        this.setState({
            linkedMentor: res.data.results
        });
      })
      .catch(err => {
        console.log(err);
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
                <TableCell>Mentee</TableCell>
                <TableCell>Mentor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <List subheader={<li />} className={"mentoring-list"}>
                    {this.state.allMentee.map(row => (
                      <li key={`li-${row.user.mentor}`}>
                        <ul className={"mentoring-ul"}>
                          <ListItem button key={row.user.id} >
                            <ListItemText primary={row.user.username} onClick={event => this.getLinkedMentor(event,row.user.id)}/>
                          </ListItem>
                        </ul>
                      </li>
                    ))}
                  </List>
                </TableCell>
                <TableCell>
                  <List subheader={<li />} className={"mentoring-list"}>
                    {this.state.linkedMentor.map(row => (
                      <li key={`li-${row.mentor}`}>
                        <ul className={"mentoring-ul"}>
                          <ListItem button key={row.id}>
                            <ListItemText primary={row.mentor_name} />
                            <CancelIcon className="Cancle" />
                          </ListItem>
                        </ul>
                      </li>
                    ))}
                  </List>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        
      </>
    );
  }
}

export default MenteeManage;
