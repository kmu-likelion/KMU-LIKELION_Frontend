import React from "react";
import { Route } from "react-router-dom";

import StudyMain from "./study/StudyMain";
import GroupDetail from "./study/GroupDetail";
import GroupNew from "./study/GroupNew";

function StudyRouter({ match }) {
  return (
    <>
      <Route exact path={match.path} component={StudyMain} />
      <Route exact path={`${match.path}/group/new`} component={GroupNew} />
      {/* <Route path={`${match.path}/detail/:id`} component={StudyList} id="number"/> */}

      {/* <Route
        path={`${match.path}/update/:id`}
        component={GroupUpdate}
        id="number"
      /> */}
      <Route exact path={`${match.path}/:group`} component={GroupDetail} />
      {/* <Route path={`${match.path}/:group/new`} component={StudyNew} />
      <Route
        path={`${match.path}/:group/detail/:id`}
        component={StudyDetail}
        id="number"
      />
      <Route
        path={`${match.path}/:group/update/:id`}
        component={StudyUpdate}
        id="number"
      /> */}
    </>
  );
}

export default StudyRouter;
