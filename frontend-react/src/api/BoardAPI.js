import axios from "axios";
import { tokenConfig } from "./AuthAPI";
axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export default {
  /* Board CRUD api */
  //모든글 불러오기
  getAllPosts(url) {
    console.log("getAllPosts 실행.");
    return axios.get(`board/${url}/`, tokenConfig());
  },
  //단일 글 불러오기 및 단일댓글 불러오기?
  getPost(url, id) {
    console.log("getPost 실행");
    return axios.get(`board/${url}/` + String(id), tokenConfig());
  },

  //글 생성
  createPost(url, data) {
    console.log("createPost 실행.");
    console.log(data);
    return axios.post(`board/${url}/`, data, tokenConfig());
  },

  uploadImage(data) {
    console.log("uploadImage 실행.");
    console.log(data); // data = {"image":"base64", "Content object": "/board/session/1/ - detail_url"}
    return axios.post(`board/images/`, data, tokenConfig());
  },

  //글 수정
  updatePost(url, id, data) {
    console.log("updatePost 실행.");
    return axios.put(`board/${url}/` + String(id) + "/", data, tokenConfig());
  },

  //글 삭제
  deletePost(url, id) {
    console.log("deletePost 실행.");
    return axios.delete(`board/${url}/` + String(id), tokenConfig());
  },

  //댓글 불러오기
  getComments(url, id) {
    console.log("getComments 실행.");
    return axios.get(`board/${url}/?board_id=` + String(id), tokenConfig());
  },

  //현재 like 상태 get
  getLike(url, id) {
    console.log("get like api 실행.");
    return axios.get(`board/${url}/${id}/like/`, tokenConfig());
  },
  getUserLikePost(url) {
    console.log("get User Liked Post 실행.");
    return axios.post(`board/${url}/user_like/`, null, tokenConfig());
  },
  //like 상태 변경요청.
  changeLike(url, id) {
    console.log("change like status api 실행.");
    return axios.post(`board/${url}/${id}/like/`, null, tokenConfig());
  },
  getMyPost(id) {
    console.log("get MyPost api 실행");
    return axios.get(`accounts/user/${id}/activity/`, tokenConfig());
  }
};
