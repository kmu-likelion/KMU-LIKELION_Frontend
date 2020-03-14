import axios from "axios";

export const authlogin = data => {
  console.log("login API 실행.");
  return axios.post("accounts/auth/login/", data); //date : {username, password}
};

export const authlogout = () => {
  console.log("logout API 실행.");
  return axios.post("accounts/auth/logout/", null, tokenConfig());
};

export const registerUser = data => {
  console.log("register user API 실행", data);
  return axios.post("accounts/auth/register/", data);
};

export const getUser = username => {
  console.log("getUser API 실행.");
  return axios.get(`accounts/user/?username=${username}`);
};

export const getUserWithId = id => {
  console.log("getUserWithId API 실행.");
  return axios.get(`accounts/user/${id}/`);
};

export const updateUser = (id, data, config) => {
  console.log("updateUser API 실행.", data);
  return axios.put(`accounts/user/${String(id)}/`, data, config, tokenConfig());
};

export const getAllUser = () => {
  console.log("get all user API 실행.");
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
