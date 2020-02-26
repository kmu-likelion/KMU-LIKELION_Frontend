import React from "react";
import { Route } from "react-router-dom";

import StudyMain from "../components/board/study/StudyMain";
import GroupDetail from "../components/board/study/GroupDetail";
import GroupNew from "../components/board/study/GroupNew";
import GroupUpdate from "../components/board/study/GroupUpdate";
import GroupMemberManage from "../components/board/study/GroupMemberManage";
import PostNew from "../components/board/study/PostNew";
import PostDetail from "../components/board/study/PostDetail";
import PostUpdate from "../components/board/study/PostUpdate";

function StudyRouter({ match }) {
  return (
    <>
      <Route exact path={match.path} component={StudyMain} />
      <Route exact path={`${match.path}/group/new`} component={GroupNew} />
      <Route exact path={`${match.path}/:group/update`} component={GroupUpdate} />
      <Route exact path={`${match.path}/:group`} component={GroupDetail} />
      <Route exact path={`${match.path}/:group/member`} component={GroupMemberManage} />

      <Route path={`${match.path}/:group/post/new`} component={PostNew} />
      <Route
        path={`${match.path}/:group/detail/:id`}
        component={PostDetail}
        id="number"
      />
      <Route
        path={`${match.path}/:group/update/:id`}
        component={PostUpdate}
        id="number"
      />
    </>
  );
}

export default StudyRouter;
