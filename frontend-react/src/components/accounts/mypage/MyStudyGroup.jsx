import React, { Component } from 'react'
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from "@material-ui/core/Button";
import api from "../../../api/GroupAPI";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';


export default class MyStudyGroup extends Component {
    state={
        MyStudyGroup:[]

    }

    componentDidMount(){
        this.getMyStudyGroup(this.props.id);
    }

    getMyStudyGroup = async (id) => {
        await api
          .getMyStudyGroup(id)
          .then(res => {
            this.setState({
                MyStudyGroup: res.data.results
            });
            
          })
          .catch(err => {
            console.log(err);
          });
      };

    render() {
    
        return (
            <Paper elevation={10} className="MyStudyGroup">
              <h1>My StudyGroup</h1>
              <hr/>
              {this.state.MyStudyGroup.map(item => (
                <ListItem>
                
                <ListItemText primary={`${item.name}`} />
          
                </ListItem>
            ))}
              
            </Paper>
                
        );
    }
}