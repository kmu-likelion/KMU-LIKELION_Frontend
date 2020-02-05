import React, { Component } from "react";
import api from '../../api/api_board'
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

// @material-ui
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";



class RecruitDetail extends Component {
    state = {
        id: '',
        title : '',
        body : '',
        pub_date: '',
        purpose: '',
    }

    componentDidMount() {
		console.log("Detail ComponentDidMount");
        this.getRecruit();
    }
    
    async getRecruit() {
        await api 
            .getPost("recruit", this.props.match.params.id)
            .then(res => {
                const data = res.data;

                this.setState({
                    title : data.title,
                    body : data.body,
                    id : data.id,
                    pub_date : moment(data.pub_date).format("YYYY-MM-DD hh:mm"),
                    purpose : data.purpose
                });

            })
            .catch(err => console.log(err));
    }


    
    handlingDelete = async (id) => {
        await api.deletePost("recruit",id)
        console.log('delete post 성공.');
        document.location.href = "/recruit";
    }

    render() {
        return(
            <Card className={'card'}>
                <CardContent>   
                    <Typography>
                        <h6>Title : {this.state.title}</h6>
                        <p>body : {this.state.body}</p>
                        <p>목적 : {this.state.purpose}</p>
                        <br/>
                        <p>작성일 : {this.state.pub_date}</p>
                    </Typography>
                </CardContent>

                <CardActions>
                    <Button color="secondary" size="small" onClick={(event)=> this.handlingDelete(this.state.id)}>Delete</Button>
                    <Link to={`/recruit/update/${this.state.id}`}>Update</Link>
                    <Link to={'/recruit'}>Back</Link>
                </CardActions>  
                    
            </Card>
            
        );
    }
}

export default RecruitDetail;