import axios from "axios"

// axios.defaults.baseURL = "http://127.0.0.1:8000/api-auth"

export default {

/* Auth api */
    
    authlogin(data) {
        console.log('login api 실행.');
        return axios.POST('api-auth/login/', data);
    },
    // authlogout()

}