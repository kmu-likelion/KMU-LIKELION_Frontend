import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/BoardAPI";

import { List, ListItem, ListItemText, ListSubheader, withStyles, Typography} from "@material-ui/core";


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



class MyPost extends Component {

  state = {
    studyboard: [],
    noticeboard: [],
    qnaboard: [],
  };

  componentDidMount() {
    this.getMyPost(this.props.id);
  }

  async getMyPost(id) {
    await api
      .getMyPost(id)
      .then(myPosts => {
        console.log(myPosts);
        var mystudy = myPosts.data.studyboard;
        var mynotice = myPosts.data.noticeboard;
        var myqna = myPosts.data.qnaboard;
        this.setState({studyboard:mystudy});
        this.setState({noticeboard:mynotice});
        this.setState({qnaboard:myqna});

      })
      .catch(err => console.log(err));
  }

  show (type) {
    let postlist = [];
    let board_type = "";
     
    switch(type) {

      case "Notice Board":
        postlist = this.state.noticeboard;
        board_type = "notice";
        break;

      case "QnA Board":
        postlist = this.state.qnaboard;
        board_type = "qna";
        break;

      case "Study Board":
        postlist = this.state.studyboard;
        board_type = "study";
        break;

      default:
        postlist=[];
        board_type ="";
        break;
    }

    if(board_type === "study") {
      return (
        postlist.map(item => (
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

    return (
      postlist.map((item, index) => (
        <ListItem key={index}>
          <Link
                to={`/${board_type}/detail/${item.id}`}
              >
                <ListItemText primary={`${item.title}`} />
              </Link>
        </ListItem>
      ))
    );
  }

  render() {
    const { classes } = this.props;

    return (
        <>
          <Typography variant="h4">
            My Post
          </Typography>
          <hr/>
          <br />
          <List className={classes.root} subheader={<li />}>
            {["Notice Board", "QnA Board", "Study Board"].map((sectionId, index) => (

              <li key={`section-${index}`} className={classes.listSection}>
                <ul className={classes.ul}>
                  <ListSubheader><h3>{`${sectionId}`}</h3></ListSubheader>
                  {this.show(sectionId)}
                </ul>
              </li>

            ))}
          </List>
        </>
    );
  }
}

export default withStyles(useStyles)(MyPost)
