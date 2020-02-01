import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/main/Main";
import NoticeList from "./components/board/NoticeList";
import NoticeDetail from "./components/board/NoticeDetail";
import NoticeNew from "./components/board/NoticeNew";

export default () => (
  <Router>
      <Header />
      <Route exact path="/" component={Main} />
      <Route exact path="/notice" component={NoticeList} />
        <Route exact path="/notice/new" component={NoticeNew} />
      <Route path="/notice/detail/:id" component={NoticeDetail} id="number"/>
      <Footer />
  </Router>
)
