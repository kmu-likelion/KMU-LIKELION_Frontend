import React, { Component } from 'react'
import { Link } from "react-router-dom";

import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


export default class MyProfile extends Component {
    render() {
        const {id, title, body, purpose} = this.props
        return (
            <Paper elevation={10} className="PostingPaper">
              Mypage <br />
              <br />
              ID {this.state.id} <br />
              Username {this.state.username} <br />
              Email {this.state.email} <br />
              학과 {this.state.major} <br />
              멋쟁이사자 {this.state.start_num} <br />
              학번 {this.state.student_id} <br />
              SNS {this.state.sns_id} <br />
              
              
              
            </Paper>
                
        );
    }
}
