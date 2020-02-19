import React, { Component } from 'react'
import { Link } from "react-router-dom";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


export default class QnAView extends Component {
    render() {
        const {id, title, body, subject} = this.props
        return (
                <Card className={'card'}>
                    <CardContent>
                        <Typography>
                            <h4><Link to={`/QnA/detail/${id}`}>{title}</Link></h4>
                            <p>{body}</p>
                            <small>Subject : {subject}</small>
                        </Typography>
                    </CardContent>
                </Card>
        );
    }
}

