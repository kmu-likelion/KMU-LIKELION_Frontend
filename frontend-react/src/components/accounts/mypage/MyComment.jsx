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
    maxWidth: 750,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 500,

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
    studyboard_comments: [],
    noticeboard_comments: [],
    qnaboard_comments: [],
    sessionboard_comments: [],
  };
  componentDidMount() {
    const id = this.props.id;
    this.getMyPost(id);
  }

  async getMyPost(id) {
    await api
      .getMyPost(id)
      .then(myPosts => {
        var mystudy = myPosts.data.studyboard_comments;
        var mynotice = myPosts.data.noticeboard_comments;
        var myqna = myPosts.data.qnaboard_comments;
        var mysession = myPosts.data.sessionboard_comments;


        this.setState({studyboard_comments:mystudy});
        this.setState({noticeboard_comments:mynotice});
        this.setState({qnaboard_comments:myqna});
        this.setState({sessionboard_comments:mysession});
      })
      .catch(err => console.log(err));
  }

  show(type){
    let commentlist =[];
    let board_type = "";
    switch(type){
      case "Notice Board":
        commentlist = this.state.noticeboard_comments;
        board_type = "notice";
        break;
      case "QnA Board":
        commentlist = this.state.qnaboard_comments;
        board_type = "qna";
        break;
      case "Study Board":
        commentlist = this.state.studyboard_comments;
        board_type = "study";
        break;
      case "Session Board":
        commentlist = this.state.sessionboard_comments;
        board_type = "session";
        break;
      case "Submission Board":
        commentlist = this.state.submissionboard_comments;
        board_type = "submission";
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
                  <ListItemText primary={`${item.body}`} />
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
          <hr/>
          <br />
          <List className={classes.root} subheader={<li />}>
            {["Notice Board", "QnA Board", "Study Board","Session Board"].map(sectionId => (
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