import React, { Component } from 'react'
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from "@material-ui/core/Button";
import api from "../../../api/MentoringAPI";

import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';


const useStyles = theme => ({
  root: {
    
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'auto',
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
});

class MyMentoring extends Component {
    state={
        linkedMentor:[],
        linkedMentee:[],
        MentorList:[],

    }
    componentDidMount(){
        //this.setState({id:this.props.id});
        this.getLinkedMentee(this.props.id);
        this.getLinkedMentor(this.props.id);
    }

    getLinkedMentor = async (id) => {
        await api
          .getLinkedMentorInfo(id)
          .then(res => {
    
            this.setState({
                linkedMentor : []
            });
            console.log("연결된 멘토데이터 받아옴", res.data);
            this.setState({
                linkedMentor: res.data
            });
            
          })
          .catch(err => {
            console.log(err);
          });
      };
      
      
      getLinkedMentee = async (id) => {
        await api
          .getLinkedMenteeInfo(id)
          .then(res => {
            this.setState({
                linkedMentee : []
            });
            console.log("연결된 멘티데이터 받아옴", res.data);
            this.setState({
                linkedMentee: res.data
            });
          })
          .catch(err => {
            console.log(err);
          });
      };

    render() {
        const classes = useStyles();
        return (
            <Paper elevation={10} className="MyMentoring">
              <h1>My Mentoring</h1>
              <hr/>
              <br/>
              <h3>My Mentor</h3>
              <div className={classes.root}>
                <GridList className={classes.gridList} cols={2.5}>
                    {this.state.linkedMentor.map(tile => (
                    <GridListTile key={tile.user.img}>
                        <img src={tile.user.img} alt={tile.user.id} />
                        <GridListTileBar
                        title={tile.user.username}
                        classes={{
                            root: classes.titleBar,
                            title: classes.title,
                        }}
                        actionIcon={
                            <IconButton aria-label={`star ${tile.user.username}`}>
                            <StarBorderIcon className={classes.title} />
                            </IconButton>
                        }
                        />
                    </GridListTile>
                    ))}
                </GridList>
                </div>
                <br/>
                
              <h3>My Mentee</h3>
              <div className={classes.root}>
                <GridList className={classes.gridList} cols={2.5}>
                    {this.state.linkedMentee.map(tile => (
                    <GridListTile key={tile.user.img}>
                        <img src={tile.user.img} alt={tile.user.id} />
                        <GridListTileBar
                        title={tile.user.username}
                        classes={{
                            root: classes.titleBar,
                            title: classes.title,
                        }}
                        actionIcon={
                            <IconButton aria-label={`star ${tile.user.username}`}>
                            <StarBorderIcon className={classes.title} />
                            </IconButton>
                        }
                        />
                    </GridListTile>
                    ))}
                </GridList>
                </div>

              
              
            </Paper>
                
        );
    }
}

export default withStyles(useStyles)(MyMentoring);