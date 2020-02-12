import React from "react";
import { Route } from "react-router-dom";

import JoinForm from "./JoinForm";
import CheckJoin from "./CheckJoin";
import ManageJoin from "./ManageJoin";

function AdmissionRouter({ match }) {
  return (
    <>
      <Route path={`${match.path}/join`} component={JoinForm} />
      <Route path={`${match.path}/checkjoin`} component={CheckJoin} />
      <Route path={`${match.path}/management`} component={ManageJoin} />
    </>
  );
}

export default AdmissionRouter;
