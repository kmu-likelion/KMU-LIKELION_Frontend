import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/main/Main";
import NoticeList from "./components/board/NoticeList";

export default () => (
  <Router>
      <Header />
      <Route exact path="/" component={Main} />
      <Route path="/notice" component={NoticeList} />
      <Footer />
  </Router>
)
