import React from "react";
import { Route } from "react-router-dom";
import JoinForm from "../components/admission/JoinForm";
import CheckJoin from "../components/admission/CheckJoin";
import ManageJoin from "../components/admission/ManageJoin";
import ManageJoinDetail from "../components/admission/ManageJoinDetail";

function AdmissionRouter({ match }) {
  return (
    <>
      <Route path={`${match.path}/join`} component={JoinForm} />
      <Route path={`${match.path}/checkjoin`} component={CheckJoin} />
      <Route exact path={`${match.path}/management`} component={ManageJoin} />
      <Route
        path={`${match.path}/management/:id`}
        component={ManageJoinDetail}
      />
    </>
  );
}

export default AdmissionRouter;
