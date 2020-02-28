import React, { Component } from 'react'
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from "@material-ui/core/Button";
export default class MyProfile extends Component {
    state={
        is_update:false,

    };


    render() {
        const {id ,major, start_num, student_id, email, sns_id  } = this.props

        if(this.state.is_update===false){
            return (
                <Paper elevation={10} className="MyProfile">
                  <h1>My Profile</h1>
                  <hr/>
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
                    <br/>
                    <br/>
                    <TextField
                    className="standard-read-only-input"
                    label="sns_id"
                    defaultValue={sns_id}
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
                            onClick={e => (this.setState({is_update:true}))}
                        >
                            Update
                        </Button>
                </Paper>
            );
        } else {
            return (
                <Paper elevation={10} className="MyProfile">
                  <h1>My Profile Update</h1>
                  <hr/>
                  <br />
                  <br />
                  <TextField
                    className="standard-required"
                    label="User Name"
                    defaultValue={id}
                    />
                    <br/>
                    <br/>
                    <TextField
                    className="standard-required"
                    label="E-mail"
                    defaultValue={email}
                    />
                    <br/>
                    <br/>
                    <TextField
                    className="standard-required"
                    label="Start_Num"
                    defaultValue={start_num}
                    />
                    <br/>
                    <br/>
                    <TextField
                    className="standard-required"
                    label="Major"
                    defaultValue={major}
                    />
                    <br/>
                    <br/>
                    <TextField
                    className="standard-required"
                    label="Student_Num"
                    defaultValue={student_id}
                    />
                    <br/>
                    <br/>
                    <TextField
                    className="standard-required"
                    label="sns_id"
                    defaultValue={sns_id}
                    />
                    <br/><br/>
                    <Button
                            className="faked"
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<SaveIcon />}
                            onClick={e => (this.setState({is_update:true}))}
                        >
                            Update
                        </Button>
                </Paper>
        );
                }
    }
}
