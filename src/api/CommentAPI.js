import axios from "axios";
import { tokenConfig } from "./AuthAPI";

export default {
  /* Board CRUD api */
  //모든글 불러오기

  //댓글 불러오기
  getComments(url, id) {
    console.log("getComments api 실행.");
    return axios.get(`board/${url}/?board_id=${id}`, tokenConfig());
  },

  createComment(url, data) {
    console.log("create comment api 실행.");
    return axios.post(`board/${url}/`, data, tokenConfig());
  },

  updateComment(url, id, data) {
    console.log("update comment api 실행.", data);
    return axios.put(`board/${url}/${id}/`, data, tokenConfig());
  },

  deleteComment(url, id) {
    console.log("delete comment api 실행.");
    return axios.delete(`board/${url}/${id}/`, tokenConfig());
  },

  createRecomment(url, comment_id, data) {
    console.log("create recomment api 실행.", data);
    return axios.post(
      `board/${url}/${comment_id}/re_comment/`,
      data,
      tokenConfig()
    );
  }
};
