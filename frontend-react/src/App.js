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

import BoardRouter from "./components/board/BoardRouter";

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

  onLogout = () => {
    this.setState({
      logged: false
    });
    console.log("logout 되었습니다.");
    // const token = window.sessionStorage.getItem('token');
    window.sessionStorage.clear();
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
          <Route path="/study" component={BoardRouter} />
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
