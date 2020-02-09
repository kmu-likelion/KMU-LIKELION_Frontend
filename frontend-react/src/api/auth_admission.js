import axios from "axios";
// import { tokenConfig } from "./api_auth";
// axios.defaults.baseURL = "http://127.0.0.1:8000/";

export default {
  /* Board CRUD api */
  //모든글 불러오기
  //   getAllPosts(url) {
  //     console.log("getAllPosts 실행.");
  //     return axios.get(`Board/${url}/`, tokenConfig());
  //   },
  //   //단일 글 불러오기 및 단일댓글 불러오기?
  //   getPost(url, id) {
  //     console.log("getPost 실행");
  //     return axios.get(`Board/${url}/` + String(id), tokenConfig());
  //   },

  //Join Form
  submitJoinForm(data) {
    console.log("submitJoinForm 실행.");
    console.log(data);
    return axios.post("admission/joinform/", data);
  }

  //   //글 수정
  //   updatePost(url, id, data) {
  //     console.log("updatePost 실행.");
  //     return axios.put(`Board/${url}/` + String(id) + "/", data, tokenConfig());
  //   },

  //   //글 삭제
  //   deletePost(url, id) {
  //     console.log("deletePost 실행.");
  //     return axios.delete(`Board/${url}/` + String(id), tokenConfig());
  //   },
};
