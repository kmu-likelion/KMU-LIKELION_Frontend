import React, { Component } from 'react'
// import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';




export default class LeftProfileView extends Component {
    render() {
        const {username, sns_id } = this.props


        return (
            <Paper elevation={10} className="LeftProfile">
              <div>
              <img src={"data:image/jpeg;base64,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"} alt="Myprofile" />
              <br />
              <br />
              <h1>{username}</h1>
              <h5>@sns_id</h5>
              <br/>
              </div>
              

              <MenuList>
                <hr/>
                <MenuItem onClick={event => this.props.handlingSubmit(event, "Myprofile")}>
                <ListItemIcon>
                    <SendIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">My Profile</Typography>
                </MenuItem>

                <MenuItem onClick={event => this.props.handlingSubmit(event, "MyLike")}>
                <ListItemIcon>
                    <PriorityHighIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">My Liked Post</Typography>
                </MenuItem>

                <MenuItem onClick={event => this.props.handlingSubmit(event, "MyPost")}>
                <ListItemIcon>
                    <DraftsIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit" noWrap>
                    My Post
                </Typography>
                </MenuItem>

                <MenuItem onClick={event => this.props.handlingSubmit(event, "MyComment")}>
                <ListItemIcon>
                    <DraftsIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit" noWrap>
                    My Comment
                </Typography>
                </MenuItem>
                
              </MenuList>
            </Paper>
              
            
                
        );
    }
}
