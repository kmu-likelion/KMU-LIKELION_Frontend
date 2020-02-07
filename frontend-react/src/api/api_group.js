// import StudyGroup from "./account/studygroup";

import axios from "axios";

// axios.defaults.baseURL = "http://127.0.0.1:8000/";

export default {
  /* Group CRUD api */
  //모든글 불러오기
  getAllGroups(auth) {
    console.log("getAllGroups api 실행.");
    return axios.get(`account/studygroup/`, auth);
  },
  //단일 글 불러오기 및 단일댓글 불러오기?
  getGroup(id, auth) {
    console.log("getGroup api 실행");
    return axios.get(`account/studygroup/${id}`, auth);
  },

  //글 생성
  createGroup(data, auth) {
    console.log("createGroup api 실행.");
    return axios.post(`account/studygroup/`, data, auth);
  },

  //글 수정
  updateGroup(id, data, auth) {
    console.log("updateGroup api 실행.");
    return axios.put(`account/studygroup/${id}/`, data, auth);
  },

  //글 삭제
  deleteGroup(id, auth) {
    console.log("deleteGroup api 실행.");
    return axios.delete(`account/studygroup/${id}`, auth);
  },
  addGroupUser(data, auth) {
    console.log("addGroupUser api 실행.");
    return axios.post("account/studygroup_user/", data, auth);
  }
};
