import axios from 'axios';
import vue from 'vue';

export default {
    state: {
        auth: {
            isLogged: false,
            token: null
        }
    },
    getters: {
        auth: state => state.auth
    },
    mutations: {
        setIsLogged(state, bool) {
            console.log(bool)
            state.auth.isLogged = bool;
        },
        setToken(state, token) {
            vue.prototype.$cookies.set("token", token, 60 * 30);
            state.auth.token = token;
            axios.defaults.headers['Authorization'] = `Bearer ${token}`;

        },
        getCookieToken(state) {
            const token = vue.prototype.$cookies.get("token");
            if (token) {
                state.auth = {
                    token, isLogged: true
                }
            }
            axios.defaults.headers['Authorization'] = `Bearer ${token}`;

        }
    },
    actions: {
        async signIn({ commit }, userData) {
            commit('setLoader', true);
            const data = await axios.put(
                "/auth/sign-in", userData
            );
            if (data.status == 200) {
                commit("setIsLogged", true);
                commit("setToken", data.data.token);
            }
            commit('setLoader', false);
            return data
        }
    }
}