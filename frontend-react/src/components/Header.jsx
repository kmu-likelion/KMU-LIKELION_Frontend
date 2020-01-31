import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import { red } from '@material-ui/core/colors';

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
    return (
        <div className="header">
            <AppBar position="static" style={{background: '#f38014'}}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        KMU LIKELION
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                    </Typography>
                    
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
