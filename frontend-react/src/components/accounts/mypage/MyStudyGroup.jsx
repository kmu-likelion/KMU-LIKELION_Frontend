import React, { Component } from 'react'
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from "@material-ui/core/Button";
import api from "../../../api/GroupAPI";



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
                MyStudyGroup : []
            });
            console.log("연결된 멘토데이터 받아옴", res.data);
            this.setState({
                MyStudyGroup: res.data
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
              
            </Paper>
                
        );
    }
}