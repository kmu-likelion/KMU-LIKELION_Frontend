import axios from "axios";

// axios.defaults.baseURL = "http://127.0.0.1:8000/api-auth"

export default {
  /* Auth api */

  authLogin(data) {
    console.log("login api 실행.");
    return axios.post("account/auth/login/", data);
  },
  getUser(userId) {
    console.log("getUser api 실행.");
    return axios.get("account/auth/user/", userId);
  }
  // authlogout()
};
