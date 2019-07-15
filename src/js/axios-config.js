import axios from 'axios';
import router from '../router'
export const configAxios = () => {
    axios.defaults.baseURL = 'https://grocery-shop.herokuapp.com/'
    axios.interceptors.response.use(response => {
        return response
    },
        error => {
            if (error.response.status === 401) {
                router.push('/login');
            }
            return error;
        });
}