import React, { Component } from "react";
import api from '../../api/api_board'
import { Link } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

// var moment = require('moment');
// import moment from 'moment';


class NoticeNew extends Component {

    state = {
        title : '',
        body : '',
        run_date: '',
    }

    componentDidMount() {
		console.log("New ComponentDidMount");
        // this._getPost(this.props.match.params.id);
    }

    handlingChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
        // console.log('run date : ', this.state.run_date)
        // console.log(rDate);
        console.log(event.target.value);
        // console.log(moment(event.target.value).isValid());
    }

    handlingSubmit = async (event) => {
        event.preventDefault() //event의 디폴트 기능(새로고침 되는 것 등..) -> 막는다.
        // var rDate = moment(this.state.run_date).format();
        // rDate = moment(rDate).add(1,'d');
        let result = await api.createPost('notice',{title:this.state.title, body:this.state.body, run_date:this.state.run_date}).catch(err => console.log(err))
        console.log("정상적으로 생성됨.", result)
        this.setState({title:'', content:'', run_date:''})
        // this.getPosts()
        document.location.href = "/notice";
    }
    
    render() {
        return(
                <Container maxWidth="lg" className="PostingSection">
                    <Paper className="PostingPaper">
                        <h2>New Notice</h2>
                        <form onSubmit={this.handlingSubmit} className="PostingForm">
                            <input id='title' name='title' value={this.state.title} onChange={this.handlingChange} required="required" placeholder="Title"/>
                            <input id='body' name='body' value={this.state.body} onChange={this.handlingChange} required="required" placeholder="Content"/>
                            <input type="date" name='run_date' value={this.state.run_date} onChange={this.handlingChange} required="required" placeholder="Run Date"/>

                            <button type="submit">제출</button>
                        </form>
                        
                        <Link to='/notice'>Cancle</Link>
                    </Paper>
                </Container>
        );
    }
}


export default NoticeNew;