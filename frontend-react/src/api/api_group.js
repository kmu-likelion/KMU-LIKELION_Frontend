// import StudyGroup from "./account/studygroup";

import axios from "axios";
import { tokenConfig } from "./api_auth";
// axios.defaults.baseURL = "http://127.0.0.1:8000/";

export default {
  /* Group CRUD api */
  //모든글 불러오기
  getAllGroups() {
    console.log("getAllGroups api 실행.");
    return axios.get(`accounts/studygroup/`, tokenConfig());
  },
  //단일 글 불러오기 및 단일댓글 불러오기?
  getGroup(id) {
    console.log("getGroup api 실행");
    return axios.get(`accounts/studygroup/${id}`, tokenConfig());
  },
  getGroupWithName(name) {
    console.log("get Group with name 실행.");
    return axios.get(`accounts/studygroup?group_name=${name}`, tokenConfig());
  },

  //글 생성
  createGroup(data) {
    console.log("createGroup api 실행.");
    return axios.post(`accounts/studygroup/`, data, tokenConfig());
  },

  //글 수정
  updateGroup(id, data) {
    console.log("updateGroup api 실행.");
    return axios.put(`accounts/studygroup/${id}/`, data, tokenConfig());
  },

  //글 삭제
  deleteGroup(id) {
    console.log("deleteGroup api 실행.");
    return axios.delete(`accounts/studygroup/${id}`, tokenConfig());
  },
  addGroupUser(data) {
    console.log("addGroupUser api 실행.");
    return axios.post("accounts/group_user/", data, tokenConfig());
  }
};
