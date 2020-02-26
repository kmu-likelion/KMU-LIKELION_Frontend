import axios from "axios";
// import { tokenConfig } from "./api_auth";

export default {
  /* Admission api */

  createJoinForm(data) {
    console.log("submitJoinForm 실행.");
    // console.log(data);
    return axios.post("admission/application/", data);
  },

  //parameter : email, password
  getJoinData(data) {
    console.log("getJoinData 실행.");
    return axios.post(`admission/application/get_application/`, data);
  },

  getJoinDatawithId(id) {
    console.log("getJoinDataWithId 실행.");
    return axios.get(`admission/application/${id}/`);
  },

  getAllJoinData() {
    console.log("getAllJoinData 실행.");
    return axios.get("admission/application/");
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
    console.log("updateQuestion 실행.");
    return axios.put(`admission/question/${id}/`, data);
  },

  deleteQuestion(id) {
    console.log("deleteQuestion 실행.");
    return axios.delete(`admission/question/${id}/`);
  },

  createAnswer(data) {
    console.log("createAnswer 실행.");
    return axios.post("admission/answer/", data);
  },
  updateAnswer(id, data) {
    console.log("updateAnswer 실행.", data);
    return axios.put(`admission/answer/${id}/`, data);
  },
  createAnswers(data) {
    console.log("createAnswers 실행.");
    return axios.post("admission/answer/post_answers/", data);
  }
};
