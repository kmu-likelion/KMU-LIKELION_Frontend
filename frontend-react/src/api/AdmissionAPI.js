import axios from "axios";
// import { tokenConfig } from "./api_auth";

export default {
  /* Admission api */

  createJoinForm(data) {
    console.log("submitJoinForm 실행.");
    // console.log(data);
    return axios.post("admission/joinform/", data);
  },

  getJoinData(id) {
    console.log("getJoinInfo 실행.");
    return axios.get(`admission/joinform/${id}/`);
  },

  getAllJoinData() {
    console.log("getAllJoinData 실행.");
    return axios.get("admission/joinform/");
  },

  getAllQuestions() {
    console.log("getAllQuestions 실행");
    return axios.get("admission/question/");
  },

  createQuestion(data) {
    console.log("createQuestion 실행.");
    return axios.post("admission/question/", data);
  },

  updateQuestion(id, data) {
    console.log("createQuestion 실행.");
    return axios.put(`admission/question/${id}/`, data);
  },

  deleteQuestion(id) {
    console.log("createQuestion 실행.");
    return axios.delete(`admission/question/${id}/`);
  },

  createAnswer(data) {
    console.log("createAnswer 실행.");
    return axios.post("admission/answer/", data);
  },
  createAnswers(data) {
    console.log("createAnswers 실행.");
    return axios.post("admission/answer/post_answers/", data);
  }
};
