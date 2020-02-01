import axios from "axios"

axios.defaults.baseURL = "http://127.0.0.1:8000/Board"

export default {

/* Notice Board */
    //모든 공지글 불러오기
    getAllNotices() {
        console.log('getAllPosts 실행.');
        return axios.get('/notice/')
    },

    //공지글 생성
    createNotice(data) {
        console.log('createNotice 실행.');
        return axios.post('/notice/', data)
    },
    
    //공지글 삭제
    deleteNotice(id) {
        console.log('deleteNotice 실행.');
        return axios.delete('/notice/'+String(id))
    }


}