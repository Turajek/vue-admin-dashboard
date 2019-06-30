import axios from 'axios';

export default {
    state: {
        categories: []
    },
    getters: {
        categories: state => state.categories
    },
    mutations: {
        setCategories(state, data) {
            state.categories = data;
        }
    },
    actions: {
        async getCategories({ commit }) {
            const { data } = await axios.get(
                "/shop/get-categories"
            );
            commit("setCategories", data);
            return data
        },
    }
}