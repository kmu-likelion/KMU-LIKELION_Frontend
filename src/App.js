import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Appbar from "./components/Appbar";
import Footer from "./components/Footer";
import Main from "./components/main/Main";
import Login from "./components/accounts/Login";
import Mypage from "./components/accounts/mypage/MyPage";

import Store from "./store/Store";
import { authlogout, validateToken } from "./api/AuthAPI";

import MentoringContainer from "./components/mentoring/MentoringContainer";

import Splitting from "./splitting";

export const BoardRouter = Splitting(() => import("./routes/BoardRouter"));
export const StudyRouter = Splitting(() => import("./routes/StudyRouter"));
export const AdmissionRouter = Splitting(() =>
  import("./routes/AdmissionRouter")
);
export const AssignmentRouter = Splitting(() =>
  import("./routes/AssignmentRouter")
);

// import NotFoundPage from "./components/NotFoundPage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      onLogin: this.onLogin,
      onLogout: this.onLogout
    };
  }

  checkValidity = async token => {
    if (token) {
      await validateToken(token)
        .then(res => {
          if (!res.detail) {
            this.onLogin();
          } else {
            this.onLogout(); //session에 저장된 토큰이 유효하지 않다면 로그아웃.
            console.log(res.detail);
            alert(`Token이 유효하지 않습니다 [${res.detail}]`);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.onLogout();
    }
  };

  onLogin = () => {
    this.setState({
      logged: true
    });
  };

  onLogout = async () => {
    if (this.state.logged) {
      await authlogout()
        .then(() => {
          this.setState({
            logged: false
          });
          window.sessionStorage.clear();
          console.log("logout.");
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  componentDidMount() {
    this.checkValidity(window.sessionStorage.getItem("token"));
  }

  render() {
    return (
      <Store.Provider value={this.state}>
        <Router>
          <Appbar />
          <Route exact path="/" component={Main} />

          <Route path="/career" component={BoardRouter} />
          <Route path="/notice" component={BoardRouter} />
          <Route path="/qna" component={BoardRouter} />
          <Route path="/session" component={BoardRouter} />
          <Route path="/study" component={StudyRouter} />

          <Route path="/admission" component={AdmissionRouter} />
          <Route path="/mentoring" component={MentoringContainer} />
          <Route path="/assignment" component={AssignmentRouter} />

          <Route path="/login" component={Login} />

          <Route path="/mypage/:username" component={Mypage} />
          {/* <Route path="/404" component={NotFoundPage} />
          {window.location.pathname !== "/" ? (
            <Redirect to="/404" />
          ) : (
            <></>
          )} */}

          <Footer />
        </Router>
      </Store.Provider>
    );
  }
}

export default App;
