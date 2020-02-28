import React, { Component } from 'react'
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from "@material-ui/core/Button";
export default class MyProfile extends Component {
    state={
        is_update:false,
        major:"",
        start_num:"",
        student_id:"",
        email:"",
        user_type:"",
        full_name:"",

    };
    handlingChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };


    render() {
        const {id ,major, start_num, student_id, email, user_type, full_name } = this.props

        if(this.state.is_update===false){
            return (
                <Paper elevation={10} className="MyProfile">
                  <h1>My Profile</h1>
                  <hr/>
                  <br/>
                  <br/>
                  <TextField
                    className="standard-read-only-input"
                    label="User Name"
                    defaultValue={full_name}
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
                    label="user_type"
                    defaultValue={user_type}
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
                    defaultValue={full_name}
                    name="full_name"
                    value={this.state.full_name}
                    onChange={this.handlingChange}
                    />
                    <br/>
                    <br/>
                    <TextField
                    className="standard-required"
                    label="E-mail"
                    defaultValue={email}
                    name="email"
                    value={this.state.email}
                    onChange={this.handlingChange}
                    />
                    <br/>
                    <br/>
                    <TextField
                    className="standard-required"
                    label="Start_Num"
                    defaultValue={start_num}
                    name="start_num"
                    value={this.state.start_num}
                    onChange={this.handlingChange}
                    />
                    <br/>
                    <br/>
                    <TextField
                    className="standard-required"
                    label="Major"
                    defaultValue={major}
                    name="major"
                    value={this.state.major}
                    onChange={this.handlingChange}
                    />
                    <br/>
                    <br/>
                    <TextField
                    className="standard-required"
                    label="Student_Num"
                    defaultValue={student_id}
                    name="student_id"
                    value={this.state.student_id}
                    onChange={this.handlingChange}
                    />
                    <br/>
                    <br/>
                    <TextField
                    className="standard-required"
                    label="user_type"
                    defaultValue={user_type}
                    name="user_type"
                    value={this.state.user_type}
                    onChange={this.handlingChange}
                    />
                    <br/><br/>
                    <Button
                            className="faked"
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<SaveIcon />}
                            onClick={e => {(this.setState({is_update:false}));
                            this.props.updateUser(id,{
                                "username": "admin",
                                "first_name": "",
                                "last_name": "",
                                "full_name": "",
                                "img": "http://127.0.0.1:8000/static/images/default_profile_img.png",
                                "id": 1,
                                "email": "qkr@naver.com",
                                "date_joined": "2020-02-28T08:03:24",
                                "major": null,
                                "student_id": null,
                                "user_type": null,
                                "start_number": null,
                                "sns_id": null
                            }
                            )
                            }}
                        >
                            수정
                        </Button>
                </Paper>
        );
                }
    }
}
