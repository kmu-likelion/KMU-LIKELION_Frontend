// import axios from "axios";

// axios.defaults.baseURL = "http://127.0.0.1:8000/";
// export default {
//   getAllTag(id, auth) {
//     console.log("getAllTag 실행");
//     return axios.get(`main/hashtag/`);
//   },

//   getTag(url, id, auth) {
//     console.log("getTag 실행");
//     return axios.get(`Board/${url}/` + String(id), auth);
//   },

//   //글 생성
//   createTag(url, data, auth) {
//     console.log("createTag 실행.");
//     return axios.Tag(`Board/${url}/`, data, auth);
//   },

//   //글 수정
//   updateTag(url, id, data, auth) {
//     console.log("updateTag 실행.");
//     return axios.put(`Board/${url}/` + String(id) + "/", data, auth);
//   },

//   //글 삭제
//   deleteTag(url, id, auth) {
//     console.log("deleteTag 실행.");
//     return axios.delete(`Board/${url}/` + String(id), auth);
//   }
// };
