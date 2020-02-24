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



class MyPost extends Component {
  state = {
    studyboard: [],
    noticeboard: [],
    qnaboard: [],
    recruitboard: [],
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
        var mystudy = myPosts.data.studyboard;
        var mynotice = myPosts.data.noticeboard;
        var myqna = myPosts.data.qnaboard;
        var myrecruit = myPosts.data.recruitboard;
        
        this.setState({studyboard:mystudy});
        this.setState({noticeboard:mynotice});
        this.setState({qnaboard:myqna});
        this.setState({recruitboard:myrecruit});

      })
      .catch(err => console.log(err));
  }

  show(type){
    console.log("dsfsdf", type)
    let postlist = [];
    let board_type = "";
    switch(type){
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
      case "Recruit Board":
        postlist = this.state.recruitboard;
        board_type ="recruit";
        break;
      default:
        postlist=[];
        board_type ="";
        break;
    }
    console.log("list? : ",board_type)
    if(board_type === "study"){
      return(
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
    return(
      postlist.map(item => (
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
      <Paper elevation={10} className="MyPost">
        <>
          <h1>My Post</h1>
          <hr/>
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

export default withStyles(useStyles)(MyPost)
