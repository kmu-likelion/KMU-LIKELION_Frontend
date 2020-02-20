import NoticeList from "../components/board/notice/NoticeList";
import NoticeDetail from "../components/board/notice/NoticeDetail";
import NoticeNew from "../components/board/notice/NoticeNew";
import NoticeUpdate from "../components/board/notice/NoticeUpdate";

import QnANew from "../components/board/qna/QnANew";
import QnAList from "../components/board/qna/QnAList";
import QnADetail from "../components/board/qna/QnADetail";
import QnAUpdate from "../components/board/qna/QnAUpdate";

// import RecruitNew from "./recruit/RecruitNew";
// import RecruitList from "./recruit/RecruitList";
// import RecruitDetail from "./recruit/RecruitDetail";
// import RecruitUpdate from "./recruit/RecruitUpdate";

import BoardContainer from "../components/board/common/BoardContainer";
import PostDetail from "../components/board/common/PostDetail";
import PostNew from "../components/board/common/PostNew";
import PostUpdateContainer from "../components/board/common/PostUpdateContainer";
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

    // case "/recruit":
    //   listComponent = RecruitList;
    //   newComponent = RecruitNew;
    //   detailComponent = RecruitDetail;
    //   updateComponent = RecruitUpdate;
    //   break;

    default:
      listComponent = "";
      newComponent = "";
      detailComponent = "";
      updateComponent = "";
      break;
  }

  return (
    <>
      <Route exact path={match.path} component={BoardContainer} />
      <Route path={`${match.path}/new`} component={PostUpdateContainer} />
      <Route
        path={`${match.path}/detail/:id`}
        component={PostDetail}
        id="number"
      />
      <Route
        path={`${match.path}/update/:id`}
        component={PostUpdateContainer}
        id="number"
      />
    </>
  );
}

export default BoardRouter;
