import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";
import Store from "../store/Store";

// @material-ui
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Avatar from "@material-ui/core/Avatar";
// bootstrap
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

export default function Header(props) {
  const store = useContext(Store);
  const id = window.sessionStorage.getItem("id");
  // const user_img = window.sessionStorage.getItem("user_img");

  const DropItem = ({ children, to }) => (
    <Link to={to} className="link drop-link">
      {children}
    </Link>
  );

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        style={{ background: "#f38014" }}
      >
        <Navbar.Brand as={Link} to="/">
          KMU-LIKELION
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/notice">
              공지사항
            </Nav.Link>
            <Nav.Link as={Link} to="/lecture">
              강의
            </Nav.Link>
            <Nav.Link as={Link} to="/study">
              스터디그룹
            </Nav.Link>
            <Nav.Link as={Link} to="/qna">
              QnA
            </Nav.Link>
          </Nav>
          {store.logged ? (
            <>
              <Nav>
                <NavDropdown title="동아리관리" id="collasible-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/mentoring">
                    멘토링관리
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admission/management">
                    입부관리
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
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
                              로그아웃
                            </Button>
                          </DropItem>
                        </MenuItem>
                        <MenuItem onClick={popupState.close}>
                          <DropItem to={`/Mypage/${id}`}>마이페이지</DropItem>
                        </MenuItem>
                      </Menu>
                    </>
                  )}
                </PopupState>
              </Nav>
            </>
          ) : (
            <Nav>
              <NavDropdown title="지원하기" id="collasible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/admission/join">
                  입부신청
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admission/checkjoin">
                  지원내역
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/login">
                로그인
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
