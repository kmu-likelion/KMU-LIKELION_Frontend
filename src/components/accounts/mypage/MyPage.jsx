import React, { Component } from "react";
import { getUser, updateUser } from "../../../api/AuthAPI";
import { Grid, Container, Paper, withStyles } from "@material-ui/core";

import LeftProfileView from "./LeftProfileView";
import MyProfile from "./MyProfile";
import MyLike from "./MyLike";
import MyPost from "./MyPost";
import MyComment from "./MyComment";
import MyMentoring from "./MyMentoring";
import MyStudyGroup from "./MyStudyGroup";
import MySubmission from "./MySubmission";

const useStyles = theme => ({
  root: {
    padding: "2rem"
  },
  paper: {
    padding: "2rem",
    height: "100%"
  }
});

class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "Myprofile",
      userId: "",
      userInfo: {}
    };
  }
  componentDidMount() {
    this.getUser(this.props.match.params.username);
  }

  getUser = async username => {
    await getUser(username)
      .then(res => {
        console.log("User Data", res.data);
        this.setState({
          userInfo: res.data[0],
          userId: res.data[0].id
        });
      })
      .catch(err => console.log(err));
  };

  updateUser = async (id, data) => {
    await updateUser(id, data)
      .then(res => {
        console.log("UpdateUser Data", res.data);
      })
      .catch(err => console.log(err));
  };

  handlingSubmit = async (event, typename) => {
    event.preventDefault();
    this.setState({ type: typename });
  };

  render() {
    const { classes } = this.props;
    let renderComponent = "";

    switch (this.state.type) {
      case "Myprofile":
        renderComponent = (
          <MyProfile
            username={this.props.match.params.username}
            updateUser={this.updateUser}
            id={this.state.userId}
          />
        );
        break;
      case "MySubmission":
        renderComponent = <MySubmission />;
        break;

      case "MyLike":
        renderComponent = <MyLike />;
        break;

      case "MyPost":
        renderComponent = <MyPost id={this.state.userId} />;
        break;

      case "MyComment":
        renderComponent = <MyComment id={this.state.userId} />;
        break;

      case "MyMentoring":
        renderComponent = <MyMentoring id={this.state.userId} />;
        break;

      case "MyStudyGroup":
        renderComponent = <MyStudyGroup id={this.state.userId} />;
        break;

      default:
        renderComponent = "";
        break;
    }

    return (
      <Container maxWidth="lg" className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <LeftProfileView
              username={this.state.userInfo.username}
              sns_id={this.state.userInfo.sns_id}
              user_img={this.state.userInfo.img}
              handlingSubmit={this.handlingSubmit}
              userId={this.state.userId}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper elevation={10} className={classes.paper}>
              {renderComponent}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(useStyles)(MyPage);
