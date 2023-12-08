import axios from 'axios';

const useApiClient = () => {
axios.defaults.baseURL = "https://gogourmet-api-qe677.ondigitalocean.app";

axios.interceptors.request.use(
    config => {
        const token = window.localStorage.getItem("jwt");
        if(token) config.headers.Authorization = ` Bearer ${token} `;
        return config;
    },
    error => { 
        return Promise.reject(error)
    }
);

axios.interceptors.response.use(undefined, error => {
    let message = ''
    if (error.message === "Network Error" && !error.response) {
        message = {message:"Network error - Our API is currently offline!",redirect:false,status:"fail"}
    }
    return error.response;
}
);

    const parseError = (error) => {
        console.log(error.status)
        let message;
        switch(error.status){
            case 404:{
                message = {message:"Could not find what you are looking for!",redirect:false,status:"fail"}
                break;
            };
            case 401:{
                message = {message:"Please sign in again",redirect:"/login",status:"fail"}
                break;
            };
            case 500:{
                message = {message:"Server error - please check the terminal for more information",redirect:false,status:"fail"}
                break;
            }
            default:{
                console.log(error.status);
                message = false;
                break;
            }
        }
        return message
    }

    const respBody = (response) => {
        const [data,err] = [response?.data,parseError(response)];
        console.log([data,err])
        return [data,err];
    };

const requests = {
    get: (url) => axios.get(url).then(respBody),
    post: (url, body) => axios.post(url, body).then(respBody),
    put: (url, body) => axios.put(url, body).then(respBody),
    delete: (url, body) => axios.delete(url, body).then(respBody),
};

const auth = {
    login: (form) => requests.post('/authentication/login', form),
    register: (user) => requests.post('/authentication/register', user),
};

const user = {
    getByID: (id) => requests.get(`/users/${id}`),
    update: (id, body) => requests.put(`/users/${id}`,body),
    remove: (id) => requests.delete(`/users/${id}`)
};

const order = {
    getByID: (id) => requests.get(`/orders/${id}`),
    update: (id) => requests.put(`/orders/${id}`),
    remove: (id) => requests.delete(`/orders/${id}`),
    create: (order) => requests.post('/orders', order)
};

const restaurant ={ 
    getByID: (id) => requests.get(`/restaurant/${id}`),
    getAll: () => requests.get(`/restaurant/`),
    getByRange: (range, postcode) => requests.get(`/restaurant/${range}/${postcode}`),
    getByType: (type) => requests.get(`/restaurant/type/${type}`),
    create: (form) => requests.post('/restaurant', form),
    update: (id) => requests.put(`/restaurant/${id}`),
    remove: (id) => requests.delete(`/restaurant/${id}`)
};
return {
    auth,user,order,restaurant
}
}
export default useApiClient

// usage example:

// const loginForm = {
//     username: 'user',
//     password: 'password',
// };

// auth.login(loginForm)
//     .then((response) => {
//         const token = response.token;
//         // Storing the token in localStorage
//         window.localStorage.setItem("jwt", token);
//         console.log("Login successful. Token stored:", token);
//     })
//     .catch((error) => {
//         console.error("Error logging in:", error);
//     });

    //all calls thereafter will be authenticated by the htto client library for the duration of the token 