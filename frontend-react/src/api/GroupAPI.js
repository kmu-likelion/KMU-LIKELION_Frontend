import axios from "axios";
import { tokenConfig } from "./AuthAPI";

export default {
  /* ------Group CRUD api------ */
  //모든 그룹 가져오기
  getAllGroups() {
    console.log("getAllGroups API.");
    return axios.get("accounts/studygroup/", tokenConfig());
  },

  //단일 그룹 가져오기
  getGroup(id) {
    console.log("getGroup API");
    return axios.get(`accounts/studygroup/${id}`, tokenConfig());
  },

  //groupname으로 그룹 가져오기
  getGroupWithName(name) {
    console.log("getGroupwithName API.");
    return axios.get(`accounts/studygroup?name=${name}`, tokenConfig());
  },

  //그룹 생성하기
  createGroup(data) {
    console.log("createGroup API.");
    return axios.post(`accounts/studygroup/`, data, tokenConfig());
  },

  //그룹 수정하기
  updateGroup(id, data) {
    console.log("updateGroup API.");
    return axios.put(`accounts/studygroup/${id}/`, data, tokenConfig());
  },

  //그룹 삭제하기
  deleteGroup(id) {
    console.log("deleteGroup API.");
    return axios.delete(`accounts/studygroup/${id}`, tokenConfig());
  },

  //그룹에 유저 추가.
  addGroupUser(data) {
    console.log("addGroupUser API.");
    return axios.post("accounts/groupuser/", data, tokenConfig());
  },

  deleteGroupUser(id){
    console.log("deleteGroupUser API");
    return axios.delete(`accounts/groupuser/${id}/`,tokenConfig());
  },

  getMemberWithGroupId(id) {
    console.log("get GroupMember with groupId API.");
    // return axios.get(`accounts/groupuser?group_id=${id}`, tokenConfig());
    return axios.get(`accounts/studygroup/${id}/group_users/`, tokenConfig());
  },

  getCaptainWithGroupId(id) {
    console.log("get Captain with groupId API.");
    return axios.get(
      `accounts/groupuser?group_id=${id}&is_captain=true`,
      tokenConfig()
    );
  },
  getMyStudyGroup(id){
    console.log("get MyStudy Group");
    return axios.get(`accounts/user/${id}/get_mygroup/`, tokenConfig());
  },
  

  /* ------StudyPost api------ */
  getPostWithGroupId(id) {
    console.log("get Post with groupid API.");
    return axios.get(`board/study?group_id=${id}`, tokenConfig());
  }
};
