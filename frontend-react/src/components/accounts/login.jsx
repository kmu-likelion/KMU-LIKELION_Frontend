import React, { Component } from "react";
import api from '../../api/api_auth';
import { Link } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

// var moment = require('moment');
// import moment from 'moment';


class Login extends Component {

    state = {
        username: '',
        password: ''
    }

    componentDidMount() {
		console.log("New ComponentDidMount");
    }

    handlingChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
        console.log(event.target.value);
    }

    handlingSubmit = async (event) => {
        event.preventDefault() //event의 디폴트 기능(새로고침 되는 것 등..) -> 막는다.
        
        let result = await api.authLogin({username:this.state.username, password:this.state.password}).catch(err => console.log(err))
        console.log("로그인 성공!", result)
        this.setState({username:'', password:''})

        // document.location.href = "/notice";
    }
    
    render() {
        return(
                <Container maxWidth="lg" className="PostingSection">
                    <Paper className="PostingPaper">
                        <h2>Login</h2>
                        <form onSubmit={this.handlingSubmit} className="PostingForm">
                            <input type="text" id='username' name='username' value={this.state.username} onChange={this.handlingChange} required="required" placeholder="Username"/>
                            <br/>
                            <input type="password" id='password' name='password' value={this.state.password} onChange={this.handlingChange} required="required" placeholder="PW"/>                            
                            <br/>
                            <button type="submit">Login</button>
                        </form>
                        
                        <Link to='/'>Cancle</Link>
                    </Paper>
                </Container>
        );
    }
}


export default Login;