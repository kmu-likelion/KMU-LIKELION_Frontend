import axios from "axios";
import { tokenConfig } from "./AuthAPI";

export default {
  //   getAllPosts(url) {
  //     console.log("getAllPosts 실행.");
  //     return axios.get(`board/${url}/`, tokenConfig());
  //   },
  //   //단일 글 불러오기 및 단일댓글 불러오기?
  //   getPost(url, id) {
  //     console.log("getPost 실행");
  //     return axios.get(`board/${url}/` + String(id), tokenConfig());
  //   },

  //과제 추가
  addAssignment(id, data) {
    console.log("add assignment 실행.");
    console.log(data);
    return axios.post(
      `board/session/${id}/add_assignment/`,
      data,
      tokenConfig()
    );
  },

  deleteAssignment(id) {
    console.log("delete assignment 실행.");
    return axios.delete(`board/session/${id}/`, tokenConfig());
  },

  createSubmission(data) {
    console.log("create submission api 실행", data);
    return axios.post(`board/submission/`, data, tokenConfig());
  },

  updateSubmission(id, data) {
    console.log("update submission api 실행", data);
    return axios.put(`board/submission/${id}/`, data, tokenConfig());
  },

  //data : user-id, assignment-id
  getSubmission(user_id, assignment_id) {
    console.log("get submission api 실행.");
    return axios.get(
      `board/submission/?user_id=${user_id}&lecture=${assignment_id}`
    );
  }

  //   //글 수정
  //   updatePost(url, id, data) {
  //     console.log("updatePost 실행.");
  //     return axios.put(`board/${url}/` + String(id) + "/", data, tokenConfig());
  //   },

  //   //글 삭제
  //   deletePost(url, id) {
  //     console.log("deletePost 실행.");
  //     return axios.delete(`board/${url}/` + String(id), tokenConfig());
  //   }
};
