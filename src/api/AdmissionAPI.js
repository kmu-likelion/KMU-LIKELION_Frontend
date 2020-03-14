import axios from "axios";
// import { tokenConfig } from "./api_auth";

export default {
  /* Application api */
  createJoinForm(data) {
    console.log("submitJoinForm 실행.", data);
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

  updateJoinData(id, data) {
    console.log("update JoinData 실행.", data);
    return axios.put(`admission/application/${id}/`, data);
  },

  /* Question api */
  createQuestion(data) {
    console.log("createQuestion 실행.");
    return axios.post("admission/question/", data);
  },

  getAllQuestions() {
    console.log("getAllQuestions 실행");
    return axios.get("admission/question/");
  },

  updateQuestion(id, data) {
    console.log("updateQuestion 실행.");
    return axios.put(`admission/question/${id}/`, data);
  },

  deleteQuestion(id) {
    console.log("deleteQuestion 실행.");
    return axios.delete(`admission/question/${id}/`);
  },

  /* Answer api */
  createAnswer(data) {
    console.log("createAnswer 실행.");
    return axios.post("admission/answer/", data);
  },
  createAnswers(data) {
    console.log("createAnswers 실행.");
    return axios.post("admission/answer/post_answers/", data);
  },

  updateAnswer(id, data) {
    console.log("updateAnswer 실행.", data);
    return axios.put(`admission/answer/${id}/`, data);
  },

  /* Evaluation api */
  createEvaluation(data) {
    console.log("createEvaluation 실행.", data);
    return axios.post("admission/evaluation/", data);
  },

  getEvaluationsWithApplyId(id) {
    console.log("getAllEvaluations 실행");
    return axios.get(`admission/evaluation/?application_id=${id}`);
  },

  updateEvaluation(id, data) {
    console.log("updateEvaluation 실행.", data);
    return axios.put(`admission/evaluation/${id}/`, data);
  },

  deleteEvaluation(id) {
    console.log("deleteEvaluation 실행.");
    return axios.delete(`admission/evaluation/${id}/`);
  }
};
