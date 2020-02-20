import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

// export default {
//   /* Auth api */

//   authLogin(data) {
//     console.log("login api 실행.");
//     return axios.post("accounts/auth/login/", data);
//   },

//   authlogout(auth) {
//     console.log("logout api 실행.");
//     // console.log("토큰 잘감?:", token.headers.Authorization);

//     return axios.post("accounts/auth/logout/", null, auth);
//   },
//   getUser(userId) {
//     console.log("getUser api 실행.");
//     return axios.get("accounts/user/" + String(userId));
//   }
// };

export const authlogin = data => {
  return axios.post("accounts/auth/login/", data); //date : {username, password}
};

export const authlogout = () => {
  console.log("logout api 실행.");
  return axios.post("accounts/auth/logout/", null, tokenConfig());
};

export const getUser = userId => {
  console.log("getUser api 실행.");
  return axios.get("accounts/user/" + String(userId));
};

export const getAllUser = () => {
  console.log("get all user api 실행.");
  return axios.get("accounts/user/");
};

export const tokenConfig = () => {
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
  // const config = `Authorization:Token ${token}`;
  // console.log("token:", config);
  return config;
};
