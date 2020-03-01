import BoardContainer from "../components/board/container/BoardContainer";
import PostDetailContainer from "../components/board/container/PostDetailContainer";
import PostUpdateContainer from "../components/board/container/PostUpdateContainer";
import React from "react";
import { Route } from "react-router-dom";
function BoardRouter({ match }) {
  return (
    <>
      <Route exact path={match.path} component={BoardContainer} />
      <Route path={`${match.path}/new`} component={PostUpdateContainer} />
      <Route
        path={`${match.path}/detail/:id`}
        component={PostDetailContainer}
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
