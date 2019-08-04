import axios from 'axios';
import router from '../router'
import store from '../store';
export const configAxios = () => {
    axios.defaults.baseURL = 'https://grocery-shop.herokuapp.com/'
    // axios.defaults.baseURL = 'http://localhost:3000'
    axios.interceptors.response.use(response => {
        return response
    },
        error => {
            store.commit('setNotificationData', {
                msg: error.response.data.message,
                type: "error"
            })
            if (error.response.status === 401) {
                router.push('/login');
            }

            return error;
        });
}