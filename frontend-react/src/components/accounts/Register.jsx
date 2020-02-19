import React from "react";
// import { authlogin } from "../../api/AuthAPI";
import Store from "../../store/store";
import { Link, Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// import CssBaseline from '@material-ui/core/CssBaseline';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
// import Box from '@material-ui/core/Box';


const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
});

class Register extends React.Component {
  static contextType = Store; //contextType으로 context 접근.

  state = {
    username: "",
    password: "",
    repassword: "",
    firstName: "",
    lastName: "",
    email: "",
    major: "",
    studentID: "",
    startNum : "",
    snsID : "",
    userImg: "",
    birth: "",
    phoneNum: ""
  };

  componentDidMount() {
    console.log("New ComponentDidMount");
  }

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.value);
  };

  checkPassword = event => {
    this.setState({[event.target.name]: event.target.value});
    if(this.state.password !== event.target.value) {
      event.target.error = true;
    }
  }

  doSignup = (id, name, img, token) => {
    window.sessionStorage.setItem("id", id);
    window.sessionStorage.setItem("username", name);
    window.sessionStorage.setItem("user_img", img);
    window.sessionStorage.setItem("token", token);
    console.log("token in session : ", window.sessionStorage.getItem("token"));
  };

  

  render() {
    const { classes } = this.props;

    if (this.context.logged) {
      return <Redirect to="/" />; //logged 상태가 true일 시, main page로 리다이렉트.
    }
    return (
      <Container maxWidth="xs" className="signup-container">
        <Paper className={classes.paper} elevation={0}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Welcome to KMU LikeLion!
        </Typography>
          <form onSubmit={this.handlingSubmit} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="username"
                  name="username"
                  value={this.state.username}
                  onChange={this.handlingChange}
                  required
                  fullWidth
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handlingChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="repassword"
                  label="Confirm Password"
                  type="password"
                  value={this.state.repassword}
                  onChange={this.handlingChange}
                  error = {this.state.password === this.state.repassword ? false : true}
                  helperText={this.state.password === this.state.repassword ? "" : "incorrect!"}
                />
              </Grid>
              <Grid item xs={12} >
              <hr/>
              <Typography component="h1" variant="h5" className={classes.center}>
                Additional Info
              </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    label="First Name"
                    value={this.state.firstName}
                    onChange={this.handlingChange}
                    // autoFocus
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={this.state.lastName}
                  onChange={this.handlingChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={this.state.email}
                  onChange={this.handlingChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Major"
                  name="major"
                  autoComplete="major"
                  value={this.state.major}
                  onChange={this.handlingChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Phone Number"
                  name="phoneNum"
                  autoComplete="phoneNum"
                  value={this.state.phoneNum}
                  onChange={this.handlingChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="SNS ID(Optional)"
                  name="snsID"
                  autoComplete="snsID"
                  value={this.state.snsID}
                  onChange={this.handlingChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>          
          </form>
          <Link to="/">Cancel</Link>
        </Paper>
      </Container>
    );
  }
}

export default withStyles(useStyles)(Register)