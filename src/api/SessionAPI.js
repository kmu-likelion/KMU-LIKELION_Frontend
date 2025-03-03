import axios from "axios";
import { tokenConfig } from "./AuthAPI";

export default {
  //기수(cardinal)에 해당하는 session list을 가져옴
  getSessionsWithAlum(cardinal_number) {
    return axios.get(`board/session/?start_number=${cardinal_number}`);
  },

  addAssignment(id, data) {
    return axios.post(
      `board/session/${id}/add_assignment/`,
      data,
      tokenConfig()
    );
  },

  getAssignment(id) {
    // console.log("get assignment api 실행.", id);
    return axios.get(`board/session/${id}/`, tokenConfig());
  },

  deleteAssignment(id) {
    // console.log("delete assignment 실행.");
    return axios.delete(`board/session/${id}/`, tokenConfig());
  },

  createSubmission(data) {
    console.log("create submission api 실행", data);
    return axios.post(`board/submission/`, data, tokenConfig());
  },

  updateSubmission(id, data) {
    // console.log("update submission api 실행", data);
    return axios.put(`board/submission/${id}/`, data, tokenConfig());
  },

  //data : user-id, assignment-id
  getSubmission(user_id, assignment_id) {
    // console.log("get submission api 실행.");
    return axios.get(
      `board/submission/?user_id=${user_id}&lecture=${assignment_id}`
    );
  },

  //유저의 제출상태를 받아옴
  getSubmitStatusWithUser(user_id, assignment_id) {
    // console.log("get submit status with user");
    return axios.post(
      `accounts/user/${user_id}/get_submit_status/`,
      {
        session_id: assignment_id
      },
      tokenConfig()
    );
  },

  //과제물 평가점수 생성
  createScore(submission_id, data) {
    // console.log("create Score api 실행.", data);
    return axios.post(
      `board/submission/${submission_id}/evaluation/`,
      data,
      tokenConfig()
    );
  }
};
