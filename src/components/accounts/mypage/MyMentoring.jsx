import React, { Component } from 'react'
import api from "../../../api/MentoringAPI";

import { withStyles, GridList, GridListTile, GridListTileBar, IconButton, Typography } from "@material-ui/core";
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    width: '80%',
    paddingLeft: 20
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
            this.setState({
                linkedMentee: res.data
            });
          })
          .catch(err => {
            console.log(err);
          });
      };

    render() {
        const {classes} =this.props;
        return (
              <>
                <Typography variant="h4">
                    Mentor / Mentee
                </Typography>
                <hr/>
                <br/>
                <div className={classes.container}>
                  <Typography variant="h5">
                      나의 멘토
                  </Typography>              

                  <div className={classes.root}>
                    <GridList className={classes.gridList} cols={2.5}>
                      
                      {this.state.linkedMentor.map(tile => (
                      <GridListTile key={tile.user.img}>

                          <img src={tile.user.img} alt={tile.user.id} />
                          <a href={'/Mypage/'+ tile.user.username}>
                            <GridListTileBar
                            title={tile.user.first_name}
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
                          </a>
                      </GridListTile>
                      ))}
                    </GridList>
                  </div>

                  <hr/>
                  <Typography variant="h5">
                    나의 멘티
                  </Typography>
                  <div className={classes.root}>
                    <GridList className={classes.gridList} cols={2.5}>

                      {this.state.linkedMentee.map(tile => (
                        <GridListTile key={tile.user.img}>

                          <img src={tile.user.img} alt={tile.user.id} />
                          <a href={'/Mypage/'+ tile.user.username}>

                            <GridListTileBar
                            title={tile.user.first_name}
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
                          </a>
                        </GridListTile>
                      ))}
                    </GridList>
                  </div>
                </div>
              </>
        );
    }
}

export default withStyles(useStyles)(MyMentoring);