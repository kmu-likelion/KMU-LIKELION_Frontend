import axios from "axios";
import { tokenConfig } from "./AuthAPI";

export default {
  /* ------Mentoring api------ */
  getAllMentoring() {
    console.log("getAllMentoring api 실행.");
    return axios.get("accounts/mentoring/", tokenConfig());
  },

  createMentoring(data) {
    console.log("createMentoring api 실행");
    return axios.post(`accounts/mentoring/`, data, tokenConfig());
  },
  deleteMentoring(data) {
    console.log("delete Mentoring api 실행.");
    console.log("data보여줘 ",data);
    return axios.post("accounts/user/delete_mentoring/",data, tokenConfig());
  },

  getAllMentor(){
    console.log("getAllMentor api 실행");
    return axios.get("accounts/mentoring/get_mentors/", tokenConfig());
  },

  getAllMentee(){
    console.log("getAllMentee api 실행");
    return axios.get("accounts/mentoring/get_mentees/", tokenConfig());
  },

  getLinkedMentee(id){
    console.log("getLinkedMentee api 실행");
    return axios.get(`accounts/mentoring/?mentor=${id}`,tokenConfig());
  },

  getLinkedMentor(id){
    console.log("getLinkedMentor api 실행");
    return axios.get(`accounts/mentoring/?mentee=${id}`,tokenConfig());
  },
};
