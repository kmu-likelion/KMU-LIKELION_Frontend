// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import Store from "../store/Store";

// // @material-ui
// import { Menu, MenuItem, Avatar, IconButton } from "@material-ui/core";
// // import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

// // bootstrap
// import {
//   Nav,
//   Navbar,
//   NavDropdown,
//   Dropdown,
//   DropdownButton
// } from "react-bootstrap";

// export default function Header(props) {
//   const store = useContext(Store);
//   const username = window.sessionStorage.getItem("username");

//   const DropItem = ({ children, to }) => (
//     <Link to={to} className="link drop-link">
//       {children}
//     </Link>
//   );

//   return (
//     <div>
//       <Navbar
//         collapseOnSelect
//         expand="lg"
//         variant="dark"
//         style={{ background: "#f38014" }}
//       >
//         <Navbar.Brand as={Link} to="/">
//           KMU-LIKELION
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//         <Navbar.Collapse id="responsive-navbar-nav">
//           <Nav className="mr-auto">
//             <Nav.Link as={Link} to="/notice" href="/notice">
//               공지사항
//             </Nav.Link>
//             <Nav.Link as={Link} to="/session" href="/session">
//               세션
//             </Nav.Link>
//             <Nav.Link as={Link} to="/study" href="/study">
//               스터디그룹
//             </Nav.Link>
//             <Nav.Link as={Link} to="/qna" href="/qna">
//               QnA
//             </Nav.Link>
//             <Nav.Link as={Link} to="/career" href="/career">
//               커리어
//             </Nav.Link>
//           </Nav>
//           {store.logged ? (
//             <>
//               {window.sessionStorage.getItem("user_type") !== "3" ? (
//                 <Nav>
//                   <NavDropdown title="동아리관리" id="collasible-nav-dropdown">
//                     <NavDropdown.Item
//                       as={Link}
//                       to="/mentoring"
//                       href="/mentoring"
//                     >
//                       멘토링관리
//                     </NavDropdown.Item>
//                     <NavDropdown.Item
//                       as={Link}
//                       to="/admission/management"
//                       href="/admission/management"
//                     >
//                       입부관리
//                     </NavDropdown.Item>
//                     <NavDropdown.Item
//                       as={Link}
//                       to="/assignment/evaluation"
//                       href="/assignment/evaluation"
//                     >
//                       과제관리
//                     </NavDropdown.Item>
//                   </NavDropdown>
//                 </Nav>
//               ) : (
//                 <></>
//               )}
//               <Nav>
//                 <DropdownButton
//                   title={<Avatar alt="User" src="" />}
//                   id="dropdown-menu-align-right"
//                   noCaret
//                 >
//                   <Dropdown.Item
//                     as={Link}
//                     to={`/mypage/${username}`}
//                     href={`/mypage/${username}`}
//                   >
//                     마이페이지
//                   </Dropdown.Item>
//                   <Dropdown.Item
//                     as={Link}
//                     onClick={store.onLogout}
//                     to="/"
//                     href="/"
//                   >
//                     로그아웃
//                   </Dropdown.Item>
//                 </DropdownButton>
//                 {/* <PopupState variant="popover" popupId="popup-menu">
//                   {popupState => (
//                     <>
//                       <IconButton
//                         style={{ color: "white" }}
//                         {...bindTrigger(popupState)}
//                       >
//                         <Avatar alt="User" src="" />
//                       </IconButton>
//                       <Menu {...bindMenu(popupState)}>
//                         <MenuItem
//                           onClick={e => {
//                             popupState.close();
//                             store.onLogout();
//                           }}
//                         >
//                           <DropItem to="/">로그아웃</DropItem>
//                         </MenuItem>
//                         <MenuItem onClick={popupState.close}>
//                           <DropItem to={`/mypage/${username}`}>
//                             마이페이지
//                           </DropItem>
//                         </MenuItem>
//                       </Menu>
//                     </>
//                   )}
//                 </PopupState> */}
//               </Nav>
//             </>
//           ) : (
//             <Nav>
//               <NavDropdown title="지원하기" id="collasible-nav-dropdown">
//                 <NavDropdown.Item
//                   as={Link}
//                   to="/admission/apply"
//                   href="/admission/apply"
//                 >
//                   입부신청
//                 </NavDropdown.Item>
//                 <NavDropdown.Item
//                   as={Link}
//                   to="/admission/confirmApply"
//                   href="/admission/confirmApply"
//                 >
//                   지원내역
//                 </NavDropdown.Item>
//               </NavDropdown>

//               <Nav.Link as={Link} to="/login" href="/login">
//                 로그인
//               </Nav.Link>
//             </Nav>
//           )}
//         </Navbar.Collapse>
//       </Navbar>
//     </div>
//   );
// }
