import axios from 'axios';

export default {
    state: {
        auth: {
            isLogged: false,
            token: ''
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
            document.cookie = "token=" + token + ";";
            state.auth.token = token;

        },
        checkIfLogged(state) {
            const cookies = document.cookie.split(';');
            console.log(cookies);
            cookies.forEach(cookie => {
                if (cookie.includes('token=')) {
                    var token = cookie.replace('token=', '');
                    state.auth = {
                        token, isLogged: true
                    }
                }
            })
        }
    },
    actions: {
        async signIn({ commit }, userData) {
            const data = await axios.put(
                "/auth/sign-in", userData
            );
            if (data.status == 200) {
                commit("setIsLogged", true);
                commit("setToken", data.data.token);
            }
            return data
        },
        async signUp({ commit }, userData) {
            const data = await axios.put(
                "/auth/sign-up", userData
            );
            return data
        },
    }
}