import axios from "axios";
import { tokenConfig } from "./api_auth";

export default {
  /* ------Mentoring api------ */
  getAllMentoring() {
    console.log("getAllMentoring api 실행.");
    return axios.get("accounts/mentoring/", tokenConfig());
  },

  createMentoring(data) {
    console.log("createCalendar api 실행");
    return axios.post(`accounts/mentoring/`, data, tokenConfig());
  },
  deleteMentoring(id) {
    console.log("delete Calendar api 실행.");
    return axios.delete(`accounts/mentoring/${id}`, tokenConfig());
  }
};
