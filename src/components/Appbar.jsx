import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Store from "../store/Store";

import DropMenu from "./DropMenu";
import {
  AppBar,
  Toolbar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
  Grid,
  SwipeableDrawer,
  IconButton,
  Button
} from "@material-ui/core";

import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import GroupIcon from "@material-ui/icons/Group";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";

const useStyle = theme => ({
  appbar: {
    background: "#f38014"
  },
  list: {
    width: 200
  },
  padding: {
    // paddingRight: 30,
    // paddingLeft: 30,
    cursor: "pointer"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    // flexGrow: 1
    marginRight: 10
  }
});

class Appbar extends Component {
  static contextType = Store;
  constructor(props) {
    super(props);
    this.state = {
      drawerActivate: false,
      drawer: false,
      AnchorEl: null,
      open: false
    };
  }

  componentDidMount() {
    if (window.innerWidth <= 600) {
      this.setState({ drawerActivate: true });
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth <= 600) {
        this.setState({ drawerActivate: true });
      } else {
        this.setState({ drawerActivate: false });
      }
    });
  }

  handleMenu = event => {
    this.setState({
      [event.target.name]: event.currentTarget,
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      AnchorEl: null,
      open: false
    });
  };

  DropItem = (children, to) => {
    return (
      <Link to={to} className="link drop-link">
        {children}
      </Link>
    );
  };

  mobileListItem = (to, item, icon) => {
    return (
      <ListItem component={Link} to={to} key={item} button>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={item} />
      </ListItem>
    );
  };

  desktopItem = (to, item) => {
    return (
      <Button
        color="inherit"
        className={this.props.classes.padding}
        size="large"
        component={Link}
        to={to}
        style={{
          textDecoration: "inherit",
          color: "inherit",
          flexGrow: 1
        }}
      >
        {item}
      </Button>
    );
  };

  //mobile Screens
  createDrawer = () => {
    const { classes } = this.props;
    return (
      <div>
        <AppBar className={classes.appbar} position="static">
          <Toolbar>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => {
                  this.setState({ drawer: true });
                }}
              >
                <MenuIcon />
              </IconButton>

              <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
                component={Link}
                to="/"
                style={{
                  textDecoration: "inherit",
                  color: "inherit"
                }}
              >
                LikeLion
              </Typography>

              {this.context.logged ? (
                <>
                  <DropMenu
                    type="icon"
                    header={<AccountCircle />}
                    items={[
                      {
                        children: "마이페이지",
                        to: `/mypage/${window.sessionStorage.getItem(
                          "username"
                        )}`
                      },
                      {
                        children: "logout"
                      }
                    ]}
                  />
                </>
              ) : (
                <>
                  <Button
                    color="inherit"
                    size="large"
                    component={Link}
                    to="/login"
                    style={{
                      textDecoration: "inherit",
                      color: "inherit"
                    }}
                  >
                    로그인
                  </Button>
                </>
              )}
            </Grid>
          </Toolbar>
        </AppBar>

        <SwipeableDrawer
          open={this.state.drawer}
          onClose={() => {
            this.setState({ drawer: false });
          }}
          onOpen={() => {
            this.setState({ drawer: true });
          }}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={() => {
              this.setState({ drawer: false });
            }}
            onKeyDown={() => {
              this.setState({ drawer: false });
            }}
          >
            <List className={classes.list}>
              {this.mobileListItem("/notice", "공지사항", <AnnouncementIcon />)}
              {this.mobileListItem("/session", "세션", <LaptopMacIcon />)}
              {this.mobileListItem("/study", "스터디그룹", <GroupIcon />)}
              {this.mobileListItem("/qna", "QnA", <QuestionAnswerIcon />)}
              {this.mobileListItem("/career", "커리어", <GroupIcon />)}
              <Divider />
              {this.context.logged ? (
                <>
                  {window.sessionStorage.getItem("user_type") !== "3" ? (
                    <>
                      {this.mobileListItem(
                        "/mentoring",
                        "멘토링관리",
                        <GroupIcon />
                      )}
                      {this.mobileListItem(
                        "/admission/management",
                        "입부관리",
                        <GroupIcon />
                      )}
                      {this.mobileListItem(
                        "/assignment/evaluation",
                        "과제관리",
                        <GroupIcon />
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <>
                  {this.mobileListItem(
                    "/admission/apply",
                    "입부신청",
                    <GroupIcon />
                  )}
                  {this.mobileListItem(
                    "/admission/confirmApply",
                    "지원내역",
                    <GroupIcon />
                  )}
                </>
              )}

              <Divider />
              {this.mobileListItem("/about", "About", <AnnouncementIcon />)}
            </List>
          </div>
        </SwipeableDrawer>
      </div>
    );
  };

  /* Desktop Screens */
  destroyDrawer = () => {
    const { classes } = this.props;
    return (
      <AppBar className={classes.appbar} position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Typography
              variant="h6"
              color="inherit"
              className={classes.title}
              component={Link}
              to="/"
              style={{
                textDecoration: "inherit",
                color: "inherit"
              }}
            >
              KMU-LIKELION
            </Typography>
            {this.desktopItem("/notice", "공지사항")}
            {this.desktopItem("/session", "세션")}
            {this.desktopItem("/study", "스터디")}
            {this.desktopItem("/qna", "QnA")}
            {this.desktopItem("/career", "커리어")}
            {this.context.logged ? (
              <>
                {window.sessionStorage.getItem("user_type") !== "3" ? (
                  <DropMenu
                    header="관리자메뉴"
                    items={[
                      {
                        children: "과제관리",
                        to: "/assignment/evaluation"
                      },
                      {
                        children: "멘토링관리",
                        to: "/mentoring"
                      },
                      {
                        children: "입부관리",
                        to: "/admission/management"
                      }
                    ]}
                  />
                ) : (
                  <></>
                )}
                <DropMenu
                  type="icon"
                  header={<AccountCircle />}
                  items={[
                    {
                      children: "마이페이지",
                      to: `/mypage/${window.sessionStorage.getItem("username")}`
                    },
                    {
                      children: "logout"
                    }
                  ]}
                />
              </>
            ) : (
              <>
                <DropMenu
                  header="지원하기"
                  items={[
                    {
                      children: "입부신청",
                      to: "/admission/apply"
                    },
                    {
                      children: "지원내역",
                      to: "/admission/confirmApply"
                    }
                  ]}
                />

                <Button
                  color="inherit"
                  size="large"
                  component={Link}
                  to="/login"
                  style={{
                    textDecoration: "inherit",
                    color: "inherit"
                  }}
                >
                  로그인
                </Button>
              </>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    );
  };

  render() {
    return (
      <div>
        {this.state.drawerActivate ? this.createDrawer() : this.destroyDrawer()}
      </div>
    );
  }
}

Appbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyle)(Appbar);
