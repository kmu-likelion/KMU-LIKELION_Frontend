import React, { Component } from "react";
import api from '../../api/api_board'
import axios from "axios";
import { Link } from "react-router-dom";

// @material-ui
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";



class NoticeDetail extends Component {
    state = {
        id: '',
        title : '',
        body : '',
        pub_date: '',
        run_date: '',
    }

    componentDidMount() {
		console.log("Detail ComponentDidMount");
		this._getNotice(this.props.match.params.id);
    }
    
    _getNotice = (id = "") => {
		console.log("get notice Method 실행");
		let URL;
		if (id) {
			URL = `notice/${id}`;
		} else {
            // URL = `api/notice/`;
            console.log(`${id}번째 포스트 가져오기 실패!`);
		}
		let data = [];
		axios
			.get(URL)
			.then(res => {
				console.log("End Point: ", URL);		
                const postData = res.data;
				this.setState({ 
                    title: postData.title,
                    body: postData.body,
                    id: postData.id,
                    pub_date : postData.pub_date,
                    run_date : postData.run_date
                });
                console.log('get post 성공.')
			})
			.catch(err => console.log(err));

		return data;
    };
    
    handlingDelete = async (id) => {
        await api.deleteNotice(id)
        console.log('delete post 성공.');
        document.location.href = "/notice";
    }

    render() {
        return(
            <Card className={'card'}>
                <CardContent>   
                    <Typography>
                        <h6>Title : {this.state.title}</h6>
                        <p>body : {this.state.body}</p>
                        <p>시각 : {this.state.run_date}</p>
                        <br/>
                        <p>작성일 : {this.state.pub_date}</p>
                    </Typography>
                </CardContent>

                <CardActions>
                    <Button color="secondary" size="small" onClick={(event)=> this.handlingDelete(this.state.id)}>Delete</Button>
                    <Link to={'/notice'}>Back</Link>
                </CardActions>  
                    
            </Card>
            
        );
    }
}

export default NoticeDetail;