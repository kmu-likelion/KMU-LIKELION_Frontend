import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import { authlogin } from "../../api/AuthAPI";
import Store from "../../store/Store";

import {
  Container,
  Paper,
  Avatar,
  Button,
  Grid,
  TextField,
  Typography,
  withStyles
} from "@material-ui/core";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  button: {
    margin: theme.spacing(0, 0, 3)
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});

class Login extends Component {
  static contextType = Store; //contextType으로 context 접근.

  state = {
    username: "",
    password: ""
  };

  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handlingSubmit = async event => {
    event.preventDefault();

    await authlogin({
      username: this.state.username,
      password: this.state.password
    })
      .then(result => {
        console.log("로그인 성공!", result);
        this.doSignup(
          result.data.user.id,
          result.data.user.username,
          result.data.user.img,
          result.data.user.user_type,
          result.data.user.start_number,
          result.data.token
        );
        this.context.onLogin();
      })
      .catch(err => {
        console.log(err);
        alert("잘못된 아이디 혹은 비밀번호입니다!");
      });

    this.setState({ username: "", password: "" });
  };

  doSignup = (id, name, img, user_type, cardinal_num, token) => {
    window.sessionStorage.setItem("id", id);
    window.sessionStorage.setItem("username", name);
    window.sessionStorage.setItem("user_img", img);
    window.sessionStorage.setItem("user_type", user_type);
    window.sessionStorage.setItem("cardinal_number", cardinal_num);
    window.sessionStorage.setItem("token", token);
  };

  render() {
    const { classes } = this.props;

    if (this.context.logged) {
      alert("환영합니다!");
      return <Redirect to="/" />; //logged 상태가 true일 시, main page로 리다이렉트.
    }
    return (
      <Container maxWidth="xs" className="signup-container">
        <Paper className={classes.paper} elevation={0}>
          <Avatar className={classes.avatar}>
            <PersonOutlineOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.button}
              component={Link}
              to={`admission/apply/`}
            >
              Join us
            </Button>
          </form>

          <Link to="/">Home</Link>
          <br />
        </Paper>
      </Container>
    );
  }
}

export default withStyles(useStyles)(Login);
