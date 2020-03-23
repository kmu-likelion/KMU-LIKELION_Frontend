import React from "react";
import { Link } from "react-router-dom";
import Store from "../store/Store";
import { Menu, MenuItem, IconButton, Button } from "@material-ui/core";
// import Menu, { MenuItem } from "@material-ui/Menu";
// import IconButton from "@material-ui/IconButton";
// import {} from "@material-ui/styles";

class DropMenu extends React.Component {
  static contextType = Store;
  state = {
    anchorEl: null
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  DropItem = (children, to, index) => {
    return (
      <MenuItem key={index} onClick={this.handleClose}>
        <Link to={to} className="link drop-link">
          {children}
        </Link>
      </MenuItem>
    );
  };

  logoutItem = index => {
    return (
      <MenuItem
        key={index}
        onClick={e => {
          this.context.onLogout();
          this.handleClose();
        }}
      >
        <Link to="/" className="link drop-link">
          로그아웃
        </Link>
      </MenuItem>
    );
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const Wrapper = this.props.header;
    const listItems = this.props.items.map((item, index) => {
      if (item.children === "logout") {
        return this.logoutItem(index);
      } else {
        return this.DropItem(item.children, item.to, index);
      }
    });

    return (
      <div>
        {this.props.type === "icon" ? (
          <IconButton
            aria-owns={open ? "menu-appbar" : null}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit"
          >
            {Wrapper}
          </IconButton>
        ) : (
          <Button
            aria-owns={open ? "menu-appbar" : null}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit"
            size="large"
          >
            {Wrapper}
          </Button>
        )}

        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={open}
          onClose={this.handleClose}
        >
          {listItems}
        </Menu>
      </div>
    );
  }
}

export default DropMenu;
