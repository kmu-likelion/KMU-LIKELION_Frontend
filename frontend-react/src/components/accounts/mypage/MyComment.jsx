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

class MyComment extends Component {
  state = {
    studycomments: [],
    noticecomments: [],
    qnacomments: [],
    recruitcomments: [],
  };
  componentDidMount() {
    const id = this.props.id;
    this.getMyPost(id);
  }

  async getMyPost(id) {
    await api
      .getMyPost(id)
      .then(myPosts => {
        console.log(myPosts);
        var mystudy = myPosts.data.studycomments;
        var mynotice = myPosts.data.noticecomments;
        var myqna = myPosts.data.qnacomments;
        var myrecruit = myPosts.data.recruitcomments;
        
        this.setState({studycomments:mystudy});
        this.setState({noticecomments:mynotice});
        this.setState({qnacomments:myqna});
        this.setState({recruitcomments:myrecruit});

      })
      .catch(err => console.log(err));
  }

  show(type){
    let commentlist =[];
    let board_type = "";
    switch(type){
      case "Notice Board":
        commentlist = this.state.noticecomments;
        board_type = "notice";
        break;
      case "QnA Board":
        commentlist = this.state.qnacomments;
        board_type = "qna";
        break;
      case "Study Board":
        commentlist = this.state.studycomments;
        board_type = "study";
        break;
      case "Recruit Board":
        commentlist = this.state.recruitcomments;
        board_type = "recruit";
        break;
      default:
        commentlist=[];
        break;
    }
    if(board_type === "study"){
      return(
        commentlist.map(item => (
          <ListItem>
            <Link
                  to={`/${board_type}/${item.group_name}/detail/${item.board}`}
                  className={"main-postTitle"}
                >
                  <ListItemText primary={`${item.title}`} />
                </Link>
            
          </ListItem>
        ))
      )
    }


    return(
      commentlist.map(item => (
        <ListItem>
          <Link
                to={`/${board_type}/detail/${item.board}`}
                className={"main-postTitle"}
              >
                <ListItemText primary={`${item.body}`} />
              </Link>
          
        </ListItem>
      ))
    )
    
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper elevation={10} className="MyComment">
        <>
          <h1>My Comments</h1>
          <br />
          <List className={classes.root} subheader={<li />}>
            {["Notice Board", "QnA Board", "Study Board","Recruit Board"].map(sectionId => (
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

export default withStyles(useStyles)(MyComment)