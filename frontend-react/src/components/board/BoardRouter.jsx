import NoticeList from "./notice/NoticeList";
import NoticeDetail from "./notice/NoticeDetail";
import NoticeNew from "./notice/NoticeNew";
import NoticeUpdate from "./notice/NoticeUpdate";

import QnANew from "./qna/QnANew";
import QnAList from "./qna/QnAList";
import QnADetail from "./qna/QnADetail";
import QnAUpdate from "./qna/QnAUpdate";

import RecruitNew from "./recruit/RecruitNew";
import RecruitList from "./recruit/RecruitList";
import RecruitDetail from "./recruit/RecruitDetail";
import RecruitUpdate from "./recruit/RecruitUpdate";

import React from "react";
import { Route } from "react-router-dom";

function BoardRouter({ match }) {
  var listComponent, newComponent, detailComponent, updateComponent;

  switch (match.path) {
    case "/notice":
      listComponent = NoticeList;
      newComponent = NoticeNew;
      detailComponent = NoticeDetail;
      updateComponent = NoticeUpdate;
      break;

    case "/QnA":
      listComponent = QnAList;
      newComponent = QnANew;
      detailComponent = QnADetail;
      updateComponent = QnAUpdate;
      break;

    case "/recruit":
      listComponent = RecruitList;
      newComponent = RecruitNew;
      detailComponent = RecruitDetail;
      updateComponent = RecruitUpdate;
      break;

    default:
      listComponent = "";
      newComponent = "";
      detailComponent = "";
      updateComponent = "";
      break;
  }

  return (
    <>
      <Route exact path={match.path} component={listComponent} />
      <Route path={`${match.path}/new`} component={newComponent} />
      <Route
        path={`${match.path}/detail/:id`}
        component={detailComponent}
        id="number"
      />
      <Route
        path={`${match.path}/update/:id`}
        component={updateComponent}
        id="number"
      />
    </>
  );
}

export default BoardRouter;
