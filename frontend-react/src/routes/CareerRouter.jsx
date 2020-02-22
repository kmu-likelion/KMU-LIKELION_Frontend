import CareerList from "../components/board/career/CareerList";
import CareerDetail from "../components/board/career/CareerDetail";
import CareerNew from "../components/board/career/CareerNew";
import CareerUpdate from "../components/board/career/CareerUpdate";

import React from "react";
import { Route } from "react-router-dom";

const CareerRouter = ({ match }) => {

  return (
    <>
      <Route exact path={match.path} component={CareerList} />
      <Route path={`${match.path}/new`} component={CareerNew} />
      <Route
        path={`${match.path}/detail/:id`}
        component={CareerDetail}
        id="number"
      />
      <Route
        path={`${match.path}/update/:id`}
        component={CareerUpdate}
        id="number"
      />
    </>
  );
}

export default CareerRouter;
