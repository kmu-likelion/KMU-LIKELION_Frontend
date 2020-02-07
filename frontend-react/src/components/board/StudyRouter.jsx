import React from "react";
import { Route } from "react-router-dom";

import StudyNew from "./study/StudyNew";
import StudyList from "./study/StudyList";
import StudyDetail from "./study/StudyDetail";
import StudyUpdate from "./study/StudyUpdate";

import GroupNew from "./studyGroup/GroupNew";
import GroupList from "./studyGroup/GroupList";
// import StudyDetail from "./study/StudyDetail";
// import StudyUpdate from "./study/StudyUpdate";

function StudyRouter({ match }) {
  return (
    <>
      <Route exact path={match.path} component={GroupList} />
      <Route path={`${match.path}/new`} component={GroupNew} />
      {/* <Route
        path={`${match.path}/detail/:id`}
        component={GroupDetail}
        id="number"
      />
      <Route
        path={`${match.path}/update/:id`}
        component={GroupUpdate}
        id="number"
      /> */}
      <Route exact path={`${match.path}/:group`} component={StudyList} />
      <Route path={`${match.path}/:group/new`} component={StudyNew} />
      <Route
        path={`${match.path}/:group/detail/:id`}
        component={StudyDetail}
        id="number"
      />
      <Route
        path={`${match.path}/:group/update/:id`}
        component={StudyUpdate}
        id="number"
      />
    </>
  );
}

export default StudyRouter;
