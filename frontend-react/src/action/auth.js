// import axios from "axios";
// import {
//   USER_LOADING,
//   USER_LOADED,
//   AUTH_ERROR,
//   LOGIN_SUCCESS,
//   LOGIN_FAIL
// } from "./types";

// LOAD USER
// export const loadUser = () => async (dispatch, getState) => {
//   dispatch({ type: USER_LOADING });

//   try {
//     const res = await axios.get("/api/auth/user", tokenConfig(getState));
//     dispatch({
//       type: USER_LOADED,
//       payload: res.data
//     });
//   } catch (err) {
//     dispatch({
//       type: AUTH_ERROR
//     });
//   }
// };

// // LOGIN USER
// export const login = ({ username, password }) => async dispatch => {
//   // Headers
//   const config = {
//     headers: {
//       "Content-Type": "application/json"
//     }
//   };

//   // Request Body
//   const body = JSON.stringify({ username, password });

//   try {
//     const res = await axios.post("/api/auth/login", body, config);
//     dispatch({
//       type: LOGIN_SUCCESS,
//       payload: res.data
//     });
//   } catch (err) {
//     dispatch({
//       type: LOGIN_FAIL
//     });
//     dispatch(stopSubmit("loginForm", err.response.data));
//   }
// };

export const tokenConfig = () => {
  // Get token
  const token = window.sessionStorage.getItem("token");
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  console.log("token:", config);
  return config;
};
