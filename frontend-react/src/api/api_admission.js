import axios from "axios";
// import { tokenConfig } from "./api_auth";

export default {
  /* Admission api */

  createJoinForm(data) {
    console.log("submitJoinForm 실행.");
    // console.log(data);
    return axios.post("admission/joinform/", data);
  },

  getAllQuestions() {
    console.log("getAllQuestions 실행");
    return axios.get("admission/question/");
  },
  //body, joinform_id, question_id
  createAnswer(data) {
    console.log("createAnswer 실행.");
    return axios.post("admission/answer/", data);
  }
};
