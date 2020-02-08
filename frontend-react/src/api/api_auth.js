import axios from "axios";

// axios.defaults.baseURL = "http://127.0.0.1:8000/api-auth"

export default {
  /* Auth api */

  authLogin(data) {
    console.log("login api 실행.");
    return axios.post("accounts/auth/login/", data);
  },
  getUser(userId) {
    console.log("getUser api 실행.");
    return axios.get("accounts/user/" + String(userId));
  },
  authlogout(token) {
    console.log("logout api 실행.");
    console.log("토큰 잘감? : ", token);
    return axios.post("accounts/auth/logout/", token);
  }
};
