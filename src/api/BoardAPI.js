import axios from "axios";
import { tokenConfig } from "./AuthAPI";

// axios.defaults.baseURL = "http://ec2-52-194-187-114.ap-northeast-1.compute.amazonaws.com/";
axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export default {

  /* Board CRUD api */
  getAllPosts(url) {
    return axios.get(`board/${url}/`, tokenConfig());
  },

  //alum : 동문, 동기 -> 해당 기수의 게시물들을 불러옴.
  getMyAlumPosts(url, alum) {
    return axios.get(`board/${url}/?start_number=${alum}`, tokenConfig());
  },


  getPost(url, id) {
    return axios.get(`board/${url}/` + String(id), tokenConfig());
  },

  getPage(url, id) {
    return axios.get(`board/${url}/?page=${id}`, tokenConfig());
  },

  getNPage(url, id) {
    return axios.get(`board/${url}/?page=${id}&study_type=0`, tokenConfig());
  },

  getSPage(url, id) {
    return axios.get(`board/${url}/?page=${id}&study_type=1`, tokenConfig());
  },

  //글 생성
  createPost(url, data) {
    return axios.post(`board/${url}/`, data, tokenConfig());
  },

  uploadImage(data) {
    return axios.post(`board/images/`, data, tokenConfig());
  },

  //글 수정
  updatePost(url, id, data) {
    return axios.put(`board/${url}/` + String(id) + "/", data, tokenConfig());
  },

  //글 삭제
  deletePost(url, id) {
    return axios.delete(`board/${url}/` + String(id), tokenConfig());
  },

  //댓글 불러오기
  getComments(url, id) {    
    return axios.get(`board/${url}/?board_id=` + String(id), tokenConfig());
  },

  //현재 like 상태 가져오기.
  getLike(url, id) {
    return axios.get(`board/${url}/${id}/like/`, tokenConfig());
  },

  getUserLikePost(url) {
    return axios.post(`board/${url}/user_like/`, null, tokenConfig());
  },

  //like 상태 변경요청.
  changeLike(url, id) {
    return axios.post(`board/${url}/${id}/like/`, null, tokenConfig());
  },
  
  getMyPost(id) {    
    return axios.get(`accounts/user/${id}/activity/`, tokenConfig());
  }
};
