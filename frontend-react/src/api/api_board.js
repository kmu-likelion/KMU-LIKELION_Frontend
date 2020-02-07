import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/";

export default {
  /* Board CRUD api */
  //모든글 불러오기
  getAllPosts(url, auth) {
    console.log("getAllPosts 실행.");
    return axios.get(`Board/${url}/`, auth);
  },
  //단일 글 불러오기 및 단일댓글 불러오기?
  getPost(url, id, auth) {
    console.log("getPost 실행");
    return axios.get(`Board/${url}/` + String(id), auth);
  },

  //글 생성
  createPost(url, data, auth) {
    console.log("createPost 실행.");
    return axios.post(`Board/${url}/`, data, auth);
  },

  //글 수정
  updatePost(url, id, data, auth) {
    console.log("updatePost 실행.");
    return axios.put(`Board/${url}/` + String(id) + "/", data, auth);
  },

  //글 삭제
  deletePost(url, id, auth) {
    console.log("deletePost 실행.");
    return axios.delete(`Board/${url}/` + String(id), auth);
  },

  getComments(url, id, auth) {
    console.log("getComments 실행.");
    return axios.get(`Board/${url}/?search=` + String(id), auth);
  },
  scrapPost(url, id, auth) {
    console.log("scrapPost 실행.");
    return axios.get(`Board/${url}/${id}/scrap`, auth);
  }
};
