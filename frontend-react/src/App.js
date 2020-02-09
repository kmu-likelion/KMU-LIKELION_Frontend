import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/main/Main";

import Login from "./components/accounts/LoginContainer";
import Mypage from "./components/accounts/Mypage";
import Store from "./Store/store";

import api_auth from "./api/api_auth";
import { tokenConfig } from "./action/auth";

import BoardRouter from "./components/board/BoardRouter";
import StudyRouter from "./components/board/StudyRouter";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      onLogin: this.onLogin,
      onLogout: this.onLogout
    };
  }

  onLogin = () => {
    this.setState({
      logged: true
    });
    console.log("login 되었습니다.");
  };

  onLogout = async () => {
    if (this.state.logged) {
      // console.log(tokenConfig());
      const token = tokenConfig();
      // const t = window.sessionStorage.getItem("token");
      // const token = `Authorization:Token ${t}`;
      await api_auth
        .authlogout(token)
        .then(() => {
          this.setState({
            logged: false
          });
          window.sessionStorage.clear();
          console.log("logout 되었습니다.");
          // const token = window.sessionStorage.getItem('token');
        })
        .catch(err => {
          console.log(err);
          this.setState({
            logged: false
          });
          window.sessionStorage.clear();
        });
      // this.setState({
      //   logged: false
      // });
      // window.sessionStorage.clear();
    }
  };

  componentDidMount() {
    // const name = window.sessionStorage.getItem("name");
    const id = window.sessionStorage.getItem("id");

    if (id) {
      this.onLogin();
    } else {
      this.onLogout();
    }
  }

  render() {
    const { logged, onLogout } = this.state;

    return (
      <Store.Provider value={this.state}>
        <Router>
          <Header logged={logged} onLogout={onLogout} />
          <Route exact path="/" component={Main} />

          <Route path="/notice" component={BoardRouter} />
          <Route path="/QnA" component={BoardRouter} />
          <Route path="/study" component={StudyRouter} />
          <Route path="/recruit" component={BoardRouter} />

          <Route path="/login" component={Login} />
          <Route path="/mypage/:id" component={Mypage} id="number" />
          <Footer />
        </Router>
      </Store.Provider>
    );
  }
}

export default App;
