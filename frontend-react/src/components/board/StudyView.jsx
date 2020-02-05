import React, { Component } from 'react'
import { Link } from "react-router-dom";

import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


export default class StudyView extends Component {
    render() {
        const {id, title, body, how_many_people} = this.props
        return (
                <Card className={'card'}>
                    <CardContent>
                        <Typography>
                            <h4><Link to={`/study/detail/${id}`}>{title}</Link></h4>
                            <p>{body}</p>
                            <small>참여인원 : {how_many_people}</small>
                        </Typography>
                    </CardContent>
                </Card>
        );
    }
}

