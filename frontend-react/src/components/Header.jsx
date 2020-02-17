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
import Avatar from "@material-ui/core/Avatar";

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
  const id = window.sessionStorage.getItem("id");
  // const user_img = window.sessionStorage.getItem("user_img");

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
              <PopupState variant="popover" popupId="demo-popup-menu">
                {popupState => (
                  <>
                    <Button
                      style={{ color: "white" }}
                      {...bindTrigger(popupState)}
                    >
                      Admin-Menu
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem onClick={popupState.close}>
                        <DropItem to={"/mentoring"}>멘토링관리</DropItem>
                      </MenuItem>
                      <MenuItem onClick={popupState.close}>
                        <DropItem to={"/admission/management"}>
                          입부관리
                        </DropItem>
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </PopupState>

              <PopupState variant="popover" popupId="popup-menu">
                {popupState => (
                  <>
                    <Button
                      style={{ color: "white" }}
                      {...bindTrigger(popupState)}
                    >
                      <Avatar alt="User" src="" />
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem onClick={popupState.close}>
                        <DropItem to={"/"}>
                          <Button color="inherit" onClick={store.onLogout}>
                            Logout
                          </Button>
                        </DropItem>
                      </MenuItem>
                      <MenuItem onClick={popupState.close}>
                        <DropItem to={`/Mypage/${id}`}>Mypage</DropItem>
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </PopupState>
            </>
          ) : (
            <>
              <PopupState variant="popover" popupId="demo-popup-menu">
                {popupState => (
                  <>
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
                    </Menu>
                  </>
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
