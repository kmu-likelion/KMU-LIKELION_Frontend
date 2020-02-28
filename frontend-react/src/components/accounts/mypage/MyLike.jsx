import React, { Component } from "react";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import api from "../../../api/BoardAPI";
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';


const useStyles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,

  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
});



class MyLike extends React.Component {
  state = {
    likeNotice: [],
    likeQnA: [],
    likeStudy: [],
    likeSession:[],
    likeCareer:[],
  };
  componentDidMount() {
    this.getLikePosts("notice");
    this.getLikePosts("qna");
    this.getLikePosts("study");
    this.getLikePosts("session");
    this.getLikePosts("career");
  }

  async getLikePosts(target) {
    await api
      .getUserLikePost(target)
      .then(likePosts => {
        console.log("음",likePosts);
        var posts = likePosts.data.board_contents;
        switch (target) {
          case "notice":
            this.setState({ likeNotice: posts });
            break;
          case "qna":
            this.setState({ likeQnA: posts });
            break;
          case "study":
            this.setState({ likeStudy: posts });
            break;
          case "session":
            this.setState({ likeSession: posts });
            break;
          case "career":
            this.setState({ likeCareer: posts });
            break;
          default:
            break;
        }
      })
      .catch(err => console.log(err));
  }

  show(type){
    console.log("dsfsdf", type)
    let LikeList = [];
    let board_type = "";
    switch(type){
      case "Notice Board":
        LikeList = this.state.likeNotice;
        board_type = "notice";
        break;
      case "QnA Board":
        LikeList = this.state.likeQnA;
        board_type = "qna";
        break;
      case "Study Board":
        LikeList = this.state.likeStudy;
        board_type = "study";
        break;
      case "Session Board":
        LikeList = this.state.likeSession;
        board_type = "session";
        break;
      case "Career Board":
        LikeList = this.state.likeCareer;
        board_type = "career";
        break;
      default:
        LikeList=[];
        board_type = "";
        break;
    }

    if(board_type === "study"){
      return(
        LikeList.map(item => (
          <ListItem>
            <Link
                  to={`/${board_type}/${item.group_name}/detail/${item.id}`}
                  className={"main-postTitle"}
                >
                  <ListItemText primary={`${item.title}`} />
                </Link>
            
          </ListItem>
        ))
      )
    }
    
    return(
      LikeList.map(item => (
        <ListItem>
          <Link
                to={`/${board_type}/detail/${item.id}`}
                className={"main-postTitle"}
              >
                <ListItemText primary={`${item.title}`} />
              </Link>
          
        </ListItem>
      ))
    )
    
  }

  

  render() {
    const { classes } = this.props;



    return (
      <Paper elevation={10} className="MyLike">
        <>
          <h1>Liked Post</h1>
          <hr/>
          <br/>
          <List className={classes.root} subheader={<li />}>
            {["Notice Board", "QnA Board", "Study Board", "Session Board", "Career Board"].map(sectionId => (
              <li key={`section-${sectionId}`} className={classes.listSection}>
                <ul className={classes.ul}>
                  <ListSubheader><h3>{`${sectionId}`}</h3></ListSubheader>
                  {this.show(sectionId)}
                </ul>
              </li>
            ))}
          </List>
          </>
      </Paper>
    );
  }
}

export default withStyles(useStyles)(MyLike)