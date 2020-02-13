// import StudyGroup from "./account/studygroup";

import axios from "axios";
import { tokenConfig } from "./api_auth";
// axios.defaults.baseURL = "http://127.0.0.1:8000/";

export default {
  /* ------Group CRUD api------ */

  getAllCalendar() {
    console.log("getAllCalendar api 실행.");
    return axios.get("main/calendar/", tokenConfig());
  },

  //단일 그룹 가져오기
  getCalendar(id) {
    console.log("Calendar api 실행");
    return axios.get(`main/calendar/${id}`, tokenConfig());
  },
  createCalendar(data) {
    console.log("Calendar api 실행");
    return axios.post(`main/calendar/`, data, tokenConfig());
  }
};
