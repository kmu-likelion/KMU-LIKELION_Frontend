import React from 'react';
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

// @material-ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
}));



export default function Header() {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    //새로고침 안되게 하는코든데 작동이 안되누..
    // const preventDefault = event => event.preventDefault();

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const NavItem = ({children, to}) => (
        <Link to={to} className="nav-link">
            {children}
        </Link>        
    );
    const DropItem = ({children, to}) => (
        <Link to={to} className="drop-link">
            {children}
        </Link>        
    );
    return (
        <div className="header">
            <AppBar position="static" style={{background: '#f38014'}}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <NavItem to={'/'}>KMU LIKELION</NavItem>
                    </Typography>
                    <Typography variant="h6" className={classes.title}>

                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{color: 'white'}}>
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
                                <DropItem to={'/notice/'}>Notice</DropItem>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>Study</MenuItem>
                            <MenuItem onClick={handleClose}>QnA</MenuItem>
                            <MenuItem onClick={handleClose}>Recuit</MenuItem>
                        </Menu>
                
                    </Typography>

                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
