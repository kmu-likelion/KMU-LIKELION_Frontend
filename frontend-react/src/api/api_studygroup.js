// import StudyGroup from "./account/studygroup";

import axios from "axios";

// axios.defaults.baseURL = "http://127.0.0.1:8000/";

export default {
  /* Group CRUD api */
  //모든글 불러오기
  getAllGroups(auth) {
    console.log("getAllGroups 실행.");
    return axios.get(`account/studygroup/`, auth);
  },
  //단일 글 불러오기 및 단일댓글 불러오기?
  getGroup(id, auth) {
    console.log("getGroup 실행");
    return axios.get(`Board/studygroup/${id}`, auth);
  },

  //글 생성
  createGroup(data, auth) {
    console.log("createGroup 실행.");
    return axios.Group(`Board/studygroup/`, data, auth);
  },

  //글 수정
  updateGroup(id, data, auth) {
    console.log("updateGroup 실행.");
    return axios.put(`Board/studygroup/${id}/`, data, auth);
  },

  //글 삭제
  deleteGroup(id, auth) {
    console.log("deleteGroup 실행.");
    return axios.delete(`Board/studygroup/${id}`, auth);
  }
};
