import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/";

export default {
  /* Board CRUD api */
  //모든글 불러오기
  getAllPosts(url) {
    console.log("getAllPosts 실행.");
    return axios.get(`Board/${url}/`);
  },
  getPost(url, id) {
    console.log("getPost 실행");
    return axios.get(`Board/${url}/` + String(id));
  },

  //글 생성
  createPost(url, data) {
    console.log("createPost 실행.");
    return axios.post(`Board/${url}/`, data);
  },

  //글 수정
  updatePost(url, id, data) {
    console.log("updatePost 실행.");
    return axios.put(`Board/${url}/` + String(id) + "/", data);
  },

  //글 삭제
  deletePost(url, id) {
    console.log("deletePost 실행.");
    return axios.delete(`Board/${url}/` + String(id));
  }
};
