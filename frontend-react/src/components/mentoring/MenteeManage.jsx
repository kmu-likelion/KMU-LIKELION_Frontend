import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CancelIcon from '@material-ui/icons/Cancel';
class MenteeManage extends React.Component {
  state = {
    selectedIndex: ""
  }

  selectIndex = (id) => {
    this.setState({
      selectedIndex : id 
    })
  }
  render() {
    const {allMentee,linkedMentor} =this.props;
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
                    {allMentee.map(row => (
                      <li key={`li-${row.user.mentor}`}>
                        <ul className={"mentoring-ul"}>
                          <ListItem button key={row.user.id} selected={this.state.selectedIndex === row.user.id}>
                            <ListItemText primary={row.user.first_name} onClick={event => {this.props.getLinkedMentor(row.user.id); this.selectIndex(row.user.id)}}/>
                          </ListItem>
                        </ul>
                      </li>
                    ))}
                  </List>
                </TableCell>
                <TableCell>
                  <List subheader={<li />} className={"mentoring-list"}>
                    {linkedMentor.map(row => (
                      <li key={`li-${row.mentor}`}>
                        <ul className={"mentoring-ul"}>
                          <ListItem button key={row.id}>
                            <ListItemText primary={row.mentor_name} />
                            <CancelIcon className="Cancle" onClick={event => this.props.deleteMentoring(row.mentor,row.mentee)} />
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
