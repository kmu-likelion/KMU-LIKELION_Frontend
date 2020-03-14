import React, { Component } from 'react'
import { Link } from "react-router-dom";

import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


export default class RecruitView extends Component {
    render() {
        const {id, title, body, purpose} = this.props
        return (
                <Card className={'card'}>
                    <CardContent>
                        <Typography>
                            <h4><Link to={`/recruit/detail/${id}`}>{title}</Link></h4>
                            <p>{body}</p>
                            <small>purpose : {purpose}</small>
                        </Typography>
                    </CardContent>
                </Card>
        );
    }
}

