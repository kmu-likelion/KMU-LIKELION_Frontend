import React, { Component } from 'react'
// import { Link } from "react-router-dom";

// import Avatar from '@material-ui/core/Avatar';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from "@material-ui/core/Button";
export default class MyProfile extends Component {
    render() {
        const {id ,major, start_num, student_id, email,  } = this.props
        return (
            <Paper elevation={10} className="MyProfile">
                
              <h1>My Profile</h1>
              
              
              <br />
              <br />
              <TextField
                className="standard-read-only-input"
                label="User Name"
                defaultValue={id}
                InputProps={{
                    readOnly: true,
                }}
                />
                <br/>
                <br/>
                <TextField
                className="standard-read-only-input"
                label="E-mail"
                defaultValue={email}
                InputProps={{
                    readOnly: true,
                }}
                />
                <br/>
                <br/>
                <TextField
                className="standard-read-only-input"
                label="Start_Num"
                defaultValue={start_num}
                InputProps={{
                    readOnly: true,
                }}
                />
                <br/>
                <br/>
                <TextField
                className="standard-read-only-input"
                label="Major"
                defaultValue={major}
                InputProps={{
                    readOnly: true,
                }}
                />
                <br/>
                <br/>
                <TextField
                className="standard-read-only-input"
                label="Student_Num"
                defaultValue={student_id}
                InputProps={{
                    readOnly: true,
                }}
                />
                <br/><br/>
                
                <Button
                        className="faked"
                        variant="contained"
                        color="primary"
                        size="large"
                        
                        startIcon={<SaveIcon />}
                    >
                        Save
                    </Button>
            </Paper>
                
        );
    }
}
