import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/main/Main";
import NoticeList from "./components/board/NoticeList";
import NoticeDetail from "./components/board/NoticeDetail";
import NoticeNew from "./components/board/NoticeNew";
import NoticeUpdate from "./components/board/NoticeUpdate";
import Login from "./components/accounts/LoginContainer";
import Mypage from "./components/accounts/Mypage";
import Store from "./Store/store";

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
          <Route exact path="/notice" component={NoticeList} />
          <Route exact path="/notice/new" component={NoticeNew} />
          <Route
            path="/notice/detail/:id"
            component={NoticeDetail}
            id="number"
          />
          <Route
            path="/notice/update/:id"
            component={NoticeUpdate}
            id="number"
          />
          <Route path="/login" component={Login} />
          <Route path="/mypage/:username" component={Mypage} />>
          <Footer />
        </Router>
      </Store.Provider>
    );
  }
}

export default App;
