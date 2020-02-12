import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Store from "../Store/store";
// @material-ui
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

export default function Header(props) {
  const store = useContext(Store);
  const classes = useStyles();
  // const { logged, onLogout } = props;
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const id = window.sessionStorage.getItem("id");

  // const handleClick = event => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const NavItem = ({ children, to }) => (
    <Link to={to} className="link nav-link">
      {children}
    </Link>
  );
  const DropItem = ({ children, to }) => (
    <Link to={to} className="link drop-link">
      {children}
    </Link>
  );

  return (
    <div className="header">
      <AppBar position="static" style={{ background: "#f38014" }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <NavItem to={"/"}>KMU LIKELION</NavItem>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            {/* <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              style={{ color: "white" }}
            >
              Board
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <DropItem to={"/notice"}>Notice</DropItem>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <DropItem to={"/study"}>Study</DropItem>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <DropItem to={"/QnA"}>QnA</DropItem>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <DropItem to={"/recruit"}>Recruit</DropItem>
              </MenuItem>
            </Menu> */}
            <PopupState variant="popover" popupId="popup-menu">
              {popupState => (
                <>
                  <Button
                    // variant="contained"
                    style={{ color: "white" }}
                    {...bindTrigger(popupState)}
                  >
                    BOARD
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={popupState.close}>
                      <DropItem to={"/notice"}>Notice</DropItem>
                    </MenuItem>
                    <MenuItem onClick={popupState.close}>
                      <DropItem to={"/study"}>Study</DropItem>
                    </MenuItem>
                    <MenuItem onClick={popupState.close}>
                      <DropItem to={"/QnA"}>QnA</DropItem>
                    </MenuItem>
                    <MenuItem onClick={popupState.close}>
                      <DropItem to={"/recruit"}>Recruit</DropItem>
                    </MenuItem>
                  </Menu>
                </>
              )}
            </PopupState>
          </Typography>
          {store.logged ? (
            <>
              <Button color="inherit">
                <Link
                  to={"/"}
                  onClick={store.onLogout}
                  className="auth-link link"
                >
                  Logout
                </Link>
              </Button>
              <Button color="inherit">
                <Link to={`/Mypage/${id}`} className="auth-link link">
                  Mypage
                </Link>
              </Button>
            </>
          ) : (
            <>
              <PopupState variant="popover" popupId="demo-popup-menu">
                {popupState => (
                  <React.Fragment>
                    <Button
                      // variant="contained"

                      style={{ color: "white" }}
                      {...bindTrigger(popupState)}
                    >
                      Admission
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem onClick={popupState.close}>
                        <DropItem to={"/admission/join"}>지원하기</DropItem>
                      </MenuItem>
                      <MenuItem onClick={popupState.close}>
                        <DropItem to={"/admission/checkjoin"}>
                          지원내역
                        </DropItem>
                      </MenuItem>
                      <MenuItem onClick={popupState.close}>
                        <DropItem to={"/admission/management"}>
                          지원관리
                        </DropItem>
                      </MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
              <Button color="inherit">
                <Link to={"/login"} className="auth-link link">
                  Login
                </Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
