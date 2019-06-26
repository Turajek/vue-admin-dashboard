import axios from 'axios';

export default {
    state: {
        products: []
    },
    getters: {
        products: state => state.products
    },
    mutations: {
        setProducts(state, data) {
            state.products = data;
        }
    },
    actions: {
        async getProducts({ commit }) {
            const { data } = await axios.get(
                "/shop/get-products?page=1&limit=20"
            );
            commit("setProducts", data);
        }
    }
}