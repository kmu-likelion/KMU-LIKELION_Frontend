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
class MentorManage extends React.Component {
  state = {
    selectedIndex: ""
  }

  selectIndex = (id) => {
    this.setState({
      selectedIndex : id
    })
  }
  render() {
    const{allMentor,linkedMentee}= this.props;
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
                    {allMentor.map(row => (
                      <li key={`li-${row.user.mentor}`}>
                        <ul className={"mentoring-ul"}>
                          <ListItem button key={row.user.id} selected={this.state.selectedIndex === row.user.id} >
                            <ListItemText primary={row.user.first_name} onClick={event => {this.props.getLinkedMentee(row.user.id); this.selectIndex(row.user.id)}}/>
                          </ListItem>
                        </ul>
                      </li>
                    ))}
                  </List>
                </TableCell>
                <TableCell>
                  <List subheader={<li />} className={"mentoring-list"}>
                    {linkedMentee.map(row => (
                      <li key={`li-${row.mentor}`}>
                        <ul className={"mentoring-ul"}>
                          <ListItem button key={row.id}>
                            <ListItemText primary={row.mentee_name} />
                            <CancelIcon className="Cancle" onClick={event => this.props.deleteMentoring(row.mentor,row.mentee)}/>
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

export default MentorManage;
