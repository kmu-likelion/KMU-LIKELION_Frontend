import React from "react";
import { Route } from "react-router-dom";

import JoinForm from "./JoinForm";

function AdmissionRouter({ match }) {
  return (
    <>
      {/* <Route exact path={match.path} component={listComponent} /> */}
      <Route path={`${match.path}/join`} component={JoinForm} />
      {/* <Route
        path={`${match.path}/detail/:id`}
        component={detailComponent}
        id="number"
      />
      <Route
        path={`${match.path}/update/:id`}
        component={updateComponent}
        id="number"
      /> */}
    </>
  );
}

export default AdmissionRouter;
