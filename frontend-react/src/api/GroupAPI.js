import axios from "axios";
import { tokenConfig } from "./AuthAPI";


export default {
  /* ------Group CRUD api------ */
  //모든 그룹 가져오기
  getAllGroups() {
    console.log("getAllGroups api 실행.");
    return axios.get("accounts/studygroup/", tokenConfig());
  },

  //단일 그룹 가져오기
  getGroup(id) {
    console.log("getGroup api 실행");
    return axios.get(`accounts/studygroup/${id}`, tokenConfig());
  },

  //groupname으로 그룹 가져오기
  getGroupWithName(name) {
    console.log("get Group with name 실행.");
    return axios.get(`accounts/studygroup?name=${name}`, tokenConfig());
  },

  //그룹 생성하기
  createGroup(data) {
    console.log("createGroup api 실행.");
    return axios.post(`accounts/studygroup/`, data, tokenConfig());
  },

  //그룹 수정하기
  updateGroup(id, data) {
    console.log("updateGroup api 실행.");
    return axios.put(`accounts/studygroup/${id}/`, data, tokenConfig());
  },

  //그룹 삭제하기
  deleteGroup(id) {
    console.log("deleteGroup api 실행.");
    return axios.delete(`accounts/studygroup/${id}`, tokenConfig());
  },

  //그룹에 유저 추가.
  addGroupUser(data) {
    console.log("addGroupUser api 실행.");
    return axios.post("accounts/group_user/", data, tokenConfig());
  },

  /* ------StudyPost api------ */
  getPostWithGroupId(id) {
    console.log("get Post with groupid 실행.");
    return axios.get(`board/study?group_id=${id}`, tokenConfig());
  }
};
