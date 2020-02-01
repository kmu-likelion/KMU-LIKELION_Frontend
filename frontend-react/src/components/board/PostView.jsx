import React, { Component } from 'react'
import { Link } from "react-router-dom";

import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default class PostView extends Component {
    render() {
        const {id, title, body, runDate} = this.props
        return (
                <Card className={'card'}>
                    <CardContent>
                        <Typography>
                            <h3><Link to={`/notice/detail/${id}`}>{title}</Link></h3>
                            <p>{body}</p>
                            <p>{runDate}</p>
                        </Typography>
                    </CardContent>
                </Card>
        );
    }
}
