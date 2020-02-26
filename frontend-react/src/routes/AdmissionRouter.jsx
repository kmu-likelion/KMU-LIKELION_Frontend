import React from "react";
import { Route } from "react-router-dom";
import JoinForm from "../components/admission/application/JoinForm";
import ConfirmContainer from "../components/admission/confirmation/ConfirmContainer";
import ManageJoin from "../components/admission/management/ManageJoin";
import ManageJoinDetail from "../components/admission/management/ManageJoinDetail";
import AdmissionStore from "../store/AdmissionStore";

// function AdmissionRouter({ match }) {

//   return (
//     <AdmissionStore.Provider value={globalState}>
//       <Route path={`${match.path}/join`} component={JoinForm} />
//       <Route path={`${match.path}/checkjoin`} component={ConfirmContainer} />
//       <Route exact path={`${match.path}/management`} component={ManageJoin} />
//       <Route
//         path={`${match.path}/management/:id`}
//         component={ManageJoinDetail}
//       />
//     </AdmissionStore.Provider>
//   );
// }

// export default AdmissionRouter;

class AdmissionRouter extends React.Component {
  state = {
    isAccessed: false,
    applicationId: "",
    ACCESS_DENIED: false,
    ERROR_MSG: ""
  };

  updateValue = (key, val) => {
    this.setState({ [key]: val });
  };

  render() {
    return (
      <AdmissionStore.Provider
        value={{ state: this.state, updateValue: this.updateValue }}
      >
        <Route path={`${this.props.match.path}/apply`} component={JoinForm} />
        <Route
          path={`${this.props.match.path}/confirmApply`}
          component={ConfirmContainer}
        />
        <Route
          exact
          path={`${this.props.match.path}/management`}
          component={ManageJoin}
        />
        <Route
          path={`${this.props.match.path}/management/:id`}
          component={ManageJoinDetail}
        />
      </AdmissionStore.Provider>
    );
  }
}

export default AdmissionRouter;
